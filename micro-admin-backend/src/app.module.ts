import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './categorias/categorias.module';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://boydwo:bzk7RDhuOl78mqLx@cluster0.r9nh4.mongodb.net/sradmbackend?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        userCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    ),
    CategoriasModule,
    JogadoresModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
