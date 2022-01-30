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
    let phone = '';

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
    if (
      query.phone != null &&
      query.phone != '' &&
      query.phone != undefined &&
      query.phone != 'undefined'
    ) {
      phone = query.phone;
    }
    return this.clientService.searchClient(
      dni,
      firstname,
      lastname,
      email,
      phone,
    );
  }

  @Post()
  createOrUpdateClient(@Body() client: Client) {
    if (client.dni && client.dni != '') {
      client.dni = client.dni.toLowerCase();
    }

    if (client.firstname && client.firstname != '') {
      client.firstname = client.firstname.toLowerCase();
    }

    if (client.lastname && client.lastname != '') {
      client.lastname = client.lastname.toLowerCase();
    }

    if (client.email && client.email != '') {
      client.email = client.email.toLowerCase();
    }


    return this.clientService.createOrUpdateClient(client);
  }

  @Delete('/:id')
  deleteClient(@Param('id') id: number) {
    return this.clientService.deleteClient(id);
  }
}
