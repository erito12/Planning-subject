import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { WeekService } from './week.service';
import { Week } from 'entities/week.entity';

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

  // Endpoint para obtener una semana por ID y semestre
  @ApiOperation({ summary: 'Buscar una semana por ID y semestre' })
  @ApiResponse({ status: 200, description: 'La semana ha sido encontrada' })
  @Get(':id_semestre/by-id/:id_week')
  async getWeekById(
    @Param('id_semestre') semesterId: number,
    @Param('id_week') weekId: string, // Cambia el tipo a string
  ): Promise<Week> {
    console.log(`Buscando semanas para el semestre ID: ${semesterId}`);
    const weeks = await this.weekService.findWeeksBySemester(semesterId);

    // console.log(weeks); // Verifica qué semanas se están recuperando

    const numericWeekId = Number(weekId); // Convierte weekId a número
    console.log(`Tipo de weekId convertido: ${typeof numericWeekId}`);

    const week = weeks.find((w) => {
      console.log(
        `Comparando ${w.id_week} (tipo: ${typeof w.id_week}) con ${numericWeekId} (tipo: ${typeof numericWeekId})`,
      );
      return w.id_week === numericWeekId; // Realiza la comparación
    });

    if (!week) {
      throw new NotFoundException(
        `Semana con ID ${numericWeekId} no encontrada`,
      );
    }
    return week;
  }
}
