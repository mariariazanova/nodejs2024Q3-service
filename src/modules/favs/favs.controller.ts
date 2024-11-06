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
  findAll(): FavoritesResponse {
    console.log('findAll');
    return this.favsService.findAll();
  }

  @Post('/:source/:id')
  create(
    @Param('source') source: string,
    @Param('id', IdValidatePipe) id: string,
  ): ItemType {
    if (itemNameList.includes(<Item>source)) {
      return this.favsService.create(<ItemName>source, id);
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:source/:id')
  remove(
    @Param('source') source: string,
    @Param('id', IdValidatePipe) id: string,
  ): void {
    if (itemNameList.includes(<Item>source)) {
      return this.favsService.remove(<ItemName>source, id);
    }
  }
}
