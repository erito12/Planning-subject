import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';



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

  @ApiProperty({ description: 'ID de la asignatura asociada' })
  @IsNotEmpty()
  subjectId: number;

  @ApiProperty({ description: 'ID de la semana asociada' })
  @IsNotEmpty()
  weekId: number;
}
