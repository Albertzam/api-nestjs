import {
  Entity,
  Column,
  ObjectID,
  ObjectIdColumn,
  BeforeInsert,
  CreateDateColumn,
  BeforeUpdate,
  DeleteDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity()
export class UserEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  email: string;

  @Column()
  user: string;

  @Column()
  name: string;

  @Column()
  firstsurname: string;

  @Column()
  secondsurname: string;

  @Column()
  password: string;

  @Column()
  roles: string[];

  @Column()
  status: string;
  /**
   * DB insert time.
   */
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  /**
   * DB last update time.
   */

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
