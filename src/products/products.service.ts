import { Injectable, NotFoundException, ConflictException, BadRequestException, InternalServerErrorException, Logger, Inject } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Cache } from 'cache-manager'; // Importación del caché
import { CACHE_MANAGER } from '@nestjs/cache-manager'

@Injectable()
export class ProductsService {
  constructor(
    private prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache // Inyección del caché
  ) { }

  private readonly logger = new Logger(ProductsService.name);

  async create(createProductDto: CreateProductDTO) {
    try {
      this.logger.log('Creating a new product');

      const result = await this.prismaService.$transaction(async (prisma) => {
        const product = await prisma.product.create({
          data: {
            name: createProductDto.name,
            description: createProductDto.description,
            price: createProductDto.price,
            image: createProductDto.image,
            entrepreneursId: createProductDto.entrepreneurId,
          },
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            image: true,
            entrepreneursId: true,
          },
        });

        if (createProductDto.entrepreneurId) {
          await prisma.entrepreneurs.update({
            where: { id: createProductDto.entrepreneurId },
            data: {
              lastProductCreated: product.id,
            },
          });
        }

        return product;
      });

      this.logger.log(`Product created with id ${result.id}`);

      // Invalida la caché al crear un producto
      await this.cacheManager.del('products');

      return result;
    } catch (error) {
      this.logger.error('Error while creating product', error.stack);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`Product with name ${createProductDto.name} already exists`);
        }
      }
      throw new InternalServerErrorException('An unexpected error occurred while creating the product');
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const result = await this.prismaService.$transaction(async (prisma) => {
        const product = await prisma.product.update({
          where: { id },
          data: updateProductDto,
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            image: true,
            entrepreneursId: true,
          },
        });

        if (updateProductDto.entrepreneurId) {
          await prisma.entrepreneurs.update({
            where: { id: updateProductDto.entrepreneurId },
            data: {
              lastProductUpdated: product.id,
            },
          });
        }

        this.logger.log(`Product with id ${id} updated successfully`);

        // Invalida la caché al actualizar un producto
        await this.cacheManager.del('products');

        return product;
      });

      return result;
    } catch (error) {
      this.logger.error(`Error while updating product with id ${id}`, error.stack);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`Product with name ${updateProductDto.name} already exists`);
        }
      }
      throw new InternalServerErrorException('An unexpected error occurred while updating the product');
    }
  }

  async remove(id: number) {
    try {
      this.logger.log(`Removing product with id ${id}`);
      const result = await this.prismaService.$transaction(async (prisma) => {
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) {
          throw new NotFoundException(`Product with id ${id} not found`);
        }

        await prisma.product.delete({ where: { id } });

        if (product.entrepreneursId) {
          await prisma.entrepreneurs.update({
            where: { id: product.entrepreneursId },
            data: {
              lastProductDelete: product.id,
            },
          });
        }

        this.logger.log(`Product with id ${id} removed successfully`);

        // Invalida la caché al eliminar un producto
        await this.cacheManager.del('products');

        return { message: `Product with id ${id} has been deleted successfully` };
      });

      return result;
    } catch (error) {
      this.logger.error(`Error while deleting product with id ${id}`, error.stack);
      throw new InternalServerErrorException('An unexpected error occurred while deleting the product');
    }
  }

  async findAll() {
    try {
      // Intenta obtener los productos desde la caché
      const cachedProducts = await this.cacheManager.get('products');
      if (cachedProducts) {
        this.logger.log('Serving products from cache');
        return cachedProducts;
      }

      // Si no están en la caché, realiza la consulta a la base de datos
      const products = await this.prismaService.product.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          image: true,
          entrepreneursId: true,
        },
      });

      // Almacena los productos en la caché
      await this.cacheManager.set('products', products, 600);

      this.logger.log('Serving products from database');

      return products;
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error occurred while retrieving products');
    }
  }

  async findOne(id: number) {
    try {
      const productFound = await this.prismaService.product.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          image: true,
          entrepreneursId: true,
        },
      });

      if (!productFound) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      return productFound;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Invalid product ID format');
      }
      throw new InternalServerErrorException('An unexpected error occurred while retrieving the product');
    }
  }
}