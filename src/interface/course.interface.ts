export interface ICourse {
  name: string;
  userId: string;
}
export interface IAlumnCourse {
  idCourse: string;
  idAlumn: string;
  nameAlumn?: string;
}

export interface ICourseRegister {
  idCourse: string;
}

export interface IEmail {
  email: string;
}
