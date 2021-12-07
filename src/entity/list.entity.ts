import { IlistaFinal } from 'src/interface/course.interface';
import {
  Entity,
  Column,
  ObjectID,
  ObjectIdColumn,
  BeforeInsert,
} from 'typeorm';
@Entity()
export class ListaEntidad {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  idCourse: string;

  @Column()
  lista: IlistaFinal[];

  @BeforeInsert()
  async createDate(): Promise<void> {}
}
