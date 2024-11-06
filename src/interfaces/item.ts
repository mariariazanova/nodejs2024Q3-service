import { Track } from './track';
import { Artist } from './artist';
import { Album } from './album';
import { Item } from '../enums/item';

export type ItemType = Track | Artist | Album;
export type ItemName = Item.TRACK | Item.ARTIST | Item.ALBUM;
