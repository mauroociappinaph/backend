import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.strategy/jwt-auth.guard'; // Este guard protegerá las rutas

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Request() req) {
        // Lógica de autenticación del login
        return this.authService.login(req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('protected')
    getProtected(@Request() req) {
        return req.user; // Información del usuario autenticado
    }
}