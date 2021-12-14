import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    ImagesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'gino',
      password: '1234',
      database: 'fotofelix',
      autoLoadEntities: true,
      synchronize: true,
      // logging: true,
    }),
  ],
})
export class AppModule { }
