export interface IUserGeneral {
  id?: string;
  nombre: string;
  apellido: string;
  segApe?: string;
  imagen?: string;
  email: string;
  password: string;
  roles: string[];
}

export interface IUpdateUser {
  id: string;
  nombre: string;
  apellido: string;
  segApe?: string;
}

export interface IDeleteStudent {
  idStudent: string;
  idCourse: string;
}
