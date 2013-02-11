
/*
 * Module dependencies
 */

var fs = require('fs');

var services = module.exports = {};

services.services = [];

services.load = function(arr) {
  arr.forEach(function(file){
    var service = require('./' + file);
    services.services.push(service);
  });
};

services.selectService = function(str, fn) {
  var self = this;

  var cmd = str.split(' ')[0];
  str = str.replace(cmd, '');
  str = str.trim();

  var known_cmd = this.services.some(function(el){
    if(el.name === cmd.toLowerCase()) {
      el.handler(str, fn);
      return true;
    }
  });

  if("list" === cmd.toLowerCase()) {
    var txt = '';
    services.services.forEach(function(el){
      txt += el.name + ': ' + el.desc + '\n\n';
    });
    fn('Available commands:\n\n' + txt);
  } 

};

