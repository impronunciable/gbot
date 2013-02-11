
var request = require('superagent');

exports.name = '"weather Buenos Aires" - Returns the actual weather for the required place.'

exports.desc = 'weather';

exports.handler = function(str, fn) {

request('http://openweathermap.org/data/2.0/find/name?units=metric&q=' + str, function(res){
  try{
  res.body = JSON.parse(res.text); 

  if(!res.ok || !res.body || !res.body.count) {
    fn('No results for "' + str + '"');
  } else {
    var data = res.body.list[0];
    var txt = 'Weather for "' + str + '":\n\n';
    txt += data.main.temp + '°C\n' + data.weather[0].main + ': ' + data.weather[0].description;
    fn(txt);
  }
  } catch(e) {
    fn('There was an error. Please try again');
  }
});

};

