import { Controller, Post, UploadedFile, UseInterceptors, Param, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';

@ApiTags('cloudinary')
@Controller('cloudinary')
export class CloudinaryController {
    constructor(private readonly cloudinaryService: CloudinaryService) { }

    @Post('upload/:entrepreneurId/:productId')
    @ApiOperation({ summary: 'Upload a file to Cloudinary and associate it with a product' })
    @ApiResponse({ status: 201, description: 'File successfully uploaded and associated with a product.' })
    @ApiResponse({ status: 400, description: 'Invalid file or upload error.' })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Param('entrepreneurId') entrepreneurId: number,
        @Param('productId') productId: number
    ) {
        if (!file) {
            throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
        }

        try {
            return await this.cloudinaryService.uploadFile(file, entrepreneurId, productId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}