import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CloudinaryResponse } from './cloudinary-response';
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
    constructor(private readonly prisma: PrismaService) { }

    async uploadFile(file: Express.Multer.File, entrepreneurId: number, productId: number): Promise<CloudinaryResponse> {
        try {
            return new Promise<CloudinaryResponse>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    async (error: any, result: UploadApiResponse) => {
                        if (error) {
                            reject(new HttpException('Error subiendo imagen a Cloudinary', HttpStatus.BAD_REQUEST));
                        }

                        // Actualizamos el producto con la URL de la imagen subida
                        await this.prisma.product.update({
                            where: { id: productId },
                            data: {
                                image: result.secure_url, // Guardar URL optimizada
                                entrepreneursId: entrepreneurId // Relacionar con el emprendedor
                            }
                        });

                        resolve(result as CloudinaryResponse);
                    }
                );

                // Añadir transformaciones a la imagen (ej: cambiar tamaño)
                streamifier.createReadStream(file.buffer).pipe(uploadStream);
            });
        } catch (error) {
            throw new HttpException('Error al subir la imagen', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}