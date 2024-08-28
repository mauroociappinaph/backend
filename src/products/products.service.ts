import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class ProductsService {


  constructor(private prismaService: PrismaService) {


  }

  async create(createProductDto: CreateProductDTO) {
    try {
      return await this.prismaService.product.create({ data: createProductDto });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`Product with name ${createProductDto.name} already exists`)
        }
      }
    }

  }

  findAll() {
    return this.prismaService.product.findMany();
  }

  async findOne(id: number) {
    const productFound = await this.prismaService.product.findUnique({ where: { id } });
    if (!productFound) {
      throw new NotFoundException(`Product with id ${id} not found`)
    }
    return productFound
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const productUpdate = await this.prismaService.product.update({ where: { id }, data: updateProductDto });
    if (!productUpdate) {
      throw new NotFoundException(`Product with id ${id} not found`)
    }
    return productUpdate
  }

  async remove(id: number) {
    const deleteProduct = await this.prismaService.product.delete({ where: { id } });
    if (!deleteProduct) {
      throw new NotFoundException(`Product with id ${id} not found`)
    }
    return deleteProduct
  }
}
