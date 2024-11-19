import { Controller, Get, Param } from '@nestjs/common';
import { WeekService } from './week.service';
import { Week } from 'src/entities/week.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('week')
@Controller('week')
export class WeekController {
  constructor(private readonly weekService: WeekService) {}

  @ApiOperation({ summary: 'Buscar una semana por ID' })
  @ApiResponse({ status: 201, description: 'La semana ha sido encontrada' })
  @Get(':id')
  async getWeek(@Param('id') id: number): Promise<Week[]> {
    return this.weekService.findWeeksBySemester(id);
  }

  // Ruta para listar todas las semanas

  // @ApiOperation({ summary: 'Buscar todas las semanas' })
  // @ApiResponse({ status: 201, description: 'Semanas encontradas' })
  // @Get()
  // async getAllWeeks(): Promise<Week[]> {
  //   return this.weekService.findAll();
  // }
}
