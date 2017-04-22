(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-loom/jquery.loom"] = factory.apply(root, modules.map(function (m) {
      return root[m.replace(/^\./, "mu-jquery-loom")];
    }));
  }
})(["./jquery.crank", "./jquery.weave"], this, function (crank, weave) {
  var slice = Array.prototype.slice;
  var ops = {
    "crank": crank,
    "weave": weave
  };

  return function (attr) {
    var me = this;
    var args = slice.call(arguments);
    var selector = "[" + attr + "]";

    me.constructor.each(ops, function (op, fn) {
      me[op] = function () {
        return fn.apply(this.find(selector).addBack(selector), args.concat(slice.call(arguments)));
      };
    });

    return me;
  }
});
