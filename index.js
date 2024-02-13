/**
 * Dependency Imports
 * --------------------------------------------------
 */
require("dotenv").config({ path: "./env/.env" });
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet')

/**
 * Module Imports
 * ---------------------------------------------------
 */
const dbConnect = require('./config/mongo.js');
const api_v1 = require('./routes/v1/index.js');

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
  }),
);

app.use(helmet())
app.use(express.json()); // to support JSON-encoded request body
app.use(express.urlencoded({ extended: true })); // to support URL-encoded request body

app.use('/api/v1', api_v1);

async function init() {
  const PORT = process.env.PORT || 8080;
  try {
    await dbConnect(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`REST api server listening on port ${PORT}...`),
    );
  } catch (error) {
    console.error('Server failed to start: ', error);
  }
}

init();