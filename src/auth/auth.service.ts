import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        try {
            const user = { username, password: 'dummyPassword' }; // Simulación, reemplaza con base de datos real
            if (user && user.password === pass) {
                const { password, ...result } = user;
                return result;
            }
            return null;
        } catch (error) {
            throw new HttpException('Error validando el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    // Método para manejar el cierre de sesión
    async logout() {
        // Si estás manejando una lista de revocación o un sistema de sesiones, podrías hacer más lógica aquí
        return { message: 'Logout successful' };
    }
}