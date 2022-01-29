import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'db/entities/client.entity';
import { ClientRepository } from 'db/repositories/client.repository';
import { Like } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientRepository)
    private clientRepository: ClientRepository,
  ) {}

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find({ order: { id: 'ASC' } });
  }

  async getClientById(id: number): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { id },
    });
    if (!client) {
      throw new NotFoundException(`Client with id "${id}" not found`);
    }
    return client;
  }

  async searchClient(
    dni,
    firstname,
    lastname,
    email,
    phone,
  ): Promise<Client[]> {
    return await this.clientRepository.find({
      where: {
        dni: Like(`%${dni}%`),
        firstname: Like(`%${firstname}%`),
        lastname: Like(`%${lastname}%`),
        email: Like(`%${email}%`),
        phone: Like(`%${phone}%`),
      },
      order: { id: 'ASC' },
    });
  }

  async createOrUpdateClient(client: Client): Promise<Client> {
    return await this.clientRepository.save(client);
  }

  async deleteClient(id: number): Promise<Client> {
    const client = await this.getClientById(id);
    await this.clientRepository.delete(id);
    return client;
  }
}
