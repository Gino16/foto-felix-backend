import { Body, Controller, Get, Post } from '@nestjs/common';
import { Client } from 'db/entities/client.entity';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private clientService: ClientsService) { }
  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Post()
  createOrUpdateClient(@Body() client: Client) {
    return this.clientService.createOrUpdateClient(client);
  }
}
