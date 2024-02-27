require("dotenv").config();
const express = require("express");
const app = express();
const { sequelize } = require("./models");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//npm packages
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser(process.env.JWT_SECRET_KEY));

const PORT = 2006;

app.listen(PORT, async () => {
  console.log(`Server is live on port ${PORT}`);
  await sequelize.authenticate();
  console.log(`Database Connected Successfully.`);
});
