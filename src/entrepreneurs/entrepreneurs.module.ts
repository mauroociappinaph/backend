import { Module } from '@nestjs/common';
import { EntrepreneursService } from './entrepreneurs.service';
import { EntrepreneursController } from './entrepreneurs.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EntrepreneursController],
  providers: [EntrepreneursService, PrismaService],
})
export class EntrepreneursModule { }
