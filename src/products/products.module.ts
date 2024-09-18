import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 600, // Tiempo de vida de la caché en segundos (10 minutos)
      isGlobal: true, // Hacer que el caché esté disponible globalmente (opcional)
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
})
export class ProductsModule { }