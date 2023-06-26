const express = require("express");

const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

const routes = require("./routes");

app.use((req, res, next) => {
  req.user = {
    _id: "6497579c68d1e9208c200f86",
  };
  next();
});

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
