
var Bitly = require('bitly');
var config = require('../config').services.bitly;
var bitly = new Bitly(config.username, config.token);

exports.name = 'bitly';

exports.desc = '"bitly http://los-rayos.com.ar" - URL shortener.';

exports.handler = function(str, fn) {
  bitly.shorten(str, function(err, response) {
    if (err) fn("There was an error, are you sure that " + str + " is a URL?");
    else fn(response.data.url);
  });
};
