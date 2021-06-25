import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria } from './interfaces/categorias/categoria.interface';
import { Jogador } from './interfaces/jogadores/jogador.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  private readonly logger = new Logger(AppService.name);

  async criarCategoria(criarCategoriaDto: Categoria): Promise<Categoria> {
    const { categoria } = criarCategoriaDto;

    // const categoriaEncontrada = await this.categoriaModel
    //   .findOne({ categoria })
    //   .exec();
    // if (categoriaEncontrada) {
    //   throw new BadRequestException(`Categoria ${categoria} já cadastrada`);
    // }
    try {
      const categoriaCriada = new this.categoriaModel(criarCategoriaDto);

      return await categoriaCriada.save();
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

  // async consultarTodasCategorias(): Promise<Array<Categoria>> {
  //   return await this.categoriaModel.find().populate('jogadores').exec();
  // }

  // async consultarCategoriaDoJogador(idJogador: any): Promise<Categoria> {
  //   /*
  //   Desafio
  //   Escopo da exceção realocado para o próprio Categorias Service
  //   Verificar se o jogador informado já se encontra cadastrado
  //   */

  //   //await this.jogadoresService.consultarJogadorPeloId(idJogador)

  //   const jogadores = await this.jogadoresService.consultarTodosJogadores();

  //   const jogadorFilter = jogadores.filter(
  //     (jogador) => jogador._id == idJogador,
  //   );

  //   if (jogadorFilter.length == 0) {
  //     throw new BadRequestException(`O id ${idJogador} não é um jogador!`);
  //   }

  //   return await this.categoriaModel
  //     .findOne()
  //     .where('jogadores')
  //     .in(idJogador)
  //     .exec();
  // }

  // async consultarCategoriaPeloId(categoria: string): Promise<Categoria> {
  //   const categoriaEncontrada = await this.categoriaModel
  //     .findOne({
  //       categoria,
  //     })
  //     .exec();

  //   if (!categoriaEncontrada) {
  //     throw new NotFoundException(`Categoria ${categoria} não encontrada!`);
  //   }

  //   return categoriaEncontrada;
  // }

  // async atualizarCategoria(
  //   categoria: string,
  //   atualizarCategoriaDto: AtualizarCategoriaDto,
  // ): Promise<void> {
  //   const { descricao, eventos } = atualizarCategoriaDto;

  //   const categoriaEncontrada = await this.categoriaModel
  //     .findOne({
  //       categoria,
  //     })
  //     .exec();

  //   if (!categoriaEncontrada) {
  //     throw new NotFoundException(`Categoria ${categoria} não encontrada!`);
  //   }

  //   categoriaEncontrada.descricao = descricao;
  //   categoriaEncontrada.eventos = eventos;

  //   await categoriaEncontrada.save();
  // }

  // async atribuirCategoriaJogador(params: string[]): Promise<void> {
  //   const categoria = params['categoria'];
  //   const idJogador = params['idJogador'];

  //   const categoriaEncontrada = await await this.categoriaModel
  //     .findOne({ categoria })
  //     .exec();

  //   const jogadorjaCadastradoCategoria = await this.categoriaModel
  //     .find({ categoria })
  //     .where('jogadores')
  //     .in(idJogador)
  //     .exec();

  //   await this.jogadoresService.consultarJogadorPeloId(idJogador);

  //   if (!categoriaEncontrada) {
  //     throw new BadRequestException(`Categoria ${categoria} não encontrada!`);
  //   }

  //   if (jogadorjaCadastradoCategoria.length > 0) {
  //     throw new BadRequestException(
  //       `Jogador ${idJogador} já cadastrado na categoria ${categoria}!`,
  //     );
  //   }

  //   categoriaEncontrada.jogadores.push(idJogador);
  //   await categoriaEncontrada.save();
  // }
}
