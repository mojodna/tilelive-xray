# tilelive-xray

A [tilelive](https://github.com/mapbox/tilelive.js) provider that uses
[tilelive-vector](https://github.com/mapbox/tilelive-vector)'s xray
functionality to generate visual data tile representations.

This registers the `xray+` prefix, so valid tilelive URLs include
`xray+mbtiles://./tiles.mbtiles`, `xray+tmsource://./data.tm2`, etc
