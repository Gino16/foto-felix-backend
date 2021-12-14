import { Client } from 'db/entities/client.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
}
