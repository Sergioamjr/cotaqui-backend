var express = require('express');
var jwt = require('jsonwebtoken');
const PORT = 3000;
const SECRET = 'GameOfThrones';

const server = express();

server.get('/', (req, res) => {
    const user = {
        name: 'Sérgio Jr',
        email: 'sergioamjr91@gmail.com',
        id: '3460d1d07d2a967b3234df0072dcf462',
    };

    const token = jwt.sign(user, SECRET, { expiresIn: '3000' });

    res.json(Object.assign({}, user, { token }));
});

server.listen(PORT, (err) => {
    /*eslint-disable*/
    console.log(err ? `Error on build server ${err}` : `Server is running on port ${PORT}`);
    /*eslint-enable*/
});