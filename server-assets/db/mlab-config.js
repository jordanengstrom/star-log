var mongoose = require('mongoose');
var connectionString = "mongodb://admin:admin@ds044907.mlab.com:44907/star-logs"

var connection = mongoose.connection;
mongoose.connect(connectionString);

connection.on("error", err => {
    console.log("mlab error: ", err);
});

connection.once("open", () => {
    console.log("Connected to mlab!");
});