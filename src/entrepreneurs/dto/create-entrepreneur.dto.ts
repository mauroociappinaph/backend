import { IsString, IsEmail, IsOptional, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDTO {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsOptional()
    @IsString()
    image?: string;
}

export class CreateEntrepreneurDTO {
    @IsEmail()
    email: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsString()
    website?: string;

    @IsOptional()
    @IsString()
    twitterHandle?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsString()
    businessName: string;

    @IsOptional()
    @IsString()
    businessDescription?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateProductDTO)
    products?: CreateProductDTO[];
}