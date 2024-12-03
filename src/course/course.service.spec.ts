import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCourseDto, UpdateCourseDto } from './dto/dto_course';
import { CourseService } from './course.service';
import { Course } from 'entities/course.entity';

describe('CourseService', () => {
  let service: CourseService;
  let repository: Repository<Course>;

  const mockCourseRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: getRepositoryToken(Course),
          useValue: mockCourseRepository,
        },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    repository = module.get<Repository<Course>>(getRepositoryToken(Course));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new course', async () => {
      const createCourseDto: CreateCourseDto = { name_course: '2023-2024' };
      const course = { id_course: 1, ...createCourseDto };

      mockCourseRepository.create.mockReturnValue(course);
      mockCourseRepository.save.mockResolvedValue(course);

      expect(await service.create(createCourseDto)).toEqual(course);
      expect(mockCourseRepository.create).toHaveBeenCalledWith(createCourseDto);
      expect(mockCourseRepository.save).toHaveBeenCalledWith(course);
    });
  });

  describe('findAll', () => {
    it('should return an array of courses', async () => {
      const courses = [{ id_course: 1 }, { id_course: 2 }];
      mockCourseRepository.find.mockResolvedValue(courses);

      expect(await service.findAll()).toEqual(courses);
      expect(mockCourseRepository.find).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a course', async () => {
      const updateCourseDto: UpdateCourseDto = {
        /* propiedades del DTO */
      };
      const existingCourse = { id_course: 1, ...updateCourseDto };

      mockCourseRepository.findOne.mockResolvedValue(existingCourse);
      mockCourseRepository.save.mockResolvedValue(existingCourse);

      expect(await service.update(1, updateCourseDto)).toEqual(existingCourse);
      expect(mockCourseRepository.findOne).toHaveBeenCalledWith({
        where: { id_course: 1 },
      });
    });
  });

  describe('remove', () => {
    it('should delete a course', async () => {
      await service.remove(1);
      expect(mockCourseRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
