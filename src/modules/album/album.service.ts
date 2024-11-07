import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestService } from '../../shared/request.service';
import { ErrorMessage } from '../../enums/error-message';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumService extends RequestService<AlbumEntity> {
  protected notFoundErrorMessage = ErrorMessage.ALBUM_NOT_EXIST;

  constructor(
    @InjectRepository(AlbumEntity)
    protected readonly repository: Repository<AlbumEntity>,
  ) {
    super(repository);
  }
}
