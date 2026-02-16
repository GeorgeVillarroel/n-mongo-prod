import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type AlbumDocument = HydratedDocument<Album>;

@ApiSchema({ name: 'Album' })
@Schema({ timestamps: true })
export class Album {
  @Prop({ required: true })
  @ApiProperty({ type: 'string', required: true })
  title: string;

  @ApiProperty({ type: Date, required: true })
  @Prop({ required: true })
  releasedDate: Date;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
