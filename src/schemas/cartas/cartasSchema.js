var mongoose = require("mongoose");

const interessadoObjeto = {
  nome: { type: String },
  email: { type: String },
  telefone: { type: String },
  celular: { type: String }
};

const cartaObjeto = {
  type: {
    type: String,
    required: true,
    enum: ["IMOVEL", "CARRO"],
    uppercase: true
  },
  nova: { type: Boolean, default: false },
  administradora: { type: String, required: true },
  credito: { type: Number, required: true },
  entrada: { type: Number, required: true },
  parcelas: { type: Number, required: true },
  valorDasParcelas: { type: Number, required: true },
  vencimento: { type: Date, required: true },
  observacoes: { type: String },
  ultimaAlteracao: { type: Date, required: true },
  feitaPor: { type: String, required: true },
  interessado: interessadoObjeto
};

const cartaSchema = mongoose.Schema(cartaObjeto);

module.exports = mongoose.model("Carta", cartaSchema);
