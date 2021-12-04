import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClaseEntidad } from 'src/entity/clase.entity';
import { ClassromEntity } from 'src/entity/classrom.entity';
import { UserGeneral } from 'src/entity/user_general.entity';
import { IAlumnCourse, ICourse } from 'src/interface/course.interface';
import { MongoRepository } from 'typeorm';

@Injectable()
export class CurseService {
  constructor(
    @InjectRepository(ClaseEntidad)
    private courseEntity: MongoRepository<ClaseEntidad>,
    @InjectRepository(UserGeneral)
    private readonly userRepository: MongoRepository<UserGeneral>,
  ) {}

  async registerCourse(newCourse: ICourse) {
    const courseExist = await this.courseEntity.findOne({
      name: newCourse.name,
      status: 'A',
    });

    if (courseExist) {
      throw new HttpException('Este curso ya existe', HttpStatus.CONFLICT);
    } else {
      const course = await this.courseEntity.create(newCourse);
      await this.courseEntity.save(course);
      await this.courseEntity.update(
        { id: course.id },
        { idCourse: course.id.toString().substr(-7, 7) },
      );
      return {
        message: 'Curso creado',
      };
    }
  }

  async registerStudent(newStudent: IAlumnCourse) {
    const studentExist = await this.courseEntity.findOne({
      idCourse: newStudent.idCourse,
      status: 'A',
    });
    if (studentExist) {
      if (studentExist.students.find((u) => u === newStudent.idAlumn)) {
        throw new HttpException(
          'Ya se encuentra en el curso',
          HttpStatus.CONFLICT,
        );
      } else {
        studentExist.students.push(newStudent.idAlumn);
        const updateStudent = await this.courseEntity.save(studentExist);
        await this.courseEntity.update(
          { idCourse: newStudent.idCourse },
          { students: studentExist.students },
        );
        return {
          nameCourse: `Te uniste al curso de ${updateStudent.name}`,
        };
      }
    } else {
      throw new HttpException('Curso no disponible', HttpStatus.CONFLICT);
    }
  }

  async getStudents(idCourse: string) {
    const courseExist = await this.courseEntity.findOne({
      idCourse: idCourse,
      status: 'A',
    });
    if (courseExist) {
      const user = await this.userRepository.findByIds(courseExist.students, {
        select: ['nombre', 'apellido', 'segApe'],
      });

      return user;
    } else throw new HttpException('Curso no disponible', HttpStatus.CONFLICT);
  }
}
