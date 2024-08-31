import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntrepreneursService } from './entrepreneurs.service';
import { CreateEntrepreneurDTO } from './dto/create-entrepreneur.dto';
import { UpdateEntrepreneurDto } from './dto/update-entrepreneur.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';

// Ejemplos de solicitudes y respuestas
const exampleEntrepreneur = {
  id: 1,
  email: 'n@correo.com',
  firstName: 'New York Name',
  lastName: 'New York Last',
  description: 'Descripción del emprendedor',
  businessName: 'Nombre del negocio',
  businessDescription: 'Descripción del negocio',
  products: [
    {
      name: 'Producto 1',
      description: 'Descripción del producto 1',
      price: 99.99,
    },
  ],
  createdAt: '2024-08-30T14:00:00Z',
  updatedAt: '2024-08-30T14:00:00Z',
};

const exampleErrorResponse = {
  message: [
    'email must be an email',
    'products must be an array of product objects',
  ],
  error: 'Bad Request',
  statusCode: 400,
};

@ApiTags('entrepreneurs')
@Controller('entrepreneurs')
export class EntrepreneursController {
  constructor(private readonly entrepreneursService: EntrepreneursService, private readonly authService: AuthService,) { }



  @Post('signup')
  @ApiOperation({ summary: 'Register a new entrepreneur' })
  signup(@Body() createEntrepreneurDto: CreateEntrepreneurDTO) {
    return this.authService.signup(createEntrepreneurDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login as an entrepreneur' })
  login(@Body() loginCredentials: { email: string; password: string }) {
    const { email, password } = loginCredentials;
    return this.authService.login(email, password);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new entrepreneur' })
  @ApiResponse({ status: 201, description: 'The entrepreneur has been successfully created.', schema: { example: exampleEntrepreneur } })
  @ApiResponse({ status: 400, description: 'Invalid input, object invalid.', schema: { example: exampleErrorResponse } })
  @ApiBody({ description: 'The data to create an entrepreneur', schema: { example: exampleEntrepreneur } })
  create(@Body() createEntrepreneurDto: CreateEntrepreneurDTO) {
    return this.entrepreneursService.create(createEntrepreneurDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all entrepreneurs' })
  @ApiResponse({ status: 200, description: 'The entrepreneurs have been successfully retrieved.' })
  findAll() {
    return this.entrepreneursService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an entrepreneur by id' })
  @ApiResponse({ status: 200, description: 'The entrepreneur has been successfully retrieved.' })
  findOne(@Param('id') id: string) {
    return this.entrepreneursService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an entrepreneur by id' })
  @ApiResponse({ status: 200, description: 'The entrepreneur has been successfully updated.' })
  update(@Param('id') id: string, @Body() updateEntrepreneurDto: UpdateEntrepreneurDto) {
    return this.entrepreneursService.update(+id, updateEntrepreneurDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an entrepreneur by id' })
  @ApiResponse({ status: 200, description: 'The entrepreneur has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.entrepreneursService.remove(+id);
  }
}