var tuiter = require('tuiter')(require('../config').services.twitter.credentials);

module.exports = function(str, fn) {
  if(/^@/.test(str)) {
    tuiter.userTimeline({screen_name: str.split(' ')[0].substring(1)}, function(err, data){
      if(!data || err || !data.length) return fn('No results');
      var user = data[0].user;
      var txt = '@' + user.screen_name + ' - ' + user.name + '\n\n';
      txt += 'Last tweets:\n\n';

      data.reverse();
  
      data.forEach(function(el){
        txt += el.text + '\n\n';
      });
      fn(txt);
    });
  }
};
