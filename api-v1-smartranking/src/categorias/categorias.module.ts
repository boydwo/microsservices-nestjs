import { Module } from '@nestjs/common';

import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { CategoriaSchema } from './interfaces/categoria.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from 'src/jogadores/jogadores.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Categoria', schema: CategoriaSchema }]),
    JogadoresModule,
  ],
  providers: [CategoriasService],
  controllers: [CategoriasController],
  exports: [CategoriasService],
})
export class CategoriasModule {}
