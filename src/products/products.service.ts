import { Injectable, NotFoundException, ConflictException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) { }

  async create(createProductDto: CreateProductDTO) {
    try {
      return await this.prismaService.product.create({
        data: createProductDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`Product with name ${createProductDto.name} already exists`);
        }
      }
      throw new InternalServerErrorException('An unexpected error occurred while creating the product');
    }
  }

  async findAll() {
    try {
      return await this.prismaService.product.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          image: true,
          entrepreneursId: true,  // Incluir este si es relevante
          // Excluir createdAt y updatedAt
        },
      });
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
          entrepreneursId: true,  // Incluir este si es relevante
          // Excluir createdAt y updatedAt
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

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const productExists = await this.prismaService.product.findUnique({ where: { id } });
      if (!productExists) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      await this.prismaService.product.update({
        where: { id },
        data: updateProductDto,
      });

      return { message: `Product with id ${id} has been updated successfully` }; // Respuesta simplificada
    } catch (error) {
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
      const productExists = await this.prismaService.product.findUnique({ where: { id } });
      if (!productExists) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      await this.prismaService.product.delete({
        where: { id },
      });

      return { message: `Product with id ${id} has been deleted successfully` }; // 
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error occurred while deleting the product');
    }
  }
}