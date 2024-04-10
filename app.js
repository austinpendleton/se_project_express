const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const { errorHandler } = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
require("dotenv").config();

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

const routes = require("./routes");
app.use(cors());
app.use(express.json());

app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
//this is a test
