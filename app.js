const express = require("express");
const path = require("path");
const hbs = require("hbs");
const logger = require("morgan");
const app = express();

require("./config/db.config");

app.use(logger("dev"));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

hbs.registerPartials(path.join(__dirname, "/views/partials"));
app.use(express.static("public"));

const router = require("./config/routes.config");
app.use("/", router);

app.use((err, req, res, next) => {
  res.send(JSON.stringify(err));
});

app.listen("3000", () => {
  console.log("Escuchando en el puerto 3000");
});
