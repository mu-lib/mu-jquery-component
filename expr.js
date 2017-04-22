(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.call(root);
  } else {
    root["mu-jquery-loom/expr"] = factory.call(root);
  }
})([], this, function () {
  function matches($, element, attr, search) {
    var value = $(element).attr(attr);
    return search
      ? new RegExp("(?:^|\s+)" + search).test(value)
      : value;
  }

  return function ($, attr) {
    return $.expr.createPseudo
      ? $.expr.createPseudo(function (search) {
        return function (element) {
          return matches($, element, attr, search);
        }
      })
      : function (element, index, match) {
        return matches($, element, attr, match[3]);
      };
  }
});
