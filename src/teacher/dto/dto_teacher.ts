// dto/create-teacher.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({
    description: 'nombre y apellidos',
    example: 'Julian Fernandez Perez',
  })
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'Nivel escolar' })
  @IsString()
  academicDegree: string;

  @ApiProperty({ description: 'ID de la asignatura asociada' })
  @IsNotEmpty()
  subjectId: number;
}

export class UpdateTeacherDto {
  @ApiProperty({ description: 'nombre completo' })
  @IsOptional()
  fullName: string;

  @ApiProperty({ description: 'Nivel escolar' })
  @IsString()
  academicDegree: string;
}
