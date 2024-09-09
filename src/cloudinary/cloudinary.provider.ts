import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
    provider: 'CLOUDINARY',
    useFactory: () => ({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })
}

