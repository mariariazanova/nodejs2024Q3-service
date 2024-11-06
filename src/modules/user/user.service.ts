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

  async create(
    createUserData: CreateUserDto,
  ): Promise<Omit<User, Property.PASSWORD>> {
    const newUser: Partial<User> = {
      ...createUserData,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const createdUser = await super.create(newUser);

    return this.hidePassword(createdUser);
  }

  async update(
    id: string,
    updatePasswordData: UpdatePasswordDto,
  ): Promise<Omit<User, Property.PASSWORD>> {
    const user: User = await this.findOne(id);

    if (user.password !== updatePasswordData.oldPassword) {
      throw new ForbiddenException(ErrorMessage.WRONG_OLD_PASSWORD);
    }

    user.password = updatePasswordData.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return await this.hidePassword(user);
  }

  private async hidePassword(
    user: User,
  ): Promise<Omit<User, Property.PASSWORD>> {
    const userCopy = { ...user };

    delete userCopy[Property.PASSWORD];

    return userCopy;
  }
}
