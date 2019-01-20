const Parceiros = require("./parceiroSchema");
const _get = require("lodash/get");

const createParceiro = (req, res) => {
  const { nome_completo, email, telefone, celular } = _get(req, "body");
  const novoParceiro = new Parceiros({
    nome_completo,
    email,
    telefone,
    celular,
    data: new Date()
  });
  novoParceiro.save((error, parceiro) => {
    if (error) {
      res.json({ errorMessage: "Erro ao criar parceiro", error });
    } else {
      res.json({ response: "Parceiro criado com sucesso", parceiro });
    }
  });
};

const deleteParceiro = (req, res) => {
  const _id = _get(req, "body._id");
  Parceiros.findByIdAndRemove(_id, () => {
    res.json({ response: "Parceiro removido com sucesso." });
  });
};

const queryParceiro = (req, res) => {
  Parceiros.find({}, (error, parceiros) => {
    res.json({ ...parceiros });
  });
};

module.exports = {
  createParceiro,
  queryParceiro,
  deleteParceiro
};
