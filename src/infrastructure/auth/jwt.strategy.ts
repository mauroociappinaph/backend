import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'your_jwt_secret', // Debes cambiar esto por una variable de entorno
        });
    }

    // Método que valida el token JWT
    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}