import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

export type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(req: CreateUserRequest): Promise<User> {
    try {
      return await this.userRepository.save(req);
    } catch (error) {}
  }

  async getUsers(qPage: number, qTake: number) {
    try {
      const take = qTake || 10;
      const page = qPage || 1;
      const skip = (page - 1) * take;

      const [items, totalCount] = await this.userRepository.findAndCount({
        take: take,
        skip: skip,
      });

      const lastPage = totalCount < take ? 1 : Math.ceil(totalCount / take);
      const nextPage = Number(page) + 1 > lastPage ? null : Number(page) + 1;
      const prevPage = Number(page) - 1 < 1 ? null : Number(page) - 1;

      return {
        items,
        totalCount,
        totalPage: lastPage,
        currentPage: Number(page),
        nextPage: nextPage,
        prevPage: prevPage,
        lastPage: lastPage,
      };
    } catch (error) {}
  }
}
