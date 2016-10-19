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
})(["./jquery.crank", "./jquery.twist", "./jquery.weave"], this, function (crank, twist, weave) {
  var slice = Array.prototype.slice;

  function find(selector) {
    return this.find(selector).addBack(selector);
  }

  return function (selector) {
    var args = slice.call(arguments, 1);
    var a = args.slice(0, 1);

    $.extend(this.constructor.fn, {
      "crank": function () {
        return crank.apply(find.call(this, selector), a.concat(slice.call(arguments)));
      },

      "twist": function () {
        return twist.apply(find.call(this, selector), args.concat(slice.call(arguments)));
      },

      "weave": function () {
        return weave.apply(find.call(this, selector), args.concat(slice.call(arguments)));
      }
    });

    return this;
  }
});
