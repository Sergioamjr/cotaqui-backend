var Carta = require('./cartasSchema');
var _get = require('lodash').get

const addNovaCarta = (req, res) => {
  const { body: { administradora, credito, entrada, parcelas, estaDisponivel = true,
    valorDasParcelas, vencimento, feitaPor, interessado = {}, type, observacoes = '' }} = req;
  if(!administradora || !credito || !entrada || !parcelas || !valorDasParcelas || !vencimento) {
    res.json({errorMessage: 'Por favor, preencha todos os campos.'}).status(400)
  }

  const novaCarta = new Carta({
    administradora,
    credito, entrada,
    parcelas,
    valorDasParcelas,
    vencimento,
    observacoes,
    estaDisponivel,
    interessado,
    type: type.toUpperCase(),
    ultimaAlteracao: new Date(),
    feitaPor,
  })

  novaCarta.save(error => {
    if(error) {
      res.json({errorMessage: `Não possível salvar carta: ${error}`})
    } else {
      res.json({message: 'Carta salva com sucesso.'})
    }
  })
}

const updateCarta = (req, res) => {
  const { body: { administradora, credito, entrada, parcelas, _id, estaDisponivel = true,
    valorDasParcelas, vencimento, feitaPor, interessado = {}, observacoes = '' }} = req;
  
  if(!_id) {
    res.json({errorMessage: 'Por favor, forneça a identificação de uma carta.'}).status(400)
  } else {
    Carta.update({_id}, {
      administradora,
      credito,
      entrada,
      parcelas,
      valorDasParcelas,
      vencimento,
      estaDisponivel,
      feitaPor,
      observacoes,
      interessado,
      ultimaAlteracao: new Date(),
    }, (error) => {
      if(error) {
       res.json({errorMessage: `Não foi possível atualizar carta: ${error}`}).status(400)
      } else {
        res.json({message: 'Carta atualizada com sucesso.'})
      }
    })
  }
}

const getCartas = (req, res) => {
  let query = {}
  const { query: { _id }} = req
  if(_id) {
    query = { ...query, _id}
  }

  Carta.find(query, (error, cartas) => {
    if(error) {
      res.json({errorMessage: 'Não foi possível verificar as cartas'});
    } else {
      res.json({cartas});
    }
  })
}

const deleteCarta = (req, res) => {
  const { body: { _id }} = req;
  if(!_id) {
    res.json({errorMessage: 'Informe uma carta para ser excluida'}).status(400);
  } else {
    Carta.findByIdAndRemove({_id}, (error) => {
      if(error) {
        res.json({errorMessage: 'Não foi possível excluir a carta'}).status(400);
      } else {
        res.json({message: 'Carta excluida com sucesso.'});
      }
    })
  }
}

module.exports = {
  getCartas,
  deleteCarta,
  updateCarta,
  addNovaCarta,
}