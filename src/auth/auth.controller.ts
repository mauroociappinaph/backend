import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.strategy/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')  // Define una categoría "auth" para los endpoints
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'Iniciar sesión' })
    @ApiResponse({ status: 201, description: 'Usuario autenticado con éxito.' })
    @ApiResponse({ status: 401, description: 'Credenciales incorrectas.' })
    @ApiBody({
        description: 'Datos del usuario para autenticación',
        schema: {
            example: {
                username: 'usuarioEjemplo',
                password: 'contraseña123'
            }
        }
    })
    async login(@Request() req) {
        // Lógica de autenticación del login
        return this.authService.login(req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('protected')
    @ApiOperation({ summary: 'Ruta protegida' })
    @ApiBearerAuth()  // Indica que este endpoint necesita autenticación Bearer
    @ApiResponse({ status: 200, description: 'Acceso autorizado.' })
    @ApiResponse({ status: 401, description: 'No autorizado.' })
    getProtected(@Request() req) {
        return req.user; // Información del usuario autenticado
    }
}