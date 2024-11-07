import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user';
import { UpdatePasswordDto } from './dtos/update-password';
import { ErrorMessage } from '../../enums/error-message';
import { RequestService } from '../../shared/request.service';
import { Property } from '../../enums/property';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService extends RequestService<UserEntity, UpdatePasswordDto> {
  protected notFoundErrorMessage = ErrorMessage.USER_NOT_EXIST;

  constructor(
    @InjectRepository(UserEntity)
    protected readonly repository: Repository<UserEntity>,
  ) {
    super(repository);
  }

  async create(
    createUserData: CreateUserDto,
  ): Promise<Omit<UserEntity, Property.PASSWORD>> {
    const newUser: Partial<UserEntity> = {
      ...createUserData,
      version: 1,
    };
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
    user.updatedAt = Date.now();

    const updatedUser = await this.repository.save(user);

    return this.hidePassword(updatedUser);
  }

  private async hidePassword(
    user: UserEntity,
  ): Promise<Omit<UserEntity, Property.PASSWORD>> {
    const userCopy = { ...user };

    delete userCopy[Property.PASSWORD];

    return userCopy;
  }
}
