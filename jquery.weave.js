(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-component/jquery.weave"] = factory.apply(root, modules.map(function(m) {
      return {
        "jquery": root.jQuery
      }[m] || root[m.replace(/^\./, "mu-jquery-component")];
    }));
  }
})([
  "jquery",
  "./jquery.twist",
  "mu-jquery-crank/jquery.crank"
], this, function($, twist, crank) {
  var slice = Array.prototype.slice;

  function collect() {
    return slice.call(arguments);
  }

  function ns(widget) {
    return widget.ns;
  }

  function initialize(widgets, index) {
    return widgets && crank.call(widgets[0].$element, $.map(widgets, ns), "initialize").then(function() {
      return widgets;
    });
  }

  function weave(result) {
    return $.when.apply(null, $.map(result, initialize)).then(collect);
  }

  return function() {
    return twist.apply(this, slice.call(arguments)).then(weave);
  }
});
