var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.SchemaTypes.ObjectId;
var schemaName = "Log";

var schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    created: { type: Date, required: true, default: Date.now() },
    entry: { type: String, required: true },

    shipId: { type: ObjectId, ref: "Ship", required: true }
});

module.exports = mongoose.model(schemaName, schema);