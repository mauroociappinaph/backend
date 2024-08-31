import { Injectable, NotFoundException, ConflictException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateEntrepreneurDTO } from './dto/create-entrepreneur.dto';
import { UpdateEntrepreneurDto } from './dto/update-entrepreneur.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EntrepreneursService {
  constructor(private prismaService: PrismaService) { }

  async create(createEntrepreneurDto: CreateEntrepreneurDTO) {
    console.log('Attempting to create entrepreneur with data:', createEntrepreneurDto);

    try {
      const { products, ...entrepreneurData } = createEntrepreneurDto;

      console.log('Creating entrepreneur with data:', entrepreneurData, products);

      const result = await this.prismaService.$transaction(async (prisma) => {
        const entrepreneur = await prisma.entrepreneurs.create({
          data: {
            ...entrepreneurData,
            products: {
              create: products.map(product => ({
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image,
              })),
            },
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            businessName: true,
            products: {
              select: {
                id: true,
                name: true,
                description: true,
                price: true,
                image: true,
                entrepreneursId: true,
              },
            },
          },
        });

        console.log('Entrepreneur created:', entrepreneur);

        return entrepreneur;
      });

      return result;
    } catch (error) {
      console.error('Error while creating entrepreneur:', error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Entrepreneur with this email already exists');
        }
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        console.error('Validation error:', error.message);
        throw new BadRequestException('Validation error while creating entrepreneur');
      } else {
        console.error('Unexpected error:', error.message);
        throw new InternalServerErrorException('An unexpected error occurred while creating the entrepreneur');
      }
    }
  }

  async update(id: number, updateEntrepreneurDto: UpdateEntrepreneurDto) {
    try {
      const { products, ...entrepreneurData } = updateEntrepreneurDto;

      const result = await this.prismaService.$transaction(async (prisma) => {
        const newProducts = products?.filter(product => !product.id) ?? [];
        const existingProducts = products?.filter(product => product.id) ?? [];

        const entrepreneur = await prisma.entrepreneurs.update({
          where: { id },
          data: {
            ...entrepreneurData,
            products: {
              create: newProducts.map(product => ({
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image,
              })),
            },
          },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            businessName: true,
            products: {
              select: {
                id: true,
                name: true,
                description: true,
                price: true,
                image: true,
                entrepreneursId: true,
              },
            },
          },
        });

        for (const product of existingProducts) {
          await prisma.product.update({
            where: { id: product.id },
            data: {
              name: product.name,
              description: product.description,
              price: product.price,
              image: product.image,
            },
          });
        }

        return entrepreneur;
      });

      return result;
    } catch (error) {
      console.error('Error while updating entrepreneur:', error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Entrepreneur with this email already exists');
        }
      }
      throw new InternalServerErrorException('An unexpected error occurred while updating the entrepreneur');
    }
  }

  async findAll() {
    try {
      return await this.prismaService.entrepreneurs.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          businessName: true,
          products: {
            select: {
              id: true,
              name: true,
              description: true,
              price: true,
              image: true,
              entrepreneursId: true,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error occurred while retrieving entrepreneurs');
    }
  }

  async findOne(id: number) {
    try {
      const entrepreneur = await this.prismaService.entrepreneurs.findUnique({
        where: { id },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          businessName: true,
          products: {
            select: {
              id: true,
              name: true,
              description: true,
              price: true,
              image: true,
              entrepreneursId: true,
            },
          },
        },
      });

      if (!entrepreneur) {
        throw new NotFoundException(`Entrepreneur with id ${id} not found`);
      }

      return entrepreneur;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Invalid entrepreneur ID format');
      }
      throw new InternalServerErrorException('An unexpected error occurred while retrieving the entrepreneur');
    }
  }

  async remove(id: number) {
    try {
      const entrepreneur = await this.prismaService.entrepreneurs.findUnique({
        where: { id },
        select: { id: true },
      });

      if (!entrepreneur) {
        throw new NotFoundException(`Entrepreneur with id ${id} not found`);
      }

      await this.prismaService.entrepreneurs.delete({ where: { id } });

      return { message: `Entrepreneur with id ${id} has been deleted successfully` };
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error occurred while deleting the entrepreneur');
    }
  }
}