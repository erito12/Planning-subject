// dto/create-teacher.dto.ts
import { IsString } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  fullName: string;

  @IsString()
  academicDegree: string;

  // Puedes agregar un campo para asignar la asignatura si es necesario
}
