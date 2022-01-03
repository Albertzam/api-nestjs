import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment';
import { ClaseEntidad } from 'src/entity/clase.entity';
import { UserGeneral } from 'src/entity/user_general.entity';
import { WorkEntidad } from 'src/entity/work.entity';
import {
  CourseErrorCodes,
  CourseErrorHttpStatus,
} from 'src/errors/course.errors';
import { ICourseUpdate, Ilista } from 'src/interface/course.interface';
import { IDeleteStudent, IUpdateUser } from 'src/interface/prof.interface';
import {
  IAux,
  IDeleteHomework,
  IListHomework,
  IRegisterHomework,
  IUpdateCalification,
  IUpdateCalificationStudent,
  IUpdateHomework,
} from 'src/interface/work.interface';
import { MongoRepository, ObjectID } from 'typeorm';
import { CurseService } from './curse.service';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(ClaseEntidad)
    private courseEntity: MongoRepository<ClaseEntidad>,
    @InjectRepository(WorkEntidad)
    private workEntity: MongoRepository<WorkEntidad>,
    @InjectRepository(UserGeneral)
    private readonly userRepository: MongoRepository<UserGeneral>,
    private readonly curseService: CurseService,
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
    const homework = await this.workEntity.create(newHomework);
    const listStudent = await this.curseService.getList(
      newHomework.idCourse,
      true,
    );
    console.log(listStudent);
    homework.dateLimit = newHomework.dateLimit;
    const finA = await this.workEntity.save(homework);
    await this.workEntity.update(finA.id, { students: listStudent });

    return {
      ...finA,
      students: [...listStudent],
    };
  }

  async getListHomework(list: IListHomework) {
    const listHomeworks = await this.workEntity.find({
      select: ['id', 'name', 'status', 'dateLimit', 'createdAt', 'descripcion'],
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
  async getList(id: string) {
    const usersList = await this.courseEntity.findOne(id);
    const user: UserGeneral[] = await this.userRepository.findByIds(
      usersList.students,
      { select: ['id', 'nombre', 'apellido', 'segApe', 'status'] },
    );

    return user;
  }

  async updateStudent(student: IUpdateUser) {
    const dataUser = await this.userRepository.findOne(student.id);

    if (!dataUser)
      throw new HttpException('Usuario no encontrado', HttpStatus.BAD_REQUEST);

    dataUser.nombre = student.nombre;
    dataUser.apellido = student.apellido;
    dataUser.segApe = student.segApe;
    const updateUser = await this.userRepository.save(dataUser);
    await this.userRepository.update(student.id, {
      nombre: student.nombre,
    });
    return {
      ...updateUser,
      password: undefined,
      email: undefined,
      roles: undefined,
    };
  }

  async deleteStudent(id: IDeleteStudent) {
    const dataCourse = await this.courseEntity.findOne(id.idCourse);
    if (!dataCourse)
      throw new HttpException('Este curso no existe', HttpStatus.BAD_REQUEST);

    const newArrayStudent = dataCourse.students.filter(
      (u) => u !== id.idStudent,
    );
    dataCourse.students = newArrayStudent;
    const updateStudents = await this.courseEntity.save(dataCourse);
    await this.courseEntity.update(id.idCourse, { students: newArrayStudent });

    return id.idStudent;
  }
  async getListCalifications(idHomework: string) {
    const dataHomework = await this.workEntity.findOne(idHomework);
    console.log(dataHomework);
    if (!dataHomework)
      throw new HttpException('Tarea no enconcontrada', HttpStatus.BAD_REQUEST);
    const IdsStudents = dataHomework.students.map((u) => u.idStudent);
    const listStudents = await this.userRepository.findByIds(IdsStudents);
    let finArrayStudents = [];

    dataHomework.students.map((student) => {
      listStudents.map((list) => {
        if (student.idStudent.toString() == list.id.toString())
          finArrayStudents.push({
            idStudent: list.id,
            nombre: `${list.nombre} ${list.apellido} ${list.segApe}`,
            calificacion: student.calif,
          });
      });
    });
    return finArrayStudents;
  }

  async registerCalificationHomework(idCourse: string, idHomework: String) {}

  async updateCalificationHomework(updateCalification: IUpdateCalification) {
    const dataHomework = await this.workEntity.findOne({
      id: updateCalification.idHomework as any,
    });
    if (!dataHomework)
      throw new HttpException('Tarea no encontrada', HttpStatus.BAD_REQUEST);
    dataHomework.students = updateCalification.students;
    const updateList = await this.workEntity.save(dataHomework);
    await this.workEntity.update(updateCalification.idHomework, {
      students: updateCalification.students,
    });

    return updateList;
  }

  async updateCalificationStudent(
    updateCalification: IUpdateCalificationStudent,
  ) {
    const dataHomework = await this.workEntity.findOne(
      updateCalification.idHomework,
    );
    if (!dataHomework)
      throw new HttpException('No existe esta tarea', HttpStatus.BAD_REQUEST);
    const arrayFinal = [];
    dataHomework.students.map((u) => {
      if (u.idStudent == updateCalification.idStudent) {
        u.calif = updateCalification.calificacion;
      }
      arrayFinal.push(u);
    });
    dataHomework.students = arrayFinal;

    const updateStudent = await this.workEntity.save(dataHomework);

    await this.workEntity.update(updateCalification.idHomework, {
      students: arrayFinal,
    });
    return {
      idStudent: updateCalification.idStudent,
      calificacion: updateCalification.calificacion,
    };
  }

  async getCalificationAll(idCourse: string) {
    //tomamos todas las tareas del curso
    const dataWork = await this.workEntity.find({ idCourse: idCourse });
    const userList = await this.courseEntity.findOne(idCourse);

    const calificaciones: IAux[] = [];
    userList.students.map((u) =>
      calificaciones.push({
        idStudent: u,
        calif: 0,
        sinEntregar: 0,
        entregadas: 0,
        promedio: 0,
        tareasNoEntregadas: [],
      }),
    );

    const sumaTotalEstudiantes = userList.students;
    dataWork.map((student) =>
      student.students.map((st) => {
        calificaciones.map((sum) => {
          if (sum.idStudent === st.idStudent.toString()) {
            sum.calif += st.calif;
          }
          if (sum.idStudent === st.idStudent.toString() && st.calif == 0) {
            sum.sinEntregar += 1;
            sum.tareasNoEntregadas.push({ name: student.name });
          } else if (
            sum.idStudent === st.idStudent.toString() &&
            st.calif !== 0
          ) {
            sum.entregadas += 1;
          }
        });
      }),
    );
    /**promedios */
    let generalProm: number = 0;
    calificaciones.map((u) => {
      u.promedio = u.calif / dataWork.length;
      generalProm += u.promedio;
    });

    return {
      students: [...calificaciones],
      promedioGeneral: generalProm / userList.students.length,
      totalTareas: dataWork.length,
    };
  }
}
