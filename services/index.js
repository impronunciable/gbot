
/*
 * Module dependencies
 */

var services = module.exports = {};

services.services = [];

services.load = function(arr) {
  Object.keys(arr).forEach(function(file){
    if(arr[file].disabled && arr[file].disabed === true) return;
    var service = require('./' + file);
    services.services[file] = {desc: arr[file].desc, handler: service, name: file};
  });
};

services.selectService = function(str, fn) {
  var self = this;

  var cmd = str.split(' ')[0];
  str = str.replace(cmd, '');
  str = str.trim();

  if(this.services[cmd.toLowerCase()]) {
    this.services[cmd.toLowerCase()].handler(str, fn);
  }

  if("list" === cmd.toLowerCase()) {
    var txt = '';
    var el;
    for(var i in services.services) {
      el = services.services[i];
      txt += el.name + ': ' + el.desc + '\n\n';
    }
    fn('Available commands:\n\n' + txt);
  } 
};

