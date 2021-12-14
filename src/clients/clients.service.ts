import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'db/entities/client.entity';
import { ClientRepository } from 'db/repositories/client.repository';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientRepository)
    private clientRepository: ClientRepository,
  ) { }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find({ order: { id: 'ASC' } });
  }

  async createOrUpdateClient(client: Client): Promise<Client> {
    return await this.clientRepository.save(client);
  }
}
