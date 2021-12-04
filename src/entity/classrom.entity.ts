import {
  Entity,
  Column,
  ObjectID,
  ObjectIdColumn,
  BeforeInsert,
} from 'typeorm';
@Entity()
export class ClassromEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  idCourse: string;

  @Column()
  idAlumn: string;

  @Column()
  nameAlumn: string;

  @Column()
  joinedAt: Date;

  @Column()
  status: string;
  @BeforeInsert()
  async createDate(): Promise<void> {
    this.joinedAt = new Date();
    this.status = 'A';
  }
}
