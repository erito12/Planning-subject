import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSemesterDto {
  @ApiProperty({
    description: ' Create Semester',
    example: {
      name_semester: 'Primero',
      startDateSemester: '2022-06-10', // Formato ISO (YYYY-MM-DD)
      endDateSemester: '2022-12-10', // Formato ISO (YYYY-MM-DD)
      yearId: 3,
    },
  })
  @IsNotEmpty()
  name_semester: string;
  startDateSemester: Date;
  endDateSemester: Date;

  @ApiProperty({ description: 'ID del curso asociado' })
  @IsNotEmpty()
  yearId: number;
}

export class UpdateSemesterTodo {
  @ApiProperty({
    description: 'Actualizar Semestre',
  })
  @IsNotEmpty()
  name_semester: string;
  startDateSemester: Date;
  endDateSemester: Date;
}
