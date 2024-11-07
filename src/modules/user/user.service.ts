import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user';
import { UpdatePasswordDto } from './dtos/update-password';
import dataBase from '../../data-base/data-base';
import { User } from '../../interfaces/user';
import { ErrorMessage } from '../../enums/error-message';
import { RequestService } from '../../shared/request.service';
import { Property } from '../../enums/property';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService extends RequestService<UserEntity, UpdatePasswordDto> {
  protected notFoundErrorMessage = ErrorMessage.USER_NOT_EXIST;

  // protected get items(): UserEntity[] {
  //   return dataBase.users;
  // }

  constructor(
    @InjectRepository(UserEntity)
    protected readonly repository: Repository<UserEntity>,
  ) {
    super(repository);
  }

  async create(
    createUserData: CreateUserDto,
  ): Promise<Omit<UserEntity, Property.PASSWORD>> {
    console.log(Date.now(), Date.now() / 1000);
    const newUser: Partial<UserEntity> = {
      ...createUserData,
      version: 1,
      // createdAt: Math.floor(Date.now() / 1000), //Date.now(),
      // updatedAt: Math.floor(Date.now() / 1000), //Date.now(),
    };
    console.log(newUser);
    const createdUser = await super.create(newUser);

    return this.hidePassword(createdUser);
  }

  async update(
    id: string,
    updatePasswordData: UpdatePasswordDto,
  ): Promise<Omit<UserEntity, Property.PASSWORD>> {
    const user: UserEntity = await this.findOne(id);

    if (user.password !== updatePasswordData.oldPassword) {
      throw new ForbiddenException(ErrorMessage.WRONG_OLD_PASSWORD);
    }

    user.password = updatePasswordData.newPassword;
    user.version += 1;
    // user.updatedAt = Math.floor(Date.now() / 1000); //Date.now();

    return await this.hidePassword(user);
  }

  private async hidePassword(
    user: UserEntity,
  ): Promise<Omit<UserEntity, Property.PASSWORD>> {
    const userCopy = { ...user };

    delete userCopy[Property.PASSWORD];

    return userCopy;
  }
}
