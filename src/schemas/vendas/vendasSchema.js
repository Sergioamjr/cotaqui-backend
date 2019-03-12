var mongoose = require('mongoose');

const responsavelObjeto = {
  nome: { type: String, required: true },
  cpf: { type: String, required: true },
  telefone: { type: String, required: true },
  celular: { type: String, required: true },
  email: { type: String, required: true }
};

const vendaObjeto = {
  type: {
    type: String,
    required: true,
    enum: ['IMOVEL', 'CARRO'],
    uppercase: true
  },
  administradora: { type: String, required: true },
  credito: { type: Number, required: true },
  parcelasPendentes: { type: Number, required: true },
  parcelasPagas: { type: Number, required: true },
  valorDasParcelas: { type: Number, required: true },
  valorPretendido: { type: Number, required: true },
  grupo: { type: String, required: true },
  cota: { type: String, required: true },
  contemplado: { type: String, required: true },
  entrada: { type: Number },
  vencimento: { type: Date },
  responsavel: responsavelObjeto
};

const vendaSchema = mongoose.Schema(vendaObjeto);

module.exports = mongoose.model('Vendas', vendaSchema);
