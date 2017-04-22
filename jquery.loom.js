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

  function find($element, selector) {
    return $element.find(selector).addBack(selector);
  }

  return function (attr) {
    var arg = [attr];
    var args = slice.call(arguments);
    var selector = "[" + attr + "]";

    return this.extend({
      "crank": function () {
        return crank.apply(find(this, selector), arg.concat(slice.call(arguments)));
      },
      "weave": function () {
        return weave.apply(find(this, selector), args.concat(slice.call(arguments)));
      }
    });
  }
});
