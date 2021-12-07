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

export interface Ilista {
  idCourse: string;
  students: ILista[];
}

export interface IlistaFinal {
  fecha: string;
  students: ILista[];
}

export interface ILista {
  idStudent: string;
  status: string;
}

export interface IWorks {
  student: [
    {
      idStudent: string;
      urlWork: string;
      createdAt: string;
    },
  ];
}

export interface INewWork {
  idCourse: string;
  name: string;
  createdAt: Date;
  dateLimit: Date;
  status: string;
  works: IArrayWork;
}

export interface IArrayWork {
  idStudent: string;
  urlWork: string;
  createdAt: string;
  status: string;
}
