// entrepreneurs/entrepreneurs.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { EntrepreneursService } from './entrepreneurs.service';
import { EntrepreneursController } from './entrepreneurs.controller';
import { PrismaService } from '../infrastructure/prisma/prisma.service';
import { AuthModule } from 'src/infrastructure/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)], // Usa forwardRef si es necesario
  controllers: [EntrepreneursController],
  providers: [EntrepreneursService, PrismaService],
  exports: [EntrepreneursService], // Exporta el servicio si es necesario
})
export class EntrepreneursModule { }