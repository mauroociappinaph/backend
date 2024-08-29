import { Entrepreneurs } from '@prisma/client';

export type CreateEntrepreneurDTO = Omit<Entrepreneurs, 'id' | 'createdAt' | 'updatedAt'>