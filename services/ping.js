
exports.name = 'ping';

exports.desc = '"ping" - returns pong if the bot is alive.';

exports.handler = function(str, fn) {
  fn('PONG');
};
