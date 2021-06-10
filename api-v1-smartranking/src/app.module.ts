import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://boydwo:bzk7RDhuOl78mqLx@cluster0.r9nh4.mongodb.net/smartranking?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        userCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    ),
    JogadoresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
