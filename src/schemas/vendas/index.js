const Vendas = require("./vendasSchema.js");
const _get = require("lodash/get");

const createVenda = (req, res) => {
  const venda = _get(req, "body.venda");
  const novaVenda = new Vendas({ ...venda });
  novaVenda.save((error, venda) => {
    if (error) {
      res.json({ errorMessage: "Erro ao criar venda", error });
    } else {
      res.json({ response: "Venda criada com sucesso", venda });
    }
  });
};

const deleteVenda = (req, res) => {
  const _id = _get(req, "body._id");
  Vendas.findByIdAndRemove(_id, (error, doc) => {
    if (error || !doc) {
      res.status(400).json({ response: "Erro ao deletar venda." });
    } else {
      res.json({ response: "Venda removida com sucesso." });
    }
  });
};

const queryVenda = (req, res) => {
  Vendas.find({}, (error, vendas) => {
    res.json({ ...vendas });
  });
};

module.exports = {
  createVenda,
  queryVenda,
  deleteVenda
};
