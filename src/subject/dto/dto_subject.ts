import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubjectDto {
  @ApiProperty({ description: 'Asignatura', example: 'Englis' })
  @IsNotEmpty()
  name_subject: string;

  @ApiProperty({ description: 'total de horas', example: 20 })
  totalHours_subject: number;

  @ApiProperty({ description: 'ID del Semestre asociado' })
  @IsNotEmpty()
  semesterId: number; // ID del semestre asociado
}

export class UpdateSubjectDto {
  @ApiProperty({ description: 'Asignatura' })
  @IsOptional()
  name_subject: string;
  @ApiProperty({ description: 'Asignatura' })
  totalHours_subject: number;
}
