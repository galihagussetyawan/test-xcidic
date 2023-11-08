import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { CreateUserRequest } from './create-user-request-type';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ResponseTimeInterceptor } from 'src/utils/interceptors/response-time.interceptor';

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

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ResponseTimeInterceptor)
  async getUsers(
    @Res() res: Response,
    @Query() query: { page: number; take: number },
  ) {
    try {
      res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: 'success create user',
        data: await this.userService.getUsers(
          Number(query.page),
          Number(query.take),
        ),
      });
    } catch (error) {
      res.status(error.status).send({
        status: error.status,
        message: error.message,
      });
    }
  }
}
