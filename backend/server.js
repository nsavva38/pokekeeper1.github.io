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
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
  },
  optionsSuccessStatus: 200
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
