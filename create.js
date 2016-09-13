(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-component/create"] = factory.apply(root, modules.map(function(m) {
      return root[m];
    }));
  }
})([], this, function() {
  var bind = Function.prototype.bind;

  return function (c, args) {
    return new (bind.apply(c, [null].concat(args)))();
  }
});
