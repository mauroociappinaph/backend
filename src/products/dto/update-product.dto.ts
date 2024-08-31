
import { IsString, IsNotEmpty, IsNumber, Min, IsOptional, IsInt } from 'class-validator';





export class UpdateProductDto {
    @IsInt()
    @IsNotEmpty()
    @IsOptional()
    id?: number;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsInt()
    entrepreneurId?: number;
}