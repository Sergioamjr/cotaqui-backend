var Carta = require("./cartasSchema");
var _get = require("lodash").get;

const addNovaCarta = (req, res) => {
  const {
    body: {
      administradora,
      credito,
      entrada,
      parcelas,
      valorDasParcelas,
      vencimento,
      feitaPor,
      interessado = {},
      type,
      observacoes = ""
    }
  } = req;
  if (
    !administradora ||
    !credito ||
    !entrada ||
    !parcelas ||
    !valorDasParcelas ||
    !vencimento
  ) {
    res
      .status(400)
      .json({ errorMessage: "Por favor, preencha todos os campos." });
  }

  const novaCarta = new Carta({
    administradora,
    credito,
    entrada,
    parcelas,
    valorDasParcelas,
    vencimento,
    observacoes,
    interessado,
    type: type.toUpperCase(),
    ultimaAlteracao: new Date(),
    feitaPor
  });

  novaCarta.save((error, doc) => {
    if (error) {
      res
        .status(400)
        .json({ errorMessage: `Não possível salvar carta: ${error}` });
    } else {
      res.json({ response: "Carta salva com sucesso.", document: doc });
    }
  });
};

const updateCarta = (req, res) => {
  const {
    body: {
      administradora,
      credito,
      entrada,
      parcelas,
      _id,
      valorDasParcelas,
      vencimento,
      feitaPor,
      interessado = {},
      observacoes = ""
    }
  } = req;

  if (!_id) {
    res.status(400).json({
      errorMessage: "Por favor, forneça a identificação de uma carta."
    });
  } else {
    Carta.update(
      { _id },
      {
        administradora,
        credito,
        entrada,
        parcelas,
        valorDasParcelas,
        vencimento,
        feitaPor,
        observacoes,
        interessado,
        ultimaAlteracao: new Date()
      },
      error => {
        if (error) {
          res.status(400).json({
            errorMessage: `!Não foi possível atualizar carta: ${error}`
          });
        } else {
          res.json({ response: "Carta atualizada com sucesso." });
        }
      }
    );
  }
};

const getCartas = (req, res) => {
  let query = {};
  const {
    query: { _id }
  } = req;
  if (_id) {
    query = { ...query, _id };
  }

  Carta.find(query, (error, cartas) => {
    if (error) {
      res.json({ errorMessage: "Não foi possível verificar as cartas" });
    } else {
      res.json({ response: { ...cartas } });
    }
  });
};

const deleteCarta = (req, res) => {
  const {
    query: { _id }
  } = req;
  if (!_id) {
    res
      .status(400)
      .json({ errorMessage: "Informe uma carta para ser excluida" });
  } else {
    Carta.findByIdAndRemove({ _id }, error => {
      if (error) {
        res
          .status(400)
          .json({ errorMessage: "Não foi possível excluir a carta" });
      } else {
        res.json({ response: "Carta excluida com sucesso." });
      }
    });
  }
};

const getSingleCarta = (req, res) => {
  const {
    query: { _id }
  } = req;
  if (!_id) {
    res.status(400).json({ errorMessage: "_id não especificado." });
  } else {
    Carta.findOne({ _id }, (error, carta) => {
      if (error || !carta) {
        res.status(400).json({ errorMessage: "Carta não encontrada." });
      } else {
        res.json({ result: carta });
      }
    });
  }
};

module.exports = {
  getCartas,
  deleteCarta,
  updateCarta,
  addNovaCarta,
  getSingleCarta
};
