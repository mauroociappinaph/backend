import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class ProductsService {


  constructor(private prismaService: PrismaService) {


  }

  create(createProductDto: CreateProductDTO) {
    return this.prismaService.product.create({ data: createProductDto });
  }

  findAll() {
    return this.prismaService.product.findMany();
  }

  findOne(id: number) {
    return this.prismaService.product.findUnique({ where: { id } });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prismaService.product.update({ where: { id }, data: updateProductDto });
  }

  remove(id: number) {
    return this.prismaService.product.delete({ where: { id } });
  }
}
