"use strict";

var url = require("url");

var clone = require("clone");

var PREFIX = "xray+";

module.exports = function(tilelive, options) {
  var XRay = function(uri, callback) {
    uri = url.parse(clone(uri), true);

    uri.protocol = uri.protocol.replace(PREFIX, "");

    if (!tilelive.protocols["vector:"]) {
      return setImmediate(callback, new Error("tilelive-vector is unavailable."));
    }

    return new tilelive.protocols["vector:"].xray({ uri: uri }, callback);
  };

  XRay.registerProtocols = function(tilelive) {
    var protocols = Object.keys(tilelive.protocols);
    for (var i in protocols) {
      tilelive.protocols[PREFIX + protocols[i]] = this;
    }
  };

  XRay.registerProtocols(tilelive);

  return XRay;
};
