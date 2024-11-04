import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 } from 'uuid';
import dataBase from '../data-base/data-base';
import { ErrorMessage } from '../enums/error-message';
import { DataBase } from '../interfaces/data-base';

// @Injectable()
export abstract class RequestService<
  T extends { id: string },
  K = Partial<T>,
  // P = Partial<T>,
> {
  protected abstract notFoundErrorMessage: string;

  protected abstract get items(): T[];

  protected additionalCreateArguments?: Partial<T>;
  // protected checkUpdatedData?(data: P, item: T): void;
  // protected updateAdditionalData?(data: P, item: T): T;

  findAll(): T[] {
    return this.items;
  }

  findOne(id: string): T {
    const item = this.items.find((item) => item.id === id);

    if (!item) {
      throw new NotFoundException(this.notFoundErrorMessage);
    }

    return item;
  }

  // create(data: Omit<T, 'id'>): T {
  // create(data: K): T {
  create(data: T): T {
    // const newItem = <T>(
    //   (<unknown>{ ...data, ...this.additionalCreateArguments, id: v4() })
    // );
    const newItem = { ...data, id: v4() };

    this.items.push(newItem);

    return newItem;
  }

  // update(id: string, data: P): T {
  update(id: string, data: K): T {
    const item = this.findOne(id);
    // let updatedItem: T;
    //
    // if (this.checkUpdatedData) {
    //   this.checkUpdatedData(data, item);
    // }
    //
    // if (this.updateAdditionalData) {
    //   updatedItem = this.updateAdditionalData(data, item);
    // } else {
    //   updatedItem = Object.assign(item, data);
    // }

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
