import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { TrackService } from './track.service';
import { CommonController } from '../../shared/request.controller';
import { Track } from '../../interfaces/track';
import { CreateTrackDto } from './dtos/create-track';
import { IdValidatePipe } from '../../utils/id-validate.pipe';

@Controller('track')
export class TrackController extends CommonController<Track> {
  constructor(private readonly trackService: TrackService) {
    super(trackService);
  }

  @Post()
  async create(@Body() data: CreateTrackDto): Promise<Track> {
    return this.trackService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', IdValidatePipe)
    id: string,
    @Body() data: CreateTrackDto,
  ): Promise<Track> {
    return this.trackService.update(id, data);
  }
}
