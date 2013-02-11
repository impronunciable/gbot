
var mdb = require('moviedb')(require('../config').services.movies.token);

module.exports = function(str, fn) {
  var cmd = str.split(' ')[0];
  str = str.replace(cmd, '');
  str = str.trim();

  if(cmd.toLowerCase() === "search") {
    mdb.searchMovie({query: str}, function(err, res){
      if(err) { 
        fn('Wrong search');
      } else if(!res.results) {
        fn('No results');
      } else {
        var txt = 'Results for keyword "'+ str +'":\n\n';
        res.results.reverse();
        res.results.forEach(function(el, i){
          txt +=  (i+1) + ') ' + ' "' + el.title + '" - http://themoviedb.org/movie/' + el.id + '\n\n';  
        }); 
        fn(txt);
      }
    });
  }
};
