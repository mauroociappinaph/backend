import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service'; // Importamos PrismaService
import { CloudinaryResponse } from './cloudinary-response';
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
    constructor(private readonly prisma: PrismaService) { } // Inyectamos Prisma

    async uploadFile(file: Express.Multer.File, entrepreneurId: number, productId: number): Promise<CloudinaryResponse> {
        return new Promise<CloudinaryResponse>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                async (error: any, result: UploadApiResponse) => {
                    if (error) {
                        return reject(error);
                    }

                    // Actualizamos el producto con la URL de la imagen
                    await this.prisma.product.update({
                        where: { id: productId },
                        data: {
                            image: result.secure_url, // Guardamos la URL de la imagen en el producto
                            entrepreneursId: entrepreneurId // Asociamos el producto con el emprendedor
                        }
                    });

                    resolve(result as CloudinaryResponse);
                }
            );

            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
    }
}