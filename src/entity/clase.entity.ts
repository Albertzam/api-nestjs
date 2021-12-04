import {
  Entity,
  Column,
  ObjectID,
  ObjectIdColumn,
  BeforeInsert,
} from 'typeorm';
@Entity()
export class ClaseEntidad {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  idCourse: string;

  @Column()
  name: string;

  @Column()
  userId: string;

  @Column()
  createdAt: Date;

  @Column()
  students: string[];

  @Column()
  status: string;
  @BeforeInsert()
  async createDate(): Promise<void> {
    this.createdAt = new Date();
    this.status = 'A';
    this.students = [];
  }
}
