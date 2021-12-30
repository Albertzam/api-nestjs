export interface IRegisterHomework {
  idCourse: string;
  name: string;
  dateLimit: number;
}

export interface IListHomework {
  id: string;
}

export interface IDeleteHomework {
  id: string;
}

export interface IUpdateHomework {
  id: string;
  name: string;
  dateLimit: number;
}

export interface IUpdateCalification {
  idHomework: string;
  students: [
    {
      idStudent: string;
      calif: number;
    },
  ];
}

export interface IUpdateCalificationStudent {
  idStudent: string;
  idHomework: string;
  calificacion: number;
}

export interface IAux {
  idStudent: string;
  calif?: number;
  sinEntregar: number;
  entregadas: number;
  promedio: number;
  tareasNoEntregadas?: Noentregadas[];
}

export interface Noentregadas {
  name: string;
}
