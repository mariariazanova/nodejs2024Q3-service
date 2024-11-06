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

  findAll(): T[] {
    return this.items;
  }

  findOne(id: string, status = StatusCodes.NOT_FOUND): T {
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

  findMany(ids: string[]): T[] {
    return this.items.filter((item) => ids.includes(item.id));
  }

  findManyByProperty(id: string, property: Property): T[] {
    return this.items.filter((item) => item[property] === id);
  }

  create(data: Partial<T>): T | Omit<T, Property> {
    const newItem = <T>{ ...data, id: v4() };

    this.items.push(newItem);

    return newItem;
  }

  update(id: string, data: K): T | Omit<T, Property> {
    const item = this.findOne(id);
    const updatedItem = Object.assign(item, data);

    return updatedItem;
  }

  remove(id: string): void {
    const index = this.items.findIndex((item) => item.id === id);

    if (index < 0) {
      throw new NotFoundException(this.notFoundErrorMessage);
    }

    this.items.splice(index, 1);
  }
}
