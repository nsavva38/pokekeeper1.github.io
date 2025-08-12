require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'https://pokekeeper.netlify.app', 
  'http://localhost:5173',
  'https://deploy-preview-42--pokekeeper.netlify.app',
  'https://nsavva38.github.io'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(require("morgan")("dev"));
app.use(express.json());
app.use(bodyParser.json());

app.use(require("./api/auth").router);
app.use("/teams", require("./api/teams"));
app.use("/pokemon", require("./api/pokemon"));

app.use((req, res, next) => {
  next({ status: 404, message: "Endpoint not found." });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.json(err.message ?? "Sorry, something broke :(");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
