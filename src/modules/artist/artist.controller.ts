import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CommonController } from '../../shared/request.controller';
import { ArtistService } from './artist.service';
import { Artist } from '../../interfaces/artist';
import { IdValidatePipe } from '../../utils/id-validate.pipe';
import { CreateArtistDto } from './dtos/create-artist';

@Controller('artist')
export class ArtistController extends CommonController<Artist> {
  constructor(private readonly artistService: ArtistService) {
    super(artistService);
  }

  @Post()
  async create(@Body() data: CreateArtistDto): Promise<Artist> {
    return await this.artistService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', IdValidatePipe)
    id: string,
    @Body() data: CreateArtistDto,
  ): Promise<Artist> {
    return await this.artistService.update(id, data);
  }
}
