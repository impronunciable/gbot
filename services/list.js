var services = require('../config').services;

module.exports = function(str, fn) {
  for(var i in services) {
    el = services[i];
    txt += el.name + ': ' + el.desc + '\n\n';
  }
  fn('Available commands:\n\n' + txt);
};
