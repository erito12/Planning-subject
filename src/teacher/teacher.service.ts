// // teacher.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Teacher } from 'src/entities/teacher.entity';
// import { Repository } from 'typeorm';
// import { CreateTeacherDto } from './dto/dto_teacher';


// @Injectable()
// export class TeacherService {
//   constructor(
//     @InjectRepository(Teacher)
//     private readonly teacherRepository: Repository<Teacher>,
//   ) {}

//   async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
//     const teacher = this.teacherRepository.create(createTeacherDto);
//     return await this.teacherRepository.save(teacher);
//   }

//   async findAll(): Promise<Teacher[]> {
//     return await this.teacherRepository.find({ relations: ['subjects'] });
//   }

//   async findOne(id: number): Promise<Teacher> {
//     return await this.teacherRepository.findOne(id, { relations: ['subjects'] });
//   }

//   async update(id: number, updateTeacherDto: Partial<Teacher>): Promise<Teacher> {
//     await this.teacherRepository.update(id, updateTeacherDto);
//     return this.findOne(id);
//   }

//   async remove(id: number): Promise<void> {
//     await this.teacherRepository.delete(id);
//   }
// }
