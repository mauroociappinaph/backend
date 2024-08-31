import { IsString, IsNotEmpty, IsNumber, Min, IsOptional, IsInt } from 'class-validator';

export class CreateProductDTO {
    @IsString()
    @IsNotEmpty({ message: 'Product name must not be empty' })
    name: string;

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string;

    @IsNumber()
    @Min(0, { message: 'Price must be a positive number' })
    price: number;

    @IsOptional()
    @IsString({ message: 'Image must be a string' })
    image?: string;

    @IsOptional()
    @IsInt({ message: 'Entrepreneur ID must be an integer' })
    entrepreneurId?: number;
}