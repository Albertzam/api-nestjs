import axios from 'axios';
let user = { email: 'maestro@maestro.com', password: '13Demarzo.' };
const API = 'http://localhost:3000';
let bearer = '';

beforeAll(async () => {
  const token = await (await axios.post(`${API}/user/login`, user)).data.token;
  bearer = `bearer ${token}`;
});

describe('Register user endpoint', () => {
  let user = {
    nombre: 'test',
    apellido: 'test',
    email: 'test@test.com',
    password: '13Demarzo.',
    roles: ['MAESTRO'],
  };
  /**
   *.toHaveProperty(keyPath, value?)
   * se usapara verificar si la propiedad en la referencia proporcionada keyPathexiste para un objeto.
   *
   * .toEqueal()
   * Se usa  para comparar de forma recursiva todas las propiedades de las instancias de objetos
   *
   * beforeAll
   * Es como un hook que se usa para hacer algo antes de lanzar el test
   *
   * afterAll
   * realiza una accion al terminar el test
   *
   * Una buena practica es si se hicieron inserts en la BD eliminar esos campos al terminar el test
   * por eso uso el AfterAll para eliminar el usuario test
   *
   * Se tienen mas validaciones en la BD que puedo manejar dentro de los test en el campo de usuarios
   */
  it('registra usuarios con exito', async () => {
    const res = await axios.post(`${API}/user/register`, user);
    expect(res.status).toEqual(201);
    expect(res.data).toHaveProperty('nombre', user.nombre);
    expect(res.data).toHaveProperty('apellido', user.apellido);
    expect(res.data).toHaveProperty('email', user.email);
    expect(res.data).toHaveProperty('email', user.email);
    expect(res.data).toHaveProperty('roles', user.roles);
  });

  it('No se registra el usuario por email duplicado', async () => {
    return expect(
      await axios.post(`${API}/user/register`, user).catch((error) => {
        expect(error.response.status).toEqual(409);
        expect(error.response.data).toHaveProperty(
          'message',
          'Este usuario ya existe',
        );
      }),
    );
  });

  it('No se registra el usuario por parametros invalidos (falta email) (BadRequest)', async () => {
    let user = {
      nombre: 'test',
      apellido: 'test',
      password: '13Demarzo.',
      roles: ['MAESTRO'],
    };
    return expect(
      await axios.post(`${API}/user/register`, user).catch((err) => {
        expect(err.response.status).toEqual(400);
        expect(err.response.data).toMatchObject({
          statusCode: 400,
          message: ['email should not be empty', 'email must be an email'],
          error: 'Bad Request',
        });
      }),
    );
  });

  afterAll(async () => {
    await axios.post(
      `${API}/user/delete`,
      { email: 'test@test.com' },
      { headers: { Authorization: bearer } },
    );
  });
});
