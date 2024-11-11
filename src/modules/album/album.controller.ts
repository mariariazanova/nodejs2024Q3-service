import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CommonController } from '../../shared/request.controller';
import { AlbumService } from './album.service';
import { Album } from '../../interfaces/album';
import { IdValidatePipe } from '../../utils/id-validate.pipe';
import { CreateAlbumDto } from './dtos/create-album';

@Controller('album')
export class AlbumController extends CommonController<Album> {
  constructor(private readonly albumService: AlbumService) {
    super(albumService);
  }

  @Post()
  async create(@Body() data: CreateAlbumDto): Promise<Album> {
    return await this.albumService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', IdValidatePipe)
    id: string,
    @Body() data: CreateAlbumDto,
  ): Promise<Album> {
    return await this.albumService.update(id, data);
  }
}
