import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubjectDto {
  @ApiProperty({ description: 'Asignatura' })
  @IsNotEmpty()
  name_subject: string;
  totalHours_subject: string;

  @ApiProperty({ description: 'ID del Semestre asociado' })
  @IsNotEmpty()
  semesterId: number; // ID del semestre asociado
}

export class UpdateSubjectDto {
  @ApiProperty({ description: 'Asignatura' })
  @IsOptional()
  name_subject: string;
  totalHours_subject: string;
}
