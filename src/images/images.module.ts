import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'db/entities/category.entity';
import { Client } from 'db/entities/client.entity';
import { ImageRepository } from 'db/repositories/image.repository';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

@Module({
  imports: [TypeOrmModule.forFeature([ImageRepository, Client, Category])],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
