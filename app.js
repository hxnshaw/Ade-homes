require("dotenv").config();
const express = require("express");
const app = express();
const { sequelize } = require("./models");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//routers

//NotFound and ErrorHandler Middlewares
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

//npm packages
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser(process.env.JWT_SECRET_KEY));

//setup routers

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = 2006;

app.listen(PORT, async () => {
  console.log(`Server is live on port ${PORT}`);
  await sequelize.authenticate();
  console.log(`Database Connected Successfully.`);
});
