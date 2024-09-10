import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        try {
            // Aquí deberías verificar el usuario en tu base de datos
            const user = { username, password: 'dummyPassword' };  // Simulación, reemplaza con base de datos real
            if (user && user.password === pass) {
                const { password, ...result } = user;
                return result;
            }
            return null;
        } catch (error) {
            throw new HttpException('Error validando el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Método para generar un token JWT
    async login(user: any) {
        try {
            const payload = { username: user.username, sub: user.userId };
            return {
                access_token: this.jwtService.sign(payload),
            };
        } catch (error) {
            throw new HttpException('Error generando el token JWT', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}