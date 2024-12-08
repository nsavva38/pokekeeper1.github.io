require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const app = express();
const PORT = process.env.PORT || 3000; //added process.env

app.use(require("morgan")("dev"));
app.use(express.json());

app.use(cors({origin:'https://pokekeeper.netlify.app' }));//added cors and set url to allow requests from frontend

app.use(bodyParser.json());//added 
app.use(require("./api/auth").router);
// app.use("/teams", require("./api/products"));
// app.use("/pokemon", require("./api/orders"));

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
