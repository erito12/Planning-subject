import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FrequencyWeekService } from './frequency_week.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateFrequencyDto } from './dto/dto_frquency';
import { Frequency } from 'src/entities/frequency.entity';

@Controller('frenquency-week')
export class FrequencyWeekController {
  constructor(private readonly frequencyService: FrequencyWeekService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un profesor' })
  @ApiResponse({ status: 201, description: 'La asignatura ha sido creado.' })
  async create(
    @Param() createFrequencyDto: CreateFrequencyDto,
  ): Promise<Frequency> {
    return this.frequencyService.create(createFrequencyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los profesores' })
  @ApiResponse({ status: 200, description: 'Lista de profesores.' })
  async findAll(): Promise<Frequency[]> {
    return this.frequencyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un año por ID' })
  @ApiResponse({ status: 200, description: 'El año encontrado.' })
  @ApiResponse({ status: 404, description: 'Año no encontrado.' })
  async findOne(@Param('id_frequecy') id: number): Promise<Frequency> {
    return this.frequencyService.findOne(id);
  }

  // @Put(':id')
  // @ApiOperation({ summary: 'Actualizar un año' })
  // @ApiResponse({ status: 200, description: 'El año ha sido actualizado.' })
  // @ApiResponse({ status: 404, description: 'Año no encontrado.' })
  // async update(
  //   @Param('id') id: number,
  //   @Body() updateTeacherDto: UpdateTeacherDto,
  // ): Promise<Frequency> {
  //   return this.teacherService.update(id, updateTeacherDto);
  // }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un año' })
  @ApiResponse({ status: 204, description: 'El año ha sido eliminado.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.frequencyService.remove(id);
  }
}
