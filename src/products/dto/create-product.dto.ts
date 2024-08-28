import { Product } from '@prisma/client'

export type CreateProductDTO = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>