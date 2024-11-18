import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SubjectService } from './subject.service';
import { CreateSubjectDto, UpdateSubjectDto } from './dto/dto_subject';
import { Subject } from 'src/entities/subject.entity';

@ApiTags('subject')
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva asignatura' })
  @ApiResponse({ status: 201, description: 'La asignatura ha sido creado.' })
  async create(@Body() createSubjectDto: CreateSubjectDto): Promise<Subject> {
    return this.subjectService.create(createSubjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los años' })
  @ApiResponse({ status: 200, description: 'Lista de años.' })
  async findAll(): Promise<Subject[]> {
    return this.subjectService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un año por ID' })
  @ApiResponse({ status: 200, description: 'El año encontrado.' })
  @ApiResponse({ status: 404, description: 'Año no encontrado.' })
  async findOne(@Param('id') id: number): Promise<Subject> {
    return this.subjectService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un año' })
  @ApiResponse({ status: 200, description: 'El año ha sido actualizado.' })
  @ApiResponse({ status: 404, description: 'Año no encontrado.' })
  async update(
    @Param('id') id: number,
    @Body() updateYearDto: UpdateSubjectDto,
  ): Promise<Subject> {
    return this.subjectService.update(id, updateYearDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un año' })
  @ApiResponse({ status: 204, description: 'El año ha sido eliminado.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.subjectService.remove(id);
  }
}
