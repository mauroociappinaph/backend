import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntrepreneursService } from './entrepreneurs.service';
import { CreateEntrepreneurDTO } from './dto/create-entrepreneur.dto';
import { UpdateEntrepreneurDto } from './dto/update-entrepreneur.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('entrepreneurs')
@Controller('entrepreneurs')
export class EntrepreneursController {
  constructor(private readonly entrepreneursService: EntrepreneursService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new entrepreneur' })
  @ApiResponse({ status: 201, description: 'The entrepreneur has been successfully created.' })
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
