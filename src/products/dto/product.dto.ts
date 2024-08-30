import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class ProductDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsString()
    image?: string;
}