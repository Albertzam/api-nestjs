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
