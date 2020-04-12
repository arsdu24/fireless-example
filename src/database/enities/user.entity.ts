import { ObjectID } from 'mongodb';
import { DB } from '@fireless/database';

@DB.Entity('users')
export class User {
  @DB.Column()
  _id!: ObjectID | string;

  @DB.Column('full_name')
  fullName!: string;

  @DB.Column()
  nickname!: string;

  @DB.Column()
  password!: string;

  @DB.Column()
  registeredAt!: Date;

  @DB.Column('last_seen')
  lastVisit!: Date;
}
