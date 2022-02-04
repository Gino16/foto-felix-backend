import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientRepository } from 'db/repositories/client.repository';
import { AuthModule } from 'src/auth/auth.module';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientRepository]), AuthModule],
  controllers: [ClientsController],
  providers: [ClientsService]
})
export class ClientsModule { }
