import { IsString, IsNotEmpty, IsOptional, IsArray, ValidateNested, IsNumber, Min, MinLength, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateProductDTO {

    @IsString()
    @IsNotEmpty({ message: "Product name must not be empty" })
    name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: "Product description must not be empty" })
    description?: string;

    @IsNumber()
    @Min(0)
    @IsNotEmpty({ message: "Product price must not be empty" })
    price: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: "Product image must not be empty" })
    image?: string;
}


export class CreateEntrepreneurDTO {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @MinLength(6)
    password: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    businessName: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateProductDTO)
    products?: CreateProductDTO[];
}

export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}