import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-aparametros.pipe';
import { Param } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(
    @Body()
    criarJogadorDto: CriarJogadorDto,
  ) {
    await this.jogadoresService.criarJogador(criarJogadorDto);

    return JSON.stringify({
      status: 'ok',
    });
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body()
    atualizarJogadorDto: AtualizarJogadorDto,
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
  ): Promise<string> {
    await this.jogadoresService.atualizarJogador(_id, atualizarJogadorDto);

    return JSON.stringify({
      status: 'ok',
    });
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[]> {
    return await this.jogadoresService.consultarTodosJogadores();
  }

  @Get('/:_id')
  async consultarJogadorPeloId(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
  ): Promise<Jogador> {
    return await this.jogadoresService.consultarJogadorPeloId(_id);
  }

  @Delete('/:_id')
  async deletarJogador(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
  ): Promise<void> {
    await this.jogadoresService.deletarJogador(_id);
  }
}
