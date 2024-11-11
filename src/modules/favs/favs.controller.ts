import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { IdValidatePipe } from '../../utils/id-validate.pipe';
import { FavoritesResponse } from '../../interfaces/favorites';
import { ItemName, ItemType } from '../../interfaces/item';
import { Item } from '../../enums/item';

const itemNameList = [Item.ARTIST, Item.ALBUM, Item.TRACK];

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  async findAll(): Promise<FavoritesResponse> {
    return await this.favsService.findAll();
  }

  @Post('/:source/:id')
  async create(
    @Param('source') source: string,
    @Param('id', IdValidatePipe) id: string,
  ): Promise<ItemType> {
    if (itemNameList.includes(<Item>source)) {
      return await this.favsService.create(<ItemName>source, id);
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:source/:id')
  async remove(
    @Param('source') source: string,
    @Param('id', IdValidatePipe) id: string,
  ): Promise<void> {
    if (itemNameList.includes(<Item>source)) {
      return await this.favsService.remove(<ItemName>source, id);
    }
  }
}
