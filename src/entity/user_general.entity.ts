import {
  Entity,
  Column,
  ObjectID,
  ObjectIdColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common';
@Entity()
export class UserGeneral {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  segApe: string;

  @Column()
  imagen: string;

  @Column()
  roles: string[];

  @Column()
  status: string;
  /**
   * DB insert time.
   */

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
    this.status = 'A';
  }
}
