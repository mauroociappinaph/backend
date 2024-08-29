import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma/prisma.service';
import { EntrepreneursModule } from './entrepreneurs/entrepreneurs.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`,
    isGlobal: true
  }), ProductsModule, EntrepreneursModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
