import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SemesterService } from './semester.service';
import { CreateSemesterDto, UpdateSemesterDto } from './dto/dto_semester';
import { Semester } from 'src/entities/semester.entity';
import { UpdateYearDto } from 'src/year/dto/dto_year';

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

@Get(':id')
  @ApiOperation({ summary: 'Obtener un semester por ID' })
  @ApiResponse({ status: 200, description: 'El semester encontrado.' })
  @ApiResponse({ status: 404, description: 'Semester encontrado.' })
  async findOne(@Param('id') id: number): Promise<Semester> {
    return this.semesterService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un semester' })
  @ApiResponse({ status: 200, description: 'El semester ha sido actualizado.' })
  @ApiResponse({ status: 404, description: 'Semester no encontrado.' })
  async update(
    @Param('id') id: number,
    @Body() updateSemesterDto: UpdateSemesterDto,
  ): Promise<Semester> {
    return this.semesterService.update(id, updateSemesterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un semester' })
  @ApiResponse({ status: 204, description: 'El semester ha sido eliminado.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.semesterService.remove(id);
  }
}
