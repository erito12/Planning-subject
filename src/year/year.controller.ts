import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { YearService } from './year.service';

import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CreateYearDto, UpdateYearDto } from './dto/dto_year';
import { Year } from 'src/entities/year.entity';

@ApiTags('years')
@Controller('years')
export class YearController {
  constructor(private readonly yearService: YearService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo año' })
  @ApiResponse({ status: 201, description: 'El año ha sido creado.' })
  async create(@Body() createYearDto: CreateYearDto): Promise<Year> {
    return this.yearService.create(createYearDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los años' })
  @ApiResponse({ status: 200, description: 'Lista de años.' })
  async findAll(): Promise<Year[]> {
    return this.yearService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un año por ID' })
  @ApiResponse({ status: 200, description: 'El año encontrado.' })
  @ApiResponse({ status: 404, description: 'Año no encontrado.' })
  async findOne(@Param('id') id: number): Promise<Year> {
    return this.yearService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un año' })
  @ApiResponse({ status: 200, description: 'El año ha sido actualizado.' })
  @ApiResponse({ status: 404, description: 'Año no encontrado.' })
  async update(
    @Param('id') id: number,
    @Body() updateYearDto: UpdateYearDto,
  ): Promise<Year> {
    return this.yearService.update(id, updateYearDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un año' })
  @ApiResponse({ status: 204, description: 'El año ha sido eliminado.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.yearService.remove(id);
  }
}
