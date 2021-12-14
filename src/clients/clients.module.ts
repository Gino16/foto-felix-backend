import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientRepository } from 'db/repositories/client.repository';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientRepository])],
  controllers: [ClientsController],
  providers: [ClientsService]
})
export class ClientsModule { }
