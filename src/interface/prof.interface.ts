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
