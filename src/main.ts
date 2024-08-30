import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { CORS } from './constant';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalFilters(new AllExceptionsFilter());

  //! Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Emprendedores')
    .setDescription('Documentación de la API para gestionar emprendedores y productos.')
    .setVersion('1.0')
    .addTag('entrepreneurs')
    .addTag('products')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  app.enableCors(CORS);

  app.useGlobalPipes(new ValidationPipe({
    transformOptions: {
      enableImplicitConversion: true,
    }
  }))


  const configService = app.get(ConfigService);
  app.use(morgan('dev'));
  await app.listen(configService.get('PORT'));
  console.log(`Application is running on: ${await app.getUrl()}`);

}
bootstrap();
