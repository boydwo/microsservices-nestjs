import { Module } from '@nestjs/common';

import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { CategoriaSchema } from './interfaces/categoria.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Categoria', schema: CategoriaSchema }]),
  ],
  providers: [CategoriasService],
  controllers: [CategoriasController],
})
export class CategoriasModule {}
