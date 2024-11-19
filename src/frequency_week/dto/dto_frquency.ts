import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SubjectType } from 'src/common/enums/subject-type.enum';

export class CreateFrequencyDto {
  @IsString()
  @ApiProperty({
    description: 'tipo de frecuncia ',
    example: 'CP',
  })
  frequencyType: SubjectType;

  @IsString()
  @ApiProperty({
    description: 'tipo de frecuncia ',
    example: 'Primera',
  })
  numberFrequency: string;

  @ApiProperty({ description: 'ID del Semestre asociado' })
  @IsNotEmpty()
  subjectId: number;
  
}
