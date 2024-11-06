import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { v4 } from 'uuid';
import { Property } from '../enums/property';
import { StatusCodes } from 'http-status-codes';

export abstract class RequestService<T extends { id: string }, K = Partial<T>> {
  protected abstract notFoundErrorMessage: string;

  protected abstract get items(): T[];

  async findAll(): Promise<T[]> {
    return this.items;
  }

  async findOne(id: string, status = StatusCodes.NOT_FOUND): Promise<T> {
    const item = this.items.find((item) => item.id === id);

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
    return this.items.filter((item) => ids.includes(item.id));
  }

  async findManyByProperty(id: string, property: Property): Promise<T[]> {
    return this.items.filter((item) => item[property] === id);
  }

  async create(data: Partial<T>): Promise<T | Omit<T, Property>> {
    const newItem = <T>{ ...data, id: v4() };

    this.items.push(newItem);

    return newItem;
  }

  async update(id: string, data: K): Promise<T | Omit<T, Property>> {
    const item = await this.findOne(id);
    const updatedItem = Object.assign(item, data);

    return updatedItem;
  }

  async remove(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id === id);

    if (index < 0) {
      throw new NotFoundException(this.notFoundErrorMessage);
    }

    this.items.splice(index, 1);
  }
}
