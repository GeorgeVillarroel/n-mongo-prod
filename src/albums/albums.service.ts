import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Album } from './schemas/album.schema';
import { Model, UpdateResult } from 'mongoose';
import { Song } from 'src/songs/schemas/song.schema';
import { FindAlbumDTO } from './dto/find-album.dto';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<Album>,
    @InjectModel(Song.name) private songsModel: Model<Song>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = await this.albumModel.create(createAlbumDto);
    return album;
  }

  async findAll(): Promise<Album[]> {
    const albums = await this.albumModel.find();
    return albums;
  }

  async findOne(id: string): Promise<FindAlbumDTO> {
    const album = await this.albumModel.findById({ _id: id }).lean().exec();
    if (!album) throw new NotFoundException('Album not found');
    const songs = await this.songsModel.find({ album: id });
    let totalDuration = 0;
    for (let i = 0; i < songs.length; i++) {
      totalDuration = totalDuration + songs[i].duration;
    }
    return {
      ...album,
      id: album._id.toString(),
      songs,
      duration: totalDuration,
    };
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<UpdateResult> {
    const updatedAlbum = await this.albumModel.updateOne(
      { _id: id },
      updateAlbumDto,
    );
    return updatedAlbum;
  }

  async remove(id: number): Promise<void> {
    await this.albumModel.deleteOne({ _id: id });
    return;
  }
}
