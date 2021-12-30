import { IArrayWork } from 'src/interface/course.interface';
import {
  Entity,
  Column,
  ObjectID,
  ObjectIdColumn,
  BeforeInsert,
} from 'typeorm';
@Entity()
export class WorkEntidad {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  idCourse: string;

  @Column()
  name: string;

  @Column()
  descripcion: string;
  @Column()
  createdAt: number;

  @Column()
  dateLimit: number;

  @Column()
  status: string;

  @Column()
  students: IArrayWork[];

  @BeforeInsert()
  async createDate(): Promise<void> {
    this.createdAt = new Date().valueOf();
    this.status = 'A';
  }
}
