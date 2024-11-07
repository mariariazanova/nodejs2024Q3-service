import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { StatusCodes } from 'http-status-codes';
import { Property } from '../enums/property';

export abstract class RequestService<T extends { id: string }, K = Partial<T>> {
  protected abstract notFoundErrorMessage: string;

  protected constructor(protected readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: string, status = StatusCodes.NOT_FOUND): Promise<T> {
    const item = await this.repository.findOne(<any>{ where: { id } });

    if (!item) {
      if (status === StatusCodes.NOT_FOUND) {
        throw new NotFoundException(this.notFoundErrorMessage);
      } else {
        throw new UnprocessableEntityException(this.notFoundErrorMessage);
      }
    }

    return item;
  }

  async findMany(ids: string[]): Promise<T[]> {
    return await this.repository.findByIds(ids);
  }

  async create(data: Partial<T>): Promise<T | Omit<T, Property>> {
    const newItemData = <T>{ ...data, id: v4() };
    const newItem = this.repository.create(newItemData);

    return this.repository.save(newItem);
  }

  async update(id: string, data: K): Promise<T | Omit<T, Property>> {
    const item = await this.findOne(id);
    const updatedItem = this.repository.merge(item, <any>data);

    return this.repository.save(updatedItem);
  }

  async remove(id: string): Promise<void> {
    const item = await this.findOne(id);

    if (!item) {
      throw new NotFoundException(this.notFoundErrorMessage);
    }

    await this.repository.delete(id);
  }
}
