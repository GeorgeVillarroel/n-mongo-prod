import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Album } from 'src/albums/schemas/album.schema';

export type SongDocument = HydratedDocument<Song>;

@ApiSchema({ name: 'Song' })
@Schema({ timestamps: true })
export class Song<T = string> {
  @Prop({ required: true })
  @ApiProperty({ type: 'string', required: true })
  title: string;

  @ApiProperty({ type: 'number', required: true })
  @Prop({ required: true })
  duration: number;

  @ApiProperty({ type: Date, required: true })
  @Prop({ required: true })
  releasedDate: Date;

  @ApiProperty({ type: 'string', required: true })
  @Prop({ required: true })
  lyrics: string;

  @ApiProperty({
    type: Types.ObjectId,
    required: true,
  })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Album.name,
    required: true,
  })
  album: T;
}

export const SongSchema = SchemaFactory.createForClass(Song);
