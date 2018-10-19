const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://cotaqui.netlify.com"
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "x-auth"],
  optionsSuccessStatus: 200
};

module.exports = corsOptions;

//Doc
// https://github.com/expressjs/cors