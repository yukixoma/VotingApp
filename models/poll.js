var mongoose    = require("mongoose");
var Schema      = mongoose.Schema;

var pollSchema = new Schema ({}, {strict: false});

var ModelClass = mongoose.model("poll", pollSchema); //  poll is collection, pollSchema is Schema name

module.exports = ModelClass; // to use this file in another app