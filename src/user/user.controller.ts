import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateUserRequest, UserService } from './user.service';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Res() res: Response, @Body() reqBody: CreateUserRequest) {
    try {
      res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: 'success create user',
        data: await this.userService.createUser(reqBody),
      });
    } catch (error) {
      res.status(error.status).send({
        status: error.status,
        message: error.message,
      });
    }
  }
}
