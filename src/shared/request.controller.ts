import {
  Body,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { IdValidatePipe } from '../utils/id-validate.pipe';
import { Property } from '../enums/property';

export abstract class CommonController<
  T extends { id: string },
  K = Partial<T>,
> {
  protected constructor(private readonly service: RequestService<T, K>) {}

  @Get()
  findAll(): T[] {
    console.log('get all users');
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', IdValidatePipe) id: string): T {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() data: T): T | Omit<T, Property> {
    return this.service.create(data);
  }

  @Put(':id')
  update(
    @Param('id', IdValidatePipe) id: string,
    @Body() data: K,
  ): T | Omit<T, Property> {
    return this.service.update(id, data);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', IdValidatePipe) id: string): void {
    this.service.remove(id);
  }
}
