// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { EntrepreneursService } from '../../entrepreneurs/entrepreneurs.service';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

import { EntrepreneursController } from '../../entrepreneurs/entrepreneurs.controller';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'defaultSecret', // Usa una variable de entorno
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [EntrepreneursController],
    providers: [EntrepreneursService, PrismaService, JwtStrategy, AuthService],
    exports: [JwtModule, AuthService],
})
export class AuthModule { }