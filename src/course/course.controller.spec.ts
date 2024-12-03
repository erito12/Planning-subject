import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './dto/dto_course';

describe('CourseController', () => {
  let controller: CourseController;
  let service: CourseService;

  const mockCourseService = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
        {
          provide: CourseService,
          useValue: mockCourseService,
        },
      ],
    }).compile();

    controller = module.get<CourseController>(CourseController);
    service = module.get<CourseService>(CourseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new course', async () => {
      const createCourseDto: CreateCourseDto = { name_course: '2023-2024' };
      const course = { id_course: 1, ...createCourseDto };

      service.create = jest.fn().mockResolvedValue(course);

      expect(await controller.create(createCourseDto)).toEqual(course);
      expect(service.create).toHaveBeenCalledWith(createCourseDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of courses', async () => {
      const courses = [{ id_course: 1 }, { id_course: 2 }];
      service.findAll = jest.fn().mockResolvedValue(courses);

      expect(await controller.findAll()).toEqual(courses);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a course', async () => {
      const updateCourseDto: UpdateCourseDto = {
        /* propiedades del DTO */
      };
      const course = { id_course: 1, ...updateCourseDto };

      service.update = jest.fn().mockResolvedValue(course);

      expect(await controller.update(1, updateCourseDto)).toEqual(course);
      expect(service.update).toHaveBeenCalledWith(1, updateCourseDto);
    });
  });

  describe('remove', () => {
    it('should delete a course', async () => {
      await controller.remove(1);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
