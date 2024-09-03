// auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface'; // Interfaz opcional para el tipo de datos del payload

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET, // Asegúrate de tener JWT_SECRET en tu archivo .env
        });
    }

    async validate(payload: JwtPayload) {
        // Aquí puedes añadir lógica para validar el usuario si es necesario
        // Por ejemplo, buscar al usuario en la base de datos usando el payload.sub (userId)
        return { userId: payload.sub, email: payload.email };
    }
}