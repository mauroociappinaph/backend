import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EntrepreneursService } from '../entrepreneurs/entrepreneurs.service';  // Importa el servicio de emprendedores

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly entrepreneursService: EntrepreneursService  // Inyecta el servicio de emprendedores
    ) { }

    // Valida al usuario buscando en la base de datos real
    async validateUser(email: string, pass: string): Promise<any> {
        try {
            // Busca al emprendedor en la base de datos usando su email
            const entrepreneur = await this.entrepreneursService.findByEmail(email);
            if (entrepreneur && entrepreneur.password === pass) {
                const { password, ...result } = entrepreneur;
                return result;  // Retorna el emprendedor sin la contraseña
            }
            return null;  // Si la contraseña no coincide, retorna null
        } catch (error) {
            throw new HttpException('Error validando el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Login: Genera el token JWT y retorna la información del emprendedor
    async login(entrepreneur: any) {
        const payload = { email: entrepreneur.email, sub: entrepreneur.id };  // Datos para el token
        return {
            access_token: this.jwtService.sign(payload),  // Firma el token JWT
            entrepreneur: {
                id: entrepreneur.id,
                email: entrepreneur.email,
                firstName: entrepreneur.firstName,
                lastName: entrepreneur.lastName,
                avatar: entrepreneur.avatar,  // Incluye el avatar en la respuesta
                businessName: entrepreneur.businessName,
            },
        };
    }

    // Método para manejar el cierre de sesión (si es necesario)
    async logout() {
        return { message: 'Logout successful' };
    }
}