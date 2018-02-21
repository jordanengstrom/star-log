var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schemaName = "Ship";

var schema = new Schema({
    name: { type: String, required: true },
    created: { type: Date, required: true, default: Date.now() },
    type: {type: String, enum: ["Transport", "Destroyer",  "Battle Cruiser", "Space Station"]},
    crew: { type: Number, required: true},
    toLightSpeed: {type: Boolean, required: true}    
});

module.exports = mongoose.model(schemaName, schema);