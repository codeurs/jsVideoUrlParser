const {combineParams, getTime} = require('../util');

function Dailymotion() {
  this.provider = 'dailymotion';
  this.alternatives = ['dai'];
  this.defaultFormat = 'long';
  this.formats = {
    short: this.createShortUrl,
    long: this.createLongUrl,
    embed: this.createEmbedUrl,
  };
  this.mediaTypes = {
    VIDEO: 'video',
  };
}

module.exports = Dailymotion;

Dailymotion.prototype.parseParameters = function(params) {
  return this.parseTime(params);
};

Dailymotion.prototype.parseTime = function(params) {
  if (params.start) {
    params.start = getTime(params.start);
  }
  return params;
};

Dailymotion.prototype.parseUrl = function(url) {
  var match = url.match(/(?:\/video|ly)\/([A-Za-z0-9]+)/i);
  return match ? match[1] : undefined;
};

Dailymotion.prototype.parse = function(url, params) {
  var _this = this;
  var result = {
    mediaType: this.mediaTypes.VIDEO,
    params: _this.parseParameters(params),
    id: _this.parseUrl(url),
  };
  return result.id ? result : undefined;
};

Dailymotion.prototype.createUrl = function(base, vi, params) {
  return base + vi.id +
    combineParams({
      params: params,
    });
};

Dailymotion.prototype.createShortUrl = function(vi) {
  return this.createUrl('https://dai.ly/', vi, {});
};

Dailymotion.prototype.createLongUrl = function(vi, params) {
  return this.createUrl('https://dailymotion.com/video/', vi, params);
};

Dailymotion.prototype.createEmbedUrl = function(vi, params) {
  return this.createUrl('//www.dailymotion.com/embed/video/', vi, params);
};

require('../base').bind(new Dailymotion());
