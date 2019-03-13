var mongoose = require('mongoose');
const localDB = 'mongodb://localhost/cotaqui';

const url = process.env.MONGODB_URI || localDB;

module.exports = mongoose.connect(url, { useNewUrlParser: true });

// mongodb://usuario:senha@tatooine.mongodb.umbler.com:41091/nomedobanco
// mongodb://cotaquionline-us:1q2w3e4e@kamino.mongodb.umbler.com:45144/cotaquionline-bd

// mongo_cotaquionline-bd:27017

// kamino.mongodb.umbler.com:45144

// cotaquionline-us

// 1q2w3e4e
