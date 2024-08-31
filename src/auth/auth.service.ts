// src/auth/auth.service.ts

import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EntrepreneursService } from '../entrepreneurs/entrepreneurs.service';
import { CreateEntrepreneurDTO } from '../entrepreneurs/dto/create-entrepreneur.dto';

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
            const entrepreneur = await this.entrepreneursService.create({
                ...createEntrepreneurDto,
                password: hashedPassword,
            });
            const token = this.jwtService.sign({ id: entrepreneur.id, email: entrepreneur.email });
            return { entrepreneur, token };
        } catch (error) {
            throw new ConflictException('Email already exists');
        }
    }

    async login(email: string, password: string) {
        const entrepreneur = await this.entrepreneursService.findByEmail(email);
        if (!entrepreneur) {
            throw new NotFoundException('Entrepreneur not found');
        }

        const isPasswordValid = await bcrypt.compare(password, entrepreneur.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.jwtService.sign({ id: entrepreneur.id, email: entrepreneur.email });
        return { entrepreneur, token };
    }
}