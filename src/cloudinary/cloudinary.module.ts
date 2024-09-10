import { CloudinaryProvider } from './cloudinary.provider';
import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
@Module({

  providers: [CloudinaryService, CloudinaryProvider, PrismaService],
  exports: [CloudinaryService, CloudinaryProvider],
  controllers: [CloudinaryController]
})
export class CloudinaryModule { }
