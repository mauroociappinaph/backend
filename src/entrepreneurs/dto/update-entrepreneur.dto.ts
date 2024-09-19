import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateProductDto } from '../../products/dto/update-product.dto';

export class UpdateEntrepreneurDto {
    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    businessName?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateProductDto)
    products?: UpdateProductDto[];
}