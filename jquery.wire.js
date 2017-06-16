(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["mu-jquery-wire/jquery.wire", "./create"], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory(require("mu-jquery-wire/jquery.wire"), require("./create"));
  } else {
    root["mu-jquery-loom/jquery.wire"] = factory(root["mu-jquery-wire/jquery.wire"], root["mu-jquery-loom/create"]);
  }
})(this, function (wire, create) {
  var slice = Array.prototype.slice;
  var re_space = /\s+/;
  var re_clean = /(?:^|@\d+)$/;

  function clean(value) {
    return !re_clean.test(value);
  }

  return function (attr, callback) {
    var args = slice.call(arguments, 2);
    var _create = create;
    var _callback = callback;
    var $ = this.constructor;

    if (!$.isFunction(callback)) {
      _create = callback.create || _create;
      _callback = callback.callback;
    }

    return wire.call(this,
      function ($element) {
        return ($element.attr(attr) || "").split(re_space).filter(clean);
      },
      function ($element, index, name) {
        var self = this;

        return $.when(_callback.call(self, name, index)).then(function (result) {
          result = result && _create.call(self, result, [$element, name = name + "@" + $.guid++].concat(args));

          $element.attr(attr, function (i, value) {
            value = value.split(re_space);
            value[index] = name;
            return value.join(" ");
          });

          return result;
        });
      });
  }
});
