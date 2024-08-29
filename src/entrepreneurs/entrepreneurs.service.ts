import { CreateProductDTO } from './../products/dto/create-product.dto';
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateEntrepreneurDTO } from './dto/create-entrepreneur.dto';
import { UpdateEntrepreneurDto } from './dto/update-entrepreneur.dto';
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class EntrepreneursService {



  constructor(private prismaService: PrismaService) {


  }



  async create(createEntrepreneurDto: CreateEntrepreneurDTO) {
    try {
      const entrepreneur = await this.prismaService.entrepreneurs.create({ data: createEntrepreneurDto, include: { products: true } });
      return entrepreneur;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`Entrepreneur with name ${createEntrepreneurDto.firstName} already exists`)
        }
      }
    }


  }

  findAll() {
    return this.prismaService.entrepreneurs.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} entrepreneur`;
  }

  update(id: number, updateEntrepreneurDto: UpdateEntrepreneurDto) {
    return `This action updates a #${id} entrepreneur`;
  }

  remove(id: number) {
    return `This action removes a #${id} entrepreneur`;
  }
}
