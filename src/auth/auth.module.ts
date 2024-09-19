import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy/jwt.strategy';
import { RolesGuard } from './roles/roles.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'your_jwt_secret', // Debes cambiar esto por una variable de entorno
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RolesGuard],
  exports: [AuthService], // Exporta el AuthService si necesitas usarlo en otros módulos
})
export class AuthModule { }