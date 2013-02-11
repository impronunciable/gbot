
var Bitly = require('bitly');
var config = require('../config').services.bitly;
var bitly = new Bitly(config.username, config.token);

module.exports = function(str, fn) {
  bitly.shorten(str, function(err, response) {
    if (err) fn("There was an error, are you sure that " + str + " is a URL?");
    else fn(response.data.url);
  });
};
