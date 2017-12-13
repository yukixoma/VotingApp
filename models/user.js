var mongoose    = require("mongoose");
var Schema      = mongoose.Schema;

var userSchema = new Schema ({
    username: String,
    password: String,
}, {timestamps: true});

var ModelClass = mongoose.model("user", userSchema); //  url is collection, urlSchema is Schema name

module.exports = ModelClass; // to use this file in another app