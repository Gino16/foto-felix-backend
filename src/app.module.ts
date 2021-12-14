import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from './images/images.module';
import { ClientsModule } from './clients/clients.module';
import { CategoriesModule } from './categories/categories.module';

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
    ClientsModule,
    CategoriesModule,
  ],
})
export class AppModule { }
