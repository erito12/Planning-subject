import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { SubjectType } from 'src/common/enums/subject-type.enum';

export class CreateFrequencyDto {
  @IsString()
  @ApiProperty({
    description: 'tipo de frecuncia ',
    example: 'conferencia',
  })
  frequencyType: string;

  @IsString()
  @ApiProperty({
    description: 'tipo de frecuncia ',
    example: '1',
  })
  numberFrequency: number;

  @ApiProperty({ description: 'ID del Semestre asociado' })
  @IsNotEmpty()
  subjectId: number;

  @ApiProperty({ description: 'ID del Semestre asociado' })
  @IsNotEmpty()
  weekId: number;
}
