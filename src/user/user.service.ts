import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserRequest } from './create-user-request-type';
import { PaginateResponse } from '../utils/types/paginate-type';
import { checkIsValidEmail } from 'src/utils/helpers/helpers';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(req: CreateUserRequest): Promise<User> {
    if (!req.name) {
      throw new BadRequestException('name is required');
    }

    if (!req.email) {
      throw new BadRequestException('email is required');
    }

    if (!req.password) {
      throw new BadRequestException('name is required');
    }

    const isValidEmail = checkIsValidEmail(req.email);
    if (!isValidEmail) {
      throw new BadRequestException('email is not valid');
    }

    try {
      return await this.userRepository.save(req);
    } catch (error) {}
  }

  async getUsers(
    qPage: number,
    qTake: number,
  ): Promise<PaginateResponse<User>> {
    try {
      const take = qTake || 10;
      const page = qPage || 1;
      const skip = (page - 1) * take;

      const [items, totalCount] = await this.userRepository.findAndCount({
        take: take,
        skip: skip,
      });

      const lastPage = totalCount < take ? 1 : Math.ceil(totalCount / take);
      const nextPage = page + 1 > lastPage ? null : page + 1;
      const prevPage = page - 1 < 1 ? null : page - 1;

      return {
        items,
        totalItem: totalCount,
        totalPage: lastPage,
        currentPage: Number(page),
        nextPage: nextPage,
        prevPage: prevPage,
        lastPage: lastPage,
      };
    } catch (error) {}
  }
}
