var mongoose = require("mongoose");

const parceiroObjeto = {
  nome_completo: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  telefone: { type: String, required: true },
  celular: { type: String, required: true },
  data: { type: Date }
};

const parceiroSchema = mongoose.Schema(parceiroObjeto);

module.exports = mongoose.model("Parceiros", parceiroSchema);
