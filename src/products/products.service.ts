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
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
