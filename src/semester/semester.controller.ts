import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SemesterService } from './semester.service';
import { CreateSemesterDto } from './dto/dto_semester';
import { Semester } from 'src/entities/semester.entity';

@ApiTags('semester')
@Controller('semester')
export class SemesterController {
  constructor(private readonly semesterService: SemesterService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo Semestre' })
  @ApiResponse({ status: 201, description: 'El Semestre ha sido creado.' })
  async create(
    @Body() createSemesterDto: CreateSemesterDto,
  ): Promise<Semester> {
    return this.semesterService.create(createSemesterDto);
  }

  
  @Get()
@ApiOperation({ summary: 'Obtener todos los años' })
@ApiResponse({ status: 200, description: 'Lista de años.' })
async findAll(): Promise<Semester[]> {
  return this.semesterService.findAll();
}
}
