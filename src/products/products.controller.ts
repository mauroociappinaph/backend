import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

// Ejemplos de solicitudes y respuestas
const exampleProduct = {
  id: 1,
  name: 'Producto 1',
  description: 'Descripción del producto',
  price: 99.99,
  image: 'http://example.com/image.png',
  createdAt: '2024-08-30T14:00:00Z',
  updatedAt: '2024-08-30T14:00:00Z',
};

const exampleProductErrorResponse = {
  message: [
    'name must be a string',
    'price must be a number',
  ],
  error: 'Bad Request',
  statusCode: 400,
};

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'The product has been successfully created.', schema: { example: exampleProduct } })
  @ApiResponse({ status: 400, description: 'Invalid input, object invalid.', schema: { example: exampleProductErrorResponse } })
  @ApiBody({ description: 'The data to create a product', schema: { example: exampleProduct } })
  create(@Body() createProductDto: CreateProductDTO) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'The products have been successfully retrieved.' })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiResponse({ status: 200, description: 'The product has been successfully retrieved.' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by id' })
  @ApiResponse({ status: 200, description: 'The product has been successfully updated.' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by id' })
  @ApiResponse({ status: 200, description: 'The product has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}

