(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["mu-jquery-crank/jquery.crank"], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory(require("mu-jquery-crank/jquery.crank"));
  } else {
    root["mu-jquery-loom/jquery.crank"] = factory(root["mu-jquery-crank/jquery.crank"]);
  }
})(this, function (crank) {
  var slice = Array.prototype.slice;
  var re_space = /\s+/;

  return function (attr) {
    return crank.apply(this, [function ($element) {
      return ($element.attr(attr) || "").split(re_space);
    }].concat(slice.call(arguments, 1)));
  }
});
