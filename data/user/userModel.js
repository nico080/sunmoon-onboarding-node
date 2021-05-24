var mongoose = require('mongoose');
// Setup schema
var userSchema = mongoose.Schema({
    email:  String,
    name: String,
    password: String,
    base64: String
});

var user = module.exports = mongoose.model('users', userSchema);
module.exports.get = function (callback, limit) {
    user.find(callback).limit(limit);
}