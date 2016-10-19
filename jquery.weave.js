(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-loom/jquery.weave"] = factory.apply(root, modules.map(function (m) {
      return root[m.replace(/^\./, "mu-jquery-loom")];
    }));
  }
})(["./jquery.twist", "mu-jquery-crank/jquery.crank"], this, function (twist, crank) {
  var slice = Array.prototype.slice;

  function collect() {
    return slice.call(arguments);
  }

  function ns(widget) {
    return widget.ns;
  }

  return function () {
    var me = this;
    var $ = me.constructor;

    return twist.apply(me, slice.call(arguments)).then(function (result) {
      return $.when.apply(null, $.map(result, function (widgets, index) {
        return widgets && crank.call(widgets[0].$element, $.map(widgets, ns), "initialize").then(function () {
          return widgets;
        });
      })).then(collect);
    });
  }
});
