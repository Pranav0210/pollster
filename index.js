/**
 * Dependency Imports
 * --------------------------------------------------
 */
require("dotenv").config({ path: "./env/.env" });
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet')
const httpProxy = require("http-proxy");

httpProxy
  .createProxyServer({
    target: "http://localhost:8080",
    ws: true,
  })
  .listen(8081);

/**
 * Module Imports
 * ---------------------------------------------------
 */
const dbConnect = require('./config/mongo.js');
const api_v1 = require('./routes/v1/index.js');
const resultSocket = require('./sockets/resultSocket.js')
const Vote = require('./models/votesModel.js');

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
  }),
);
  
// resultSocket(server)

app.use(helmet())
app.use(express.json()); // to support JSON-encoded request body
app.use(express.urlencoded({ extended: true })); // to support URL-encoded request body

app.use('/api/v1', api_v1);


async function init() {
  const PORT = process.env.PORT || 8080;
  try {
    await dbConnect(process.env.MONGO_URI);
      
    const server = express().use(app).listen(PORT, () => console.log(`Listening Server on ${PORT}`));
    resultSocket(server)

  } catch (error) {
    console.error('Server failed to start properly: ', error);
  }
}

init();
