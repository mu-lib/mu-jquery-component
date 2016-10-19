(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-loom/jquery.crank"] = factory.apply(root, modules.map(function (m) {
      return root[m];
    }));
  }
})(["mu-jquery-crank/jquery.crank"], this, function (crank) {
  var slice = Array.prototype.slice;
  var re_space = /\s+/;

  return function (attr) {
    return crank.apply(this, [function ($element) {
      return ($element.attr(attr) || "").split(re_space);
    }].concat(slice.call(arguments, 1)));
  }
});
