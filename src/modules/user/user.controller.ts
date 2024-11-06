import { Body, Controller, Param, Put, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user';
import { UpdatePasswordDto } from './dtos/update-password';
import { User } from '../../interfaces/user';
import { IdValidatePipe } from '../../utils/id-validate.pipe';
import { CommonController } from '../../shared/request.controller';
import { Property } from '../../enums/property';

@Controller('user')
export class UserController extends CommonController<User, UpdatePasswordDto> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  @Post()
  async create(
    @Body() data: CreateUserDto,
  ): Promise<Omit<User, Property.PASSWORD>> {
    return await this.userService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', IdValidatePipe)
    id: string,
    @Body() data: UpdatePasswordDto,
  ): Promise<Omit<User, Property.PASSWORD>> {
    return this.userService.update(id, data);
  }
}
