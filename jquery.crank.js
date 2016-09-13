(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-component/jquery.crank"] = factory.apply(root, modules.map(function(m) {
      return {
        "jquery": root.jQuery
      }[m] || root[m];
    }));
  }
})([
  "jquery",
  "mu-jquery-wire/jquery.crank"
], this, function($, crank) {
  var slice = Array.prototype.slice;
  var re = /\s+/;

  return function (attr) {
      return crank.apply(this, [function($element) {
        return ($element.attr(attr) || "").split(re);
      }].concat(slice.call(arguments, 1)));
  }
});
