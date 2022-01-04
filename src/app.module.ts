import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from './images/images.module';
import { ClientsModule } from './clients/clients.module';
import { CategoriesModule } from './categories/categories.module';
import { FilesModule } from './files/files.module';
import { UploadsController } from './uploads/uploads.controller';

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
    FilesModule,
  ],
  controllers: [UploadsController],
})
export class AppModule {}
