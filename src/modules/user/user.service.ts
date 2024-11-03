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

@Injectable()
export class UserService {
  create(createUserData: CreateUserDto) {
    const newUser: User = {
      id: v4(),
      ...createUserData,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    dataBase.users.push(newUser);

    return newUser;
  }

  findAll(): User[] {
    return dataBase.users;
  }

  findOne(id: string): User {
    const user = dataBase.users.find((user: User) => user.id === id);

    if (!user) {
      throw new NotFoundException(ErrorMessage.USER_NOT_EXIST);
    }

    return user;
  }

  update(id: string, updatePasswordData: UpdatePasswordDto): User {
    const user: User = this.findOne(id);

    if (user.password !== updatePasswordData.oldPassword) {
      throw new ForbiddenException(ErrorMessage.WRONG_OLD_PASSWORD);
    }

    user.password = updatePasswordData.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return user;
  }

  remove(id: string): void {
    const index = dataBase.users.findIndex((user: User) => user.id === id);

    if (index < 0) {
      throw new NotFoundException(ErrorMessage.USER_NOT_EXIST);
    }

    dataBase.users.splice(index, 1);
  }
}
