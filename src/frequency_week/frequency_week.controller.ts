import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FrequencyWeekService } from './frequency_week.service';
import { CreateFrequencyDto } from './dto/dto_frquency';
import { Frequency } from 'entities/frequency.entity';


@Controller('frenquency-week')
export class FrequencyWeekController {
  constructor(private readonly frequencyService: FrequencyWeekService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una frecuencia' })
  @ApiResponse({ status: 201, description: 'La frecuencia ha sido creada.' })
  async create(
    @Body() createFrequencyDto: CreateFrequencyDto,
  ): Promise<Frequency> {
    return this.frequencyService.create(createFrequencyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas frecuencias' })
  @ApiResponse({ status: 200, description: 'Lista de frecuencias.' })
  async findAll(): Promise<Frequency[]> {
    return this.frequencyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una frecuencia por ID' })
  @ApiResponse({
    status: 200,
    description: 'La frecuencia ha sido encontrada.',
  })
  @ApiResponse({ status: 404, description: 'Frecuencia no encontrada.' })
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
  @ApiOperation({ summary: 'Eliminar una frecuencia' })
  @ApiResponse({ status: 204, description: 'La frecuencia ha sido eliminada.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.frequencyService.remove(id);
  }
}
