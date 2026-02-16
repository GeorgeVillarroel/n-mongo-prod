import { ApiProperty } from '@nestjs/swagger';
import { Song } from 'src/songs/schemas/song.schema';

export class FindAlbumDTO {
  id: string;
  title: string;
  duration: number;

  @ApiProperty({ type: () => [Song] })
  songs: Song[];
  releasedDate: Date;
}
