const Vendas = require('./vendasSchema.js');
const _get = require('lodash/get');
const Controller = require('./../Controller.js/Controller.js');

const createVenda = (req, res) => {
  const venda = _get(req, 'body.venda');
  const novaVenda = new Vendas({ ...venda });
  novaVenda.save((error, venda) => {
    if (error) {
      res.json({ errorMessage: 'Erro ao criar venda', error });
    } else {
      res.json({ response: 'Venda criada com sucesso', venda });
    }
  });
};

const deleteVenda = (req, res) => {
  const _id = _get(req, 'query._id');
  Controller.removeItem(res, Vendas, _id, 'VENDA');
};

const queryVenda = (req, res) => {
  Controller.findItem(res, Vendas, {}, 'VENDA');
};

const getSingleVenda = (req, res) => {
  const _id = _get(req, 'query._id');
  Controller.findItem(res, Vendas, { _id }, 'VENDA');
};

module.exports = {
  createVenda,
  queryVenda,
  deleteVenda,
  getSingleVenda
};
