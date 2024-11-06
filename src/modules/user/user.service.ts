import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user';
import { UpdatePasswordDto } from './dtos/update-password';
import dataBase from '../../data-base/data-base';
import { User } from '../../interfaces/user';
import { ErrorMessage } from '../../enums/error-message';
import { RequestService } from '../../shared/request.service';
import { Property } from '../../enums/property';

@Injectable()
export class UserService extends RequestService<User, UpdatePasswordDto> {
  protected notFoundErrorMessage = ErrorMessage.USER_NOT_EXIST;

  protected get items(): User[] {
    return dataBase.users;
  }

  create(createUserData: CreateUserDto): Omit<User, Property.PASSWORD> {
    const newUser: Partial<User> = {
      ...createUserData,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const createdUser = super.create(newUser);

    return this.hidePassword(createdUser);
  }

  update(
    id: string,
    updatePasswordData: UpdatePasswordDto,
  ): Omit<User, Property.PASSWORD> {
    const user: User = this.findOne(id);

    if (user.password !== updatePasswordData.oldPassword) {
      throw new ForbiddenException(ErrorMessage.WRONG_OLD_PASSWORD);
    }

    user.password = updatePasswordData.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return this.hidePassword(user);
  }

  private hidePassword(user: User): Omit<User, Property.PASSWORD> {
    const userCopy = { ...user };

    delete userCopy[Property.PASSWORD];

    return userCopy;
  }
}
