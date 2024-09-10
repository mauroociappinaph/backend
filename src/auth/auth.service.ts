import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }


    async validateUser(username: string, pass: string): Promise<any> {
        //? Aquí deberías verificar el usuario en tu base de datos
        const user = { username, password: 'dummyPassword' };
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    // Método para generar un token JWT
    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}