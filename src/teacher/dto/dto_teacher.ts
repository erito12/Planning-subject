// dto/create-teacher.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({ description: 'nombre y apellidos' })
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'Nivel escolar' })
  @IsString()
  academicDegree: string;

  // Puedes agregar un campo para asignar la asignatura si es necesario
}
