import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateUserDto } from './dtos/create-user';
import { UpdatePasswordDto } from './dtos/update-password';
import dataBase from '../../data-base/data-base';
import { User } from '../../interfaces/user';
import { ErrorMessage } from '../../enums/error-message';
import { RequestService } from '../../shared/request.service';
import { Property } from '../../enums/property';

@Injectable()
export class UserService extends RequestService<User, UpdatePasswordDto> {
  // CreateUserDto,
  // UpdatePasswordDto
  protected notFoundErrorMessage = ErrorMessage.USER_NOT_EXIST;
  // protected additionalCreateArguments = {
  //   version: 1,
  //   createdAt: Date.now(),
  //   updatedAt: Date.now(),
  // };

  protected get items(): User[] {
    return dataBase.users;
  }

  // protected checkUpdatedData(data: UpdatePasswordDto, user: User): void {
  //   if (user.password !== data.oldPassword) {
  //     throw new ForbiddenException(ErrorMessage.WRONG_OLD_PASSWORD);
  //   }
  // }
  //
  // protected updateAdditionalData(data: UpdatePasswordDto, user: User): User {
  //   user.password = data.newPassword;
  //   user.version += 1;
  //   user.updatedAt = Date.now();
  //
  //   return user;
  // }

  //
  // findAll(): User[] {
  //   return dataBase.users;
  // }

  // findOne(id: string): User {
  //   const user = dataBase.users.find((user: User) => user.id === id);
  //
  //   if (!user) {
  //     throw new NotFoundException(ErrorMessage.USER_NOT_EXIST);
  //   }
  //
  //   return user;
  // }

  create(createUserData: CreateUserDto): Omit<User, Property.PASSWORD> {
    const newUser: Partial<User> = {
      // id: v4(),
      ...createUserData,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const createdUser = super.create(newUser);

    return this.hidePassword(createdUser);
    // super.create(newUser);

    // dataBase.users.push(newUser);
    //
    // return newUser;
  }

  update(
    id: string,
    updatePasswordData: UpdatePasswordDto,
  ): Omit<User, Property.PASSWORD> {
    const user: User = this.findOne(id);

    if (user.password !== updatePasswordData.oldPassword) {
      throw new ForbiddenException(ErrorMessage.WRONG_OLD_PASSWORD);
    }
    // const changes: Partial<User> = {
    //   password: updatePasswordData.newPassword,
    //   version: user.version + 1,
    //   updatedAt: Date.now(),
    // };
    //
    // return super.update(id, changes);

    user.password = updatePasswordData.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return this.hidePassword(user);

    // return user;
  }

  // remove(id: string): void {
  //   const index = dataBase.users.findIndex((user: User) => user.id === id);
  //
  //   if (index < 0) {
  //     throw new NotFoundException(ErrorMessage.USER_NOT_EXIST);
  //   }
  //
  //   dataBase.users.splice(index, 1);
  // }

  private hidePassword(user: User): Omit<User, Property.PASSWORD> {
    const { [Property.PASSWORD]: _, ...remaining } = user;

    return remaining;
  }
}
