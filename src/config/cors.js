const corsOptions = {
  origin: ['https://gas.netlify.com', 'http://localhost:8080'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'x-auth'],
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;

//Doc
// https://github.com/expressjs/cors
 