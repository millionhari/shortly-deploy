var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var Url = mongoose.model('url', db.urlSchema);
module.exports = Url;

db.urlSchema.pre('save', function(next){
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});
