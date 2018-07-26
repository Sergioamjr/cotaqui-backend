const jwt = require('jsonwebtoken');
var SECRET = process.env.SECRET_JWT;

const validateToken = (req, res, next) => {
  if(req.method === 'OPTIONS') {
    next();
  } else {
    const token = req.body.token || req.query.token || req.headers['x-auth'];
    if(!token) {
      return res.status(403).json({message: 'No token provided'});
    } else {
      jwt.verify(token, SECRET, (error, decoded) => {
        if(error) {
          return res.json({message: 'Token inváido.'}).status(403);
        } else {
          next();
        }
      });
    }
  }
};

module.exports = validateToken;
