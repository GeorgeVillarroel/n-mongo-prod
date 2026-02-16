import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SongsModule } from './songs/songs.module';
import { UserModule } from './user/user.module';
import { AlbumsModule } from './albums/albums.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/n-mongo-prod',
      // {autoIndex: true, great for dev false in prod for performance
      // maxPoolSize: 10 limits how many simultaneous connections to allow
      // serverSelectionTimeoutMS: 5000} how long to wait before giving up if DB is down
      // If you ever want to use a Mongoose plugin (like mongoose-slug-updater or mongoose-autopopulate) globally, you do it inside that forRoot config using the connectionFactory.

      /* MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
            uri: config.get<string>('MONGODB_URI'),
            }),
        }) */
    ),
    SongsModule,
    UserModule,
    AlbumsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
