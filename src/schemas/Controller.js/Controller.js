class ControllerDB {
  static removeItem(response, Model, id, prefix) {
    Model.findByIdAndRemove(id, (error, doc) => {
      if (error || !doc) {
        response.status(400).json({ response: `Erro ao deletar ${prefix}.` });
      } else {
        response.json({ response: `${prefix} removida com sucesso.` });
      }
    });
  }

  static findItem(response, Model, query) {
    console.log('id', query);
    Model.find(query, (error, docs) => {
      response.json({ ...docs });
    });
  }
}

module.exports = ControllerDB;
