(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["./jquery.wire", "mu-jquery-crank/jquery.crank"], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory(require("./jquery.wire"), require("mu-jquery-crank/jquery.crank"));
  } else {
    root["mu-jquery-loom/jquery.weave"] = factory(root["mu-jquery-loom/jquery.wire"], root["mu-jquery-crank/jquery.crank"]);
  }
})(this, function (wire, crank) {
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

    return wire.apply(me, slice.call(arguments)).then(function (result) {
      return $.when.apply(null, result.map(function (widgets, index) {
        var callbacks;
        var $element;
        return widgets.length && ($element = widgets[0].$element)
          ? crank.call($element, widgets.map(ns), "initialize", (callbacks = $.Callbacks("once")).add)
            .then(callbacks.fire)
            .then(function () {
              return widgets;
            })
          : widgets;
      })).then(collect);
    });
  }
});
