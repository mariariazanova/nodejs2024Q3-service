import { Body, Controller, Param, Put, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user';
import { UpdatePasswordDto } from './dtos/update-password';
import { User } from '../../interfaces/user';
import { IdValidatePipe } from '../../utils/id-validate.pipe';
import { CommonController } from '../../shared/request.controller';

@Controller('user')
export class UserController extends CommonController<User, UpdatePasswordDto> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  @Post()
  create(@Body() data: CreateUserDto): User {
    return this.userService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', IdValidatePipe)
    id: string,
    @Body() data: UpdatePasswordDto,
  ): User {
    return this.userService.update(id, data);
  }
}
