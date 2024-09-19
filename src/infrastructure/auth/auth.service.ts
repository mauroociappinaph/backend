// src/infrastructure/auth/auth.service.ts
import { Injectable, ConflictException, NotFoundException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EntrepreneursService } from '../../entrepreneurs/entrepreneurs.service';
import { CreateEntrepreneurDTO } from '../../entrepreneurs/dto/create-entrepreneur.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly entrepreneursService: EntrepreneursService,
        private readonly jwtService: JwtService,
    ) { }

    async signup(createEntrepreneurDto: CreateEntrepreneurDTO) {
        const { email, password } = createEntrepreneurDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            console.log('Attempting to sign up user:', email);
            const entrepreneur = await this.entrepreneursService.create({
                ...createEntrepreneurDto,
                password: hashedPassword,
            });
            const token = this.jwtService.sign({ id: entrepreneur.id, email: entrepreneur.email });
            console.log('User signed up successfully:', entrepreneur.id);
            return { entrepreneur, token };
        } catch (error) {
            console.error('Error during signup:', error.message);
            throw new ConflictException('Email already exists');
        }
    }

    async login(email: string, password: string) {
        console.log('Attempting to log in user:', email);
        const entrepreneur = await this.entrepreneursService.findByEmail(email);
        if (!entrepreneur) {
            console.error('Login failed: User not found');
            throw new NotFoundException('Entrepreneur not found');
        }

        const isPasswordValid = await bcrypt.compare(password, entrepreneur.password);
        if (!isPasswordValid) {
            console.error('Login failed: Invalid credentials');
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.jwtService.sign({ id: entrepreneur.id, email: entrepreneur.email });
        console.log('User logged in successfully:', entrepreneur.id);
        return { entrepreneur, token };
    }
}