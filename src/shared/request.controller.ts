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
  async findAll(): Promise<T[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', IdValidatePipe) id: string): Promise<T> {
    return this.service.findOne(id);
  }

  @Post()
  async create(@Body() data: T): Promise<T | Omit<T, Property>> {
    return this.service.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', IdValidatePipe) id: string,
    @Body() data: K,
  ): Promise<T | Omit<T, Property>> {
    return this.service.update(id, data);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', IdValidatePipe) id: string): Promise<void> {
    await this.service.remove(id);
  }
}
