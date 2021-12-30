import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Client } from 'db/entities/client.entity';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private clientService: ClientsService) {}
  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get('/search/:id')
  getClientById(@Param('id') id: number) {
    return this.clientService.getClientById(id);
  }

  @Get('/search')
  searchClient(@Query() query) {
    let dni = '';
    let firstname = '';
    let lastname = '';
    let email = '';

    if (
      query.dni != null &&
      query.dni != '' &&
      query.dni != undefined &&
      query.dni != 'undefined'
    ) {
      dni = query.dni;
    }
    if (
      query.firstname != null &&
      query.firstname != '' &&
      query.firstname != undefined &&
      query.firstname != 'undefined'
    ) {
      firstname = query.firstname;
    }
    if (
      query.lastname != null &&
      query.lastname != '' &&
      query.lastname != undefined &&
      query.lastname != 'undefined'
    ) {
      lastname = query.lastname;
    }
    if (
      query.email != null &&
      query.email != '' &&
      query.email != undefined &&
      query.email != 'undefined'
    ) {
      email = query.email;
    }
    return this.clientService.searchClient(dni, firstname, lastname, email);
  }

  @Post()
  createOrUpdateClient(@Body() client: Client) {
    return this.clientService.createOrUpdateClient(client);
  }

  @Delete('/:id')
  deleteClient(@Param('id') id: number) {
    return this.clientService.deleteClient(id);
  }
}
