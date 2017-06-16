(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root["mu-jquery-loom/create"] = factory();
  }
})(this, function () {
  var bind = Function.prototype.bind;

  return function (c, args) {
    return new (bind.apply(c, [null].concat(args)))();
  }
});
