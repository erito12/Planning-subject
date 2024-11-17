import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateYearDto {
  @ApiProperty({ description: 'Año', example: 2023 })
  @IsNotEmpty()
  name_year: string;

  @ApiProperty({ description: 'ID del curso asociado' })
  @IsNotEmpty()
  courseId: number; // ID del curso asociado
}

export class UpdateYearDto {
  @ApiProperty({ description: 'Año', required: false })
  @IsOptional()
  name_year: string;
}
