import * as mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema(
  {
    telefoneCelular: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' },
    nome: String,
    ranking: String,
    posicaoRanking: Number,
    urlFotoJogador: String,
  },
  { timestamps: true, collection: 'jogadores' },
);
