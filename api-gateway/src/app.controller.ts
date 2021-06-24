import { Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { Controller, Get, Logger, Post } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';

@Controller()
export class AppController {
  private logger = new Logger(AppController.name);
  private clientAdminBackend: ClientProxy;
  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['ampq://user:bitnami@localhost:5672/smartranking'],
        queue: 'admin-backend',
      },
    });
  }

  @Post('categorias')
  @UsePipes(ValidationPipe)
  async criarCategorias(@Body() criarCategoriaDto: CriarCategoriaDto) {
    return await this.clientAdminBackend.emit(
      'criar-categoria',
      criarCategoriaDto,
    );
  }
}
