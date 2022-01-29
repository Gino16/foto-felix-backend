import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'db/entities/client.entity';
import { ClientRepository } from 'db/repositories/client.repository';
import { Like, Raw } from 'typeorm';

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
    dniSearch,
    firstnameSearch,
    lastnameSearch,
    emailSearch,
    phoneSearch,
  ): Promise<Client[]> {
    return await this.clientRepository.find({
      where: {
        dni: Raw((dni) => `LOWER(${dni}) Like '%${dniSearch}%'`),
        firstname: Raw(
          (firstname) => `LOWER(${firstname}) Like '%${firstnameSearch}%'`,
        ),
        lastname: Raw(
          (lastname) => `LOWER(${lastname}) Like '%${lastnameSearch}%'`,
        ),
        email: Raw((email) => `LOWER(${email}) Like '%${emailSearch}%'`),
        phone: Raw((phone) => `LOWER(${phone}) Like '%${phoneSearch}%'`),
      },
      order: { id: 'ASC' },
    });
  }

  async createOrUpdateClient(client: Client): Promise<Client> {
    if (client.phone != '') {
      return await this.clientRepository.save(client);
    } else {
      throw await new Error(`Client phone cant be empty`);
    }
  }

  async deleteClient(id: number): Promise<Client> {
    const client = await this.getClientById(id);
    await this.clientRepository.delete(id);
    return client;
  }
}
