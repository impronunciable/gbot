var request = require('superagent');

module.exports = function(str, fn) {
  request('http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + str, function(err, res){
    try {
    res = JSON.parse(res.text);
    if(err ||!res.responseData || !res.responseData.results.length) fn('There was an error, please try again.');
    else {
      var data = res.responseData.results[0];
      var txt = data.title + '\n' + data.url;
      fn(txt);
    }

    } catch(e) {
      fn('there was an error');
    }
  });
};
