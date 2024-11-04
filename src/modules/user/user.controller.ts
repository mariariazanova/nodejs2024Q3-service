import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Post,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user';
import { UpdatePasswordDto } from './dtos/update-password';
import { User } from '../../interfaces/user';
import { ErrorMessage } from '../../enums/error-message';
import { IdValidatePipe } from '../../utils/id-validate.pipe';
import { CommonController } from '../../shared/request.controller';
// import { customExceptionFactory } from '../../utils/validation-error.factory';
// import { CustomValidationPipe } from '../../utils/custom-validation.pipe';

// @UsePipes(new CustomValidationPipe())
@Controller('user')
// @UsePipes(
//   new ValidationPipe({
//     exceptionFactory: customExceptionFactory,
//   }),
// )
export class UserController extends CommonController<
  User,
  // CreateUserDto,
  UpdatePasswordDto
> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  // @Get()
  // findAll(): User[] {
  //   return this.userService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(
  //   @Param('id', IdValidatePipe)
  //   id: string,
  // ): User {
  //   return this.userService.findOne(id);
  // }
  //
  @Post()
  // // @UsePipes(
  // //   new ValidationPipe({
  // //     exceptionFactory: (errors) =>
  // //       new BadRequestException(
  // //         errors
  // //           .map((err) => Object.values(err.constraints))
  // //           .flat()
  // //           .join(', '),
  // //       ),
  // //   }),
  // // )
  create(@Body() createUser: CreateUserDto): User {
    return this.userService.create(createUser);
  }
  //
  @Put(':id')
  update(
    @Param('id', IdValidatePipe)
    id: string,
    @Body() updateUserDto: UpdatePasswordDto,
  ): User {
    return this.userService.update(id, updateUserDto);
  }
  //
  // @HttpCode(HttpStatus.NO_CONTENT)
  // @Delete(':id')
  // remove(@Param('id', IdValidatePipe) id: string): void {
  //   this.userService.remove(id);
  // }
}
