
var request = require('superagent');

exports.name = 'hn';

exports.desc = '"hn" - Hacker News home page.';

exports.handler = function(str, fn) {

  request('http://api.ihackernews.com/page', function(res){
    if(!res.body.items || !res.body.items.length) return fn('No results');
    var txt = '';
    res.body.items.forEach(function(el, i){
      txt += (i+1) + ') ' + el.title + '\n';
      txt += el.url + '\n\n';
    });

    fn(txt);
  });

};
