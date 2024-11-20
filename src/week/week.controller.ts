import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { WeekService } from './week.service';
import { Week } from 'src/entities/week.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('week')
@Controller('week')
export class WeekController {
  constructor(private readonly weekService: WeekService) {}

  @ApiOperation({ summary: 'Buscar todas las semanas' })
  @ApiResponse({ status: 201, description: 'Busqueda Exitosa' })
  @Get(':id_semestre')
  async getWeek(@Param('id') id: number): Promise<Week[]> {
    return this.weekService.findWeeksBySemester(id);
  }

  // Endpoint para obtener una semana por ID
  @ApiOperation({ summary: 'Buscar una semana por ID asadsad' })
  @ApiResponse({ status: 201, description: 'La semana ha sido encontrada' })
  @Get(':id_week')
  async getWeekById(@Param('id') id: number): Promise<Week> {
    const week = await this.weekService.findWeekById(id);
    if (!week) {
      throw new NotFoundException(`Semana con ID ${id} no encontrada`);
    }
    return week;
  }
}
