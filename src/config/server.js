var server = require('express')();
var bodyParser = require('body-parser');
var cors = require('cors');
var corsOptions = require('./cors');
var validateToken = require('./middleware');
var { routeDefault, sendEmail } = require('./routes');
var {
  CreateUser,
  Login,
  ResetPassword,
  SendEmailToResetPassword,
  ValidatedToken,
  addNovaCarta,
  getCartas,
  deleteCarta,
  updateCarta,
  getSingleCarta,
  getSingleCartaWithDetails,
  getInterested,
  createParceiro,
  deleteParceiro,
  queryParceiro,
  createVenda,
  queryVenda,
  deleteVenda,
  getSingleVenda
} = require('./../schemas');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors(corsOptions));

server.get('/starter', validateToken, routeDefault);
server.post('/send', sendEmail);

server.post('/create-user', CreateUser);
server.post('/login', Login);
server.post('/reset-password', ResetPassword);
server.post('/send-email-to-reset-password', SendEmailToResetPassword);
server.post('/token', ValidatedToken);

server.post('/add-nova-carta', addNovaCarta);
server.get('/get-all-cartas', getCartas);
server.delete('/delete-carta', deleteCarta);
server.put('/atualizar-carta', updateCarta);
server.get('/get-single-carta', getSingleCarta);
server.get('/get-single-with-details', getSingleCartaWithDetails);
server.get('/get-interested', getInterested);

// Parceiro
server.post('/criar-parceiro', createParceiro);
server.get('/parceiros', queryParceiro);
server.delete('/delete-parceiro', deleteParceiro);

// Venda
server.post('/criar-venda', createVenda);
server.get('/vendas', queryVenda);
server.delete('/delete-venda', deleteVenda);
server.get('/get-singe-venda', getSingleVenda);

module.exports = server;
