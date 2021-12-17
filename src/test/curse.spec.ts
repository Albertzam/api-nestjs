import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessControl } from 'accesscontrol';
import { AccessControlModule } from 'nest-access-control';
import { AuthModule } from '../auth/auth.module';
import { CurseController } from '../curse/controllers/curse.controller';
import { CurseService } from '../curse/services/curse.service';
import { ClaseEntidad } from '../entity/clase.entity';
import { ListaEntidad } from '../entity/list.entity';
import { UserGeneral } from '../entity/user_general.entity';
import { WorkEntidad } from '../entity/work.entity';
import { GeneralRole, roles } from '../roles';
import * as request from 'supertest';
import bootstrap from '../main';

const user = { email: 'maestro@maestro.com', password: '13Demarzo.' };
const userStudent = { email: 'alumno@alumno.com', password: '13Demarzo.' };
const API = 'http://localhost:3000';
let bearer = '';
let bearerStudent = '';
let CourseName = {
  name: 'testeo3',
};
let idCourse = {
  idCourse: '61b05ccf7ce4dee3510aefa8',
};
beforeAll(async () => {
  let token = await (
    await request(API).post('/user/login').send(user)
  ).body.token;
  bearer = `Bearer ${token}`;
  token = await (
    await request(API).post('/user/login').send(userStudent)
  ).body.token;
  bearerStudent = `Bearer ${token}`;
});

describe('Curse controller', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let jwtToken: string;
  const unAuthorizedCall = (path: string, body: any) =>
    request(API).post(path).send(body);

  const authorizedCall = (path: string, body: any) =>
    unAuthorizedCall(path, body).set({ Authorization: bearer });

  const forbidenCall = (path: string, body: any) =>
    unAuthorizedCall(path, body).set({ Authorization: bearerStudent });

  const unAuthorizedCallGet = (path: string, body?: any) =>
    request(API).get(path);

  const authorizedCallGet = (path: string, body?: any) =>
    unAuthorizedCallGet(path).set({ Authorization: bearer });

  describe('/curse/register-curse', () => {
    const param = {
      name: '',
    };
    it('unauthorized register curse', async () => {
      await unAuthorizedCall(`/curse/register-course`, param).expect(401);
    });
    it('bad request register curse', async () => {
      await authorizedCall('/curse/register-course', param)
        .expect(400)
        .expect({
          statusCode: 400,
          message: ['name should not be empty'],
          error: 'Bad Request',
        });
    });
    it('forbiden register course', async () => {
      await forbidenCall('/curse/register-course', CourseName).expect(403);
    });
    it('register new course', async () => {
      await authorizedCall('/curse/register-course', CourseName).expect(201);
    });
    it('unauthorized register student of course', async () => {
      await unAuthorizedCall('/curse/register-alumn-course', {}).expect(401);
    });
    it('register student of course bad request', async () => {
      await forbidenCall('/curse/register-alumn-course', {})
        .expect(400)
        .expect({
          statusCode: 400,
          message: [
            'idCourse must be longer than or equal to 7 characters',
            'idCourse should not be empty',
          ],
          error: 'Bad Request',
        });
      /**
       * principios solid
       */
    });
    it('register student of course ', async () => {
      await forbidenCall('/curse/register-alumn-course', {
        idCourse: '10aefa8',
      }).expect(201);
    });

    it('register student fail with duplicate', async () => {
      await forbidenCall('/curse/register-alumn-course', {
        idCourse: '10aefa8',
      })
        .expect(409)
        .expect({
          statusCode: 409,
          message: 'Ya se encuentra en el curso',
        });
    });

    describe('take attendance to students', () => {
      it('list courses of students', async () => {
        await authorizedCallGet('/curse/get-courses').expect(200);
      });

      it('list courses unauthorized ', async () => {
        await unAuthorizedCallGet('/curse/get-courses').expect(401);
      });

      it('list asist for teachers', async () => {
        /**
         * Error de logica, ya que no existe el documento
         * no tienia como tal que buscar y habia un codigo
         * de error 500 porque no se encontraba
         */
        await authorizedCallGet(
          '/curse/get-list/61b05ccf7ce4dee3510aefa8',
        ).expect(200);
      });

      it('Bad request for register asist students', async () => {
        await authorizedCall('/curse/register-asist', [{}])
          .expect(400)
          .expect({
            statusCode: 400,
            message: [
              'idCourse must be longer than or equal to 24 characters',
              'idCourse must be a string',
              'idCourse should not be empty',
              'students should not be empty',
            ],
            error: 'Bad Request',
          });
      });
      it('register asist of students', async () => {
        await authorizedCall('/curse/register-asist', {
          idCourse: '61b05ccf7ce4dee3510aefa8',
          students: [{ idStudent: '61b052f50f84a6cbbeb2f8ef', status: 'A' }],
        }).expect(201);
      });
    });
  });
  afterAll(async () => {
    await unAuthorizedCall('/curse/delete', CourseName).expect(201);
  });
});

// NESTJS
