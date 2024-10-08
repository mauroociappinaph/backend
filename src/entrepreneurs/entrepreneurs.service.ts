import { Injectable, NotFoundException, ConflictException, InternalServerErrorException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateEntrepreneurDTO } from './dto/create-entrepreneur.dto';
import { UpdateEntrepreneurDto } from './dto/update-entrepreneur.dto';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EntrepreneursService {
  constructor(private prismaService: PrismaService,
    private jwtService: JwtService,
  ) { }


  async signup(createEntrepreneurDto: CreateEntrepreneurDTO) {
    const { email, password, firstName, lastName, businessName } = createEntrepreneurDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const entrepreneur = await this.prismaService.entrepreneurs.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          businessName,
        },
      });
      return entrepreneur;
    } catch (error) {
      throw new UnauthorizedException('Sign up failed');
    }
  }

  async validateEntrepreneur(email: string, password: string) {
    const entrepreneur = await this.prismaService.entrepreneurs.findUnique({
      where: { email },
    });

    if (!entrepreneur) {
      return null;
    }

    const passwordMatches = await bcrypt.compare(password, entrepreneur.password);
    if (!passwordMatches) {
      return null;
    }

    return entrepreneur;
  }

  async login(entrepreneur: any) {
    const payload = { email: entrepreneur.email, sub: entrepreneur.id };
    return {
      access_token: this.jwtService.sign(payload),
      id: entrepreneur.id,
      email: entrepreneur.email,
    };
  }






  async create(createEntrepreneurDto: CreateEntrepreneurDTO) {
    console.log('Creating a new entrepreneur:', createEntrepreneurDto.email);
    try {
      const entrepreneur = await this.prismaService.entrepreneurs.create({
        data: {
          ...createEntrepreneurDto,
          password: await bcrypt.hash(createEntrepreneurDto.password, 10),
          products: {
            create: createEntrepreneurDto.products?.map(product => ({
              name: product.name,
              description: product.description,
              price: product.price,
              image: product.image,
            })) || [],
          },
        },
      });
      console.log('Entrepreneur created successfully:', entrepreneur.id);
      return entrepreneur;
    } catch (error) {
      console.error('Error creating entrepreneur:', error.message);
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Entrepreneur with this email already exists');
      }
      throw new InternalServerErrorException('An unexpected error occurred while creating the entrepreneur');
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

  async findByEmail(email: string) {
    console.log('Searching for entrepreneur by email:', email);
    return this.prismaService.entrepreneurs.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
      },
    });
  }

}