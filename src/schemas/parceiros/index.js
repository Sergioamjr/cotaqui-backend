const Parceiros = require('./parceiroSchema');
const _get = require('lodash/get');
const Controller = require('./../Controller.js/Controller.js');

const createParceiro = (req, res) => {
  const { nome_completo, email, telefone, celular } = _get(req, 'body');
  const novoParceiro = new Parceiros({
    nome_completo,
    email,
    telefone,
    celular,
    data: new Date()
  });
  novoParceiro.save((error, parceiro) => {
    if (error) {
      res.json({ errorMessage: 'Erro ao criar parceiro', error });
    } else {
      res.json({ response: 'Parceiro criado com sucesso', parceiro });
    }
  });
};

const deleteParceiro = (req, res) => {
  const _id = _get(req, 'query._id');
  Controller.removeItem(res, Parceiros, _id, 'PARCEIRO');
};

const queryParceiro = (req, res) => {
  Controller.findItem(res, Parceiros, {});
};

module.exports = {
  createParceiro,
  queryParceiro,
  deleteParceiro
};
