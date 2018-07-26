var mongoose = require('mongoose');
const url = 'mongodb://localhost/cotaqui';

module.exports = mongoose.connect(url);