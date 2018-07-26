var User = require('./usersSchema');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SECRET = process.env.SECRET_JWT;
var { sendEmail } = require('./../../config/routes');

const Login = (req, res) => {
  const { body: { email, password }} = req;
  if(!email || !password) {
    res.json({message: 'Digite email e senha.'}, 403);
  } else {
    User.findOne({email}, (error, user) => {
      if(user) {
        bcrypt.compare(password, user.password, (error, bool) => {
          if(bool) {
            const { _id, name } = user;
            const token = jwt.sign({_id, email}, SECRET);
            res.json({name, token});
          } else {
            res.json({errorMessage: 'E-mail ou senha inválidos.'}, 403);
          }
        });
      } else {
        res.json({errorMessage: 'E-mail ou senha inválidos.'}, 403);
      }
    });
  }
};

const CreateUser = (req, res) => {
  const { body: { password, name, email } } = req;
  if(!password || !name || !email) {
    res.json({errorMessage: 'Preencha todos os campos.'});
  } else {
    User.findOne({email}, (error, user) => {
      if(user) {
        res.json({errorMessage: 'Já existe uma conta com esse e-mail. Faça login ou recupere sua senha.'}, 403);
      } else {
        bcrypt.genSalt(10, (saltError, salt) => {
          if(!saltError) {
            bcrypt.hash(password, salt, (hashError, hash) => {
              if(!hashError) {
                const newUser = new User({name, email, password: hash});
                newUser.save((error) => {
                  !error ? Login(req, res) : res.json({errorMessage: 'Erro ao criar usuário', error}, 403);
                });
              }
            });
          }
        });
      }
    });
  }
};

const ResetPassword = (req, res) => {
  const { body: { password, repassword, token }} = req;
  if(!token) {
    res.json({errorMessage: 'Nenhum token fornecido'}, 401);
  } else if (!password || password !== repassword){
    res.json({errorMessage: 'Digite e confirme sua senha nova.'}, 404);
  } else {
    jwt.verify(token, SECRET, (error, decoded) => {
      if(error) {
        res.json({errorMessage: 'Token inváido.'}, 403);
      } else {
        const { _id } = decoded;
        bcrypt.genSalt(10, (saltError, salt) => {
          if(!saltError) {
            bcrypt.hash(password, salt, (hashError, hash) => {
              if(!hashError) {
                User.update({_id}, {
                  password: hash,
                }, (error) => {
                  if(error) {
                    res.json({errorMessage: 'Não foi possível resetar sua senha. Tente novamente.'}, 400);
                  } else {
                    res.json({success: 'Senha resetada com sucesso. Faça login.'});
                  }
                });
              }
            });
          }
        });
      }
    });
  }
};

const SendEmailToResetPassword = (req, res) => {
  const { body: { email }} = req;
  if(!email) {
    res.json({errorMessage: 'Digite um e-mail'}, 400);
  } else {
    User.findOne({email}, (error, user) => {
      if(user) {
        const { _id } = user;
        jwt.sign({_id}, SECRET, (error, token) => {
          req.body.to = email;
          req.body.message = `Token para resetar sua senha: ${token}`;
          req.body.subject = 'Reset de senha - GAS';
          req.body.successMessage = 'Link enviado para seu email';
          sendEmail(req, res);
        });
      } else {
        res.json({message: 'Nenhuma conta encontrada com esse e-mail'});
      }
    });
  }
};

const ValidatedToken = (req, res) => {
  const { body: { token }} = req;
  if(!token) {
    res.json({errorMessage: 'Token não fornecido.'}).status(403);
  } else {
    jwt.verify(token, SECRET, (error) => {
      if(error) {
        return res.json({message: 'Token inváido.'}).status(403);
      } else {
        return res.json({isValid: true});
      }
    });
  }
}

module.exports = {
  Login,
  CreateUser,
  ResetPassword,
  ValidatedToken,
  SendEmailToResetPassword,
};
