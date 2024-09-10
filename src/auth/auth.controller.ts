import { Controller, Post, Request, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.strategy/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')
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
        try {
            const user = await this.authService.validateUser(req.body.username, req.body.password);
            if (!user) {
                throw new HttpException('Credenciales incorrectas', HttpStatus.UNAUTHORIZED);
            }
            return this.authService.login(user);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('protected')
    @ApiOperation({ summary: 'Ruta protegida' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Acceso autorizado.' })
    @ApiResponse({ status: 401, description: 'No autorizado.' })
    getProtected(@Request() req) {
        return req.user;
    }
}