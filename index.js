//LIBRARIES
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var server = express()
var port = 3000

require('./server-assets/db/mlab-config')


let shipRoutes = require("./server-assets/routes/ships");
let logRoutes = require("./server-assets/routes/logs");
let commentRoutes = require("./server-assets/routes/comments");

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(shipRoutes);
server.use(logRoutes);
server.use(commentRoutes);

server.use("*", (error, req, res, next) => {
  res.status(400).send(error);
});


server.listen(port, () => {
  console.log("the server is running... Port:", port);
});