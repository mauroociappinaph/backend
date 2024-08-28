import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma/prisma.service';
import { EntrepreneursModule } from './entrepreneurs/entrepreneurs.module';


@Module({
  imports: [ProductsModule, EntrepreneursModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
