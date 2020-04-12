import { Injectable } from '@fireless/common';
import { EntityManager } from '@fireless/database';
import { User } from '../database/enities/user.entity';

@Injectable()
export class UserService {
  constructor(private entityManager: EntityManager) {}

  async getUserById(id: string): Promise<User | undefined> {
    return this.entityManager.findOne(User, { _id: id });
  }

  async getAll(limit?: number, skip?: number): Promise<User[]> {
    return this.entityManager.find(User, {}, { limit, skip });
  }

  async save(user: User): Promise<User> {
    return await this.entityManager.save(user);
  }
}
