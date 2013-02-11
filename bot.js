
/**
 * Module dependencies
 */

var xmpp = require('node-xmpp')
  , services = require('./services')
  , config = require('./config')
  , debug = require('debug')('gbot');

var Bot = module.exports = function(config) {
  var conn = this.conn = new xmpp.Client(config.client);
  conn.socket.setTimeout(0);
  conn.socket.setKeepAlive(true, 10000);

  conn.on('online', function(){ debug('Connected'); });
  conn.on('online', this.setStatus.bind(this, config.status_message));

  if(config.allow_auto_subscribe) {
    conn.addListener('online', this.requestGoogleRoster.bind(this));
    conn.addListener('stanza', this.acceptSubscriptionRequests.bind(this));
  }
    
  conn.addListener('stanza', this.requestHandler.bind(this));
};

Bot.prototype.setStatus = function(status_msg) {
  var presence_elem = new xmpp.Element('presence', { })
                              .c('show').t('chat').up()
                              .c('status').t(status_msg);
  this.conn.send(presence_elem);
};

Bot.prototype.requestGoogleRoster = function() {
  var roster_elem = new xmpp.Element('iq', { from: this.conn.jid, type: 'get', id: 'google-roster'})
                      .c('query', { xmlns: 'jabber:iq:roster', 'xmlns:gr': 'google:roster', 'gr:ext': '2' });
  this.conn.send(roster_elem);
};

Bot.prototype.acceptSubscriptionRequests = function(stanza) {
  if(stanza.is('presence') && stanza.attrs.type === 'subscribe') {
    var subscribe_elem = new xmpp.Element('presence', {
      to: stanza.attrs.from,
      type: 'subscribed'
    });
    this.conn.send(subscribe_elem);
    this.send(config.welcome_message, stanza.attrs.from);
    debug('Accepted new contact: ' + stanza.attrs.from);
  }
};

Bot.prototype.requestHandler = function(stanza) {
  var self = this;
  if(stanza.is('message')) {
    services.selectService(fetchMessage(stanza), function(out){
      self.send(out, stanza.attrs.from);
    });
  }
};

Bot.prototype.send = function(msg, to) {
  this.conn.send(
    new xmpp.Element('message',
                     { to: to,
                       type: 'chat'}).
                    c('body').
                    t(msg);
  );

  debug('Message: ' + msg + '\n sent to ' + to);
};

var fetchMessage = function(stanza) {
  var msg = '';
  stanza.children.some(function(el){
    if(el.name === "body") {
      msg = el.children.join('\n');
      return true;
    }
  });
  return msg;
};

services.load(config.services);
