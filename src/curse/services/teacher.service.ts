import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClaseEntidad } from 'src/entity/clase.entity';
import { WorkEntidad } from 'src/entity/work.entity';
import {
  CourseErrorCodes,
  CourseErrorHttpStatus,
} from 'src/errors/course.errors';
import { ICourseUpdate } from 'src/interface/course.interface';
import {
  IDeleteHomework,
  IListHomework,
  IRegisterHomework,
  IUpdateHomework,
} from 'src/interface/work.interface';
import { MongoRepository } from 'typeorm';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(ClaseEntidad)
    private courseEntity: MongoRepository<ClaseEntidad>,
    @InjectRepository(WorkEntidad)
    private workEntity: MongoRepository<WorkEntidad>,
  ) {}

  async getListCourses(id: string) {
    return await this.courseEntity.find({
      select: ['name', 'status', 'id', 'createdAt', 'idCourse'],
      where: { userId: id, status: 'A' },
    });
  }

  async deleteCourse(id: string) {
    const courseDelete = await this.courseEntity.findOne(id);

    if (!courseDelete) {
      throw new HttpException(
        CourseErrorCodes.COURSE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if (courseDelete.deletedAt)
      throw new HttpException(
        CourseErrorCodes.COURSE_ALREADY_DELETED,
        HttpStatus.BAD_REQUEST,
      );

    const deleteCourse = await this.courseEntity.update(id, {
      deletedAt: new Date(),
      status: 'B',
    });

    return deleteCourse;
  }

  async updateCourse(course: ICourseUpdate) {
    console.log(course);
    const dataCourse = await this.courseEntity.findOne(course.id);
    if (!dataCourse)
      throw new HttpException(
        'No se encuentra el curso',
        HttpStatus.BAD_REQUEST,
      );

    dataCourse.name = course.name;
    const updateCourse = await this.courseEntity.save(dataCourse);
    await this.courseEntity.update(course.id, {
      name: course.name,
    });

    return updateCourse;
  }

  async registerHomework(newHomework: IRegisterHomework) {
    // lunes, 26 de diciembre de 2050 9 a. m.
    const homework = await this.workEntity.create(newHomework);
    homework.dateLimit = newHomework.dateLimit;
    await this.workEntity.save(homework);

    return homework;
  }

  async getListHomework(list: IListHomework) {
    const listHomeworks = await this.workEntity.find({
      select: ['id', 'name', 'status', 'dateLimit', 'createdAt'],
      where: { idCourse: list.id },
    });
    return listHomeworks;
  }

  async updateHomework(homework: IUpdateHomework) {
    const dataHomework = await this.workEntity.findOne(homework.id);
    if (!dataHomework)
      throw new HttpException('No existe esta tarea', HttpStatus.BAD_REQUEST);

    (dataHomework.name = homework.name),
      (dataHomework.dateLimit = homework.dateLimit);

    const updateHomework = await this.workEntity.save(dataHomework);
    await this.workEntity.update(homework.id, {
      name: homework.name,
      dateLimit: homework.dateLimit,
    });

    return updateHomework;
  }

  async deleteHomework(id: IDeleteHomework) {
    const dateHome = await this.workEntity.findOne(id.id);

    if (!dateHome)
      throw new HttpException('No existe esta tarea', HttpStatus.BAD_REQUEST);

    await this.workEntity.delete(id.id);
    return {
      deleted: id.id,
      message: 'Eliminated homework',
    };
  }
}
