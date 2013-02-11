
/**
 * Module dependencies
 */

var request = require('superagent');

exports.name = 'torrent';

exports.desc = '"torrent seinfeld s01e01" - get piratebay match result with most seeders.';

exports.handler = function(str, fn) {
  request('http://apify.ifc0nfig.com/tpb/search?id=' + str, function(res){
    if(!res.body.length) return fn('No results');
    var result = res.body[0];
    var txt = 'First result: ' + result.name + '\n';
    txt += 'Link: http://thepiratebay.se/torrent/' + result.id + '\n';
    txt += 'Seeders: ' +result.seeders + '\nLeechers: ' + result.leechers;

    fn(txt);
  });
};
