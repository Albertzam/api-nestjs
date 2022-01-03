import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClaseEntidad } from '../../entity/clase.entity';
import { UserGeneral } from '../../entity/user_general.entity';
import {
  IAlumnCourse,
  ICourse,
  Ilista,
  INewWork,
} from '../../interface/course.interface';
import { MongoRepository } from 'typeorm';
import * as moment from 'moment';
import { ListaEntidad } from '../../entity/list.entity';
import { WorkEntidad } from '../../entity/work.entity';

@Injectable()
export class CurseService {
  constructor(
    @InjectRepository(ClaseEntidad)
    private courseEntity: MongoRepository<ClaseEntidad>,
    @InjectRepository(UserGeneral)
    private readonly userRepository: MongoRepository<UserGeneral>,
    @InjectRepository(ListaEntidad)
    private readonly listRepository: MongoRepository<ListaEntidad>,
    @InjectRepository(WorkEntidad)
    private readonly workRepository: MongoRepository<WorkEntidad>,
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
      const final = {
        ...course,
        idCourse: course.id.toString().substr(-7, 7),
      };
      return {
        course: final,
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
        /**
         * Agregar tareas al alumno nuevo
         */
        console.log(studentExist);
        const aux = await this.workRepository.findOne({
          idCourse: studentExist.id.toString(),
        });

        aux.students.push({ idStudent: newStudent.idAlumn, calif: 0 });
        await this.workRepository.update(aux.id, { students: aux.students });
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

  async getCourses(idStudent: string) {
    let courses = await this.courseEntity.find({
      select: ['userId', 'id', 'name'],
      where: {
        students: { $in: [idStudent] },
        status: 'A',
      },
    });

    if (courses) {
      const teachers = courses.map((u) => u.userId);
      const teachersFind = await this.userRepository.findByIds(teachers, {
        select: ['nombre', 'apellido'],
      });
      let final = [];
      teachersFind.forEach((u, i) => {
        return courses.map((e) => {
          if (e.userId === u.id.toString()) {
            final.push({
              id: e.id,
              nombreClase: e.name,
              nombre: `${u.nombre} ${u.apellido} ${u.segApe ? u.segApe : ''}`,
            });
          }
        });
      });
      return final;
    }
  }

  async registerAsist(lista: Ilista) {
    const listExist = await this.listRepository.findOne({
      idCourse: lista.idCourse,
    });

    if (listExist) return this.updateList(lista);
    else return this.createList(lista);
  }

  private async createList(lista: Ilista) {
    let fecha = moment();
    const list = await this.listRepository.create({
      idCourse: lista.idCourse,
      lista: [{ fecha: fecha.format('DD-MM-YYYY'), students: lista.students }],
    });
    await this.listRepository.save(list);
    return list;
    /*let fecha = moment();
    const list = await this.listRepository.create({
      idCourse: lista.idCourse,
      lista: [{ fecha: fecha.format('DD-MM-YYYY'), students: lista.students }],
    });
    await this.listRepository.save(list);
    return list;*/
  }

  private async updateList(lista: Ilista) {
    let fecha = moment();
    const listAux = await this.listRepository.findOne({
      idCourse: lista.idCourse,
    });

    if (listAux.lista.find((u) => u.fecha === fecha.format('DD-MM-YYYY'))) {
      listAux.idCourse = lista.idCourse;

      listAux.lista.forEach((u) => {
        if (u.fecha === fecha.format('DD-MM-YYYY')) {
          u.students = lista.students;
        }
      });
      await this.listRepository.update(
        { idCourse: lista.idCourse },
        { lista: listAux.lista },
      );
      return {
        message: `Lista actualizada ${fecha.format('DD-MM-YYYY')}`,
      };
    }

    listAux.idCourse = lista.idCourse;
    listAux.lista.push({
      fecha: fecha.format('DD-MM-YYYY'),
      students: lista.students,
    });
    const list = await this.listRepository.save(listAux);
    await this.listRepository.update(
      { idCourse: lista.idCourse },
      { lista: listAux.lista },
    );
    return list;

    /* const listAux = await this.listRepository.findOne({
      idCourse: lista.idCourse,
    });
    if (listAux.lista.find((u) => u.fecha === fecha.format('DD-MM-YYYY'))) {
      listAux.idCourse = lista.idCourse;
      let auxFechaList = listAux.lista.find(
        (u) => u.fecha === fecha.format('DD-MM-YYYY'),
      );
      //Para agregar que si vinieron despues o llegaron con retardo
      const aux = listAux.lista.filter(
        (u) => u.fecha !== fecha.format('DD-MM-YYYY'),
      );
      auxFechaList.students = [...auxFechaList.students, ...lista.students];
      await this.listRepository.update(
        { idCourse: lista.idCourse },
        { lista: [...aux, auxFechaList] },
      );
      return {
        message: `Se actualizo la lista de hoy ${fecha.format('DD-MM-YYYY')}`,
      };
    }
    listAux.idCourse = lista.idCourse;
    listAux.lista.push({
      fecha: fecha.format('DD-MM-YYYY'),
      students: lista.students,
    });
    const list = await this.listRepository.save(listAux);
    await this.listRepository.update(
      { idCourse: lista.idCourse },
      { lista: listAux.lista },
    );
    return list;*/
  }

  /**
   *
   * @param idCourse
   * @returns la lista de los alumnos si fueron o no
   */
  async getList(idCourse: string, calif = false) {
    let fecha = moment();
    const listFecha = await this.listRepository.findOne({ idCourse: idCourse });
    const list = await this.courseEntity.findOne(idCourse);
    let exit: boolean;
    let studentList = [];
    if (listFecha && !calif)
      listFecha.lista.forEach((u) => {
        if (u.fecha === fecha.format('DD-MM-YYYY')) {
          studentList = u.students;
          exit = true;
        }
      });

    if (exit) return studentList;

    const user: UserGeneral[] = await this.userRepository.findByIds(
      list.students,
      { where: { status: 'A' } },
    );
    console.log(user);
    list.students.forEach((u) =>
      user.forEach((e) => {
        if (e.id.toString() === u.toString() && !calif) {
          studentList.push({
            idStudent: e.id,
            nombre: `${e.apellido} ${e.segApe} ${e.nombre}`,
            status: 'Y',
          });
        } else if (e.id.toString() === u.toString() && calif) {
          studentList.push({
            idStudent: e.id,
            calif: 0,
          });
        }
      }),
    );
    return studentList;
    /*console.log(listFecha);
    listFecha.lista.forEach((u) => {
      if (u.fecha === fecha.format('DD-MM-YYYY')) {
        console.log(u.students);
        return u.students;
      } else {
        return 'No existe de esta fecha';
      }
    });*/
  }

  async registerWork(work: INewWork) {
    const workExist = await this.workRepository.find({
      idCourse: work.idCourse,
    });

    if (workExist) {
    } else {
      return this.createWork(work);
    }
  }

  async createWork(work: INewWork) {}

  async updateWork(work: INewWork) {}

  async deleteTemp(name: string) {
    await this.courseEntity.delete({ name: name });
  }
}
