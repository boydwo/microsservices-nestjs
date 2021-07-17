import { Module } from '@nestjs/common';

import { ProxyRMQModule } from 'src/proxyrmq/proxyrmq.module';

import { CategoriasController } from './categorias.controller';

@Module({
  controllers: [CategoriasController],
  imports: [ProxyRMQModule],
})
export class CategoriasModule {}
