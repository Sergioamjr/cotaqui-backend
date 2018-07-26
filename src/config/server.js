var server = require('express')();
var bodyParser = require('body-parser');
var cors = require('cors');
var corsOptions = require('./cors');
var validateToken  = require('./middleware');
var { routeDefault, sendEmail } = require('./routes');
var { CreateUser, Login, ResetPassword, SendEmailToResetPassword, ValidatedToken,
  addNovaCarta, getCartas, deleteCarta, updateCarta } = require('./../schemas');

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
server.get('/cartas', getCartas);
server.delete('/delete-carta', deleteCarta);
server.put('/atualizar-carta', updateCarta);


module.exports = server;
