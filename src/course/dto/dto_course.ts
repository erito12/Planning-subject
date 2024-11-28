import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Nombre del curso',
    example: '2021-2022',
    required: true,
  })
  @IsNotEmpty()
  name_course: string;
}

export class UpdateCourseDto {
  @ApiProperty({ description: 'Nombre del curso', required: false })
  @IsOptional()
  name_course?: string; // Usamos `?` para hacerlo opcional
}
