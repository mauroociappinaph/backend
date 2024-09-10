import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { EntrepreneursModule } from './entrepreneurs/entrepreneurs.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`,
    isGlobal: true
  }), ProductsModule, EntrepreneursModule, UserModule, CloudinaryModule, AuthModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
