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
    // TODO iterate over previously registered protocols and prepend this?
    tilelive.protocols[PREFIX + "http:"] = this;
    tilelive.protocols[PREFIX + "https:"] = this;
    tilelive.protocols[PREFIX + "mapbox:"] = this;
    tilelive.protocols[PREFIX + "mbtiles:"] = this;
    tilelive.protocols[PREFIX + "tilejson+http:"] = this;
    tilelive.protocols[PREFIX + "tilejson+https:"] = this;
    tilelive.protocols[PREFIX + "tmsource:"] = this;
  };

  XRay.registerProtocols(tilelive);

  return XRay;
};
