// import { IsNotEmpty } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

// export class CreateSemesterDto {
//   @ApiProperty({
//     description: ' Create Semester',
//     example: {
//       name_semester: 'Primero',
//       startDateSemester: '2022-06-10',
//       endDateSemester: '2022-12-10',
//     },
//   })
//   @IsNotEmpty()
//   name_semester: string;
//   startDateSemester: Date;
//   endDateSemester: Date;

//   @ApiProperty({ description: 'ID del curso asociado', example: 1 })
//   @IsNotEmpty()
//   yearId: number;
// }

// export class UpdateSemesterDto {
//   @ApiProperty({
//     description: 'Actualizar Semestre',
//   })
//   @IsNotEmpty()
//   name_semester: string;
//   startDateSemester: Date;
//   endDateSemester: Date;
// }
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSemesterDto {
  @ApiProperty({
    description: 'Nombre del semestre',
    example: 'Primero', // Cambiado para reflejar el tipo correcto
  })
  @IsNotEmpty()
  name_semester: string;

  @ApiProperty({
    description: 'Fecha de inicio del semestre en formato ISO (YYYY-MM-DD)',
    example: '2022-06-10', // Ejemplo de fecha en formato correcto
  })
  startDateSemester: string; // Cambiado a string para aceptar la fecha en formato ISO

  @ApiProperty({
    description:
      'Fecha de finalización del semestre en formato ISO (YYYY-MM-DD)',
    example: '2022-12-10', // Ejemplo de fecha en formato correcto
  })
  endDateSemester: string; // Cambiado a string para aceptar la fecha en formato ISO

  @ApiProperty({ description: 'ID del curso asociado', example: 4 }) // Ejemplo actualizado
  @IsNotEmpty()
  yearId: number;
}

export class UpdateSemesterDto {
  @ApiProperty({
    description: 'Actualizar nombre del semestre',
    example: 'Segundo', // Ejemplo de actualización
  })
  @IsNotEmpty()
  name_semester: string;

  @ApiProperty({
    description: 'Fecha de inicio del semestre en formato ISO (YYYY-MM-DD)',
    example: '2022-06-10', // Ejemplo de fecha
  })
  startDateSemester: string; // Cambiado a string

  @ApiProperty({
    description:
      'Fecha de finalización del semestre en formato ISO (YYYY-MM-DD)',
    example: '2022-12-10', // Ejemplo de fecha
  })
  endDateSemester: string; // Cambiado a string
}
