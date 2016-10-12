(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-loom/tests/jquery.weave"] = factory.apply(root, modules.map(function (m) {
      return this[m] || root[m.replace(/^\.{2}/, "mu-jquery-loom")];
    }, {
        "jquery": root.jQuery,
        "qunit": root.QUnit
      }));
  }
})([
  "qunit",
  "jquery",
  "../jquery.weave",
], this, function (QUnit, $, weave) {
  var slice = Array.prototype.slice;
  var setTimeout = this.setTimeout;

  var modules = {
    "widget": function ($element, ns) {
      var self = this;

      self.$element = $element;
      self.ns = ns;
    }
  };

  function load(module) {
    return modules[module] || modules.widget;
  }

  function id(i) {
    return this + "@" + i;
  }

  function assert_result(m, $elements) {
    var assert = this;

    return function (result) {
      $.each(result, function (index, widgets) {
        $.each(widgets, function (count, widget) {
          assert.ok(widget instanceof load(m[count]), "instanceof widgets");
          assert.ok(widget.$element.is($elements[index]), "widget.$element");
          assert.strictEqual(widget.ns, id.call(m[count], index * m.length + count + 1), "widget.ns");
        });
      });
    }
  }

  QUnit.module("mu-jquery-loom/jquery.weave#result");

  QUnit.test("1/1 (widgets/elements)", function (assert) {
    var $elements = $("<span></span>")
      .attr("mu-widget", "one");

    assert.expect($elements.length * 3);

    return weave
      .call($elements, "mu-widget", load)
      .done(assert_result.call(assert, ["one"], $elements));
  });

  QUnit.test("1/n (widgets/elements)", function (assert) {
    var $elements = $("<span></span><div></div>")
      .attr("mu-widget", "one");

    assert.expect($elements.length * 3);

    return weave
      .call($elements, "mu-widget", load)
      .done(assert_result.call(assert, ["one"], $elements));
  });

  QUnit.test("n/1 (widgets/elements)", function (assert) {
    var m = ["one", "two"]
    var $elements = $("<span></span>")
      .attr("mu-widget", m.join(" "));

    assert.expect($elements.length * m.length * 3);

    return weave
      .call($elements, "mu-widget", load)
      .done(assert_result.call(assert, m, $elements));
  });

  QUnit.test("n/n (widgets/elements)", function (assert) {
    var m = ["one", "two"]
    var $elements = $("<span></span><div></div>")
      .attr("mu-widget", m.join(" "));

    assert.expect($elements.length * m.length * 3);

    return weave
      .call($elements, "mu-widget", load)
      .done(assert_result.call(assert, m, $elements));
  });

  QUnit.module("mu-jquery-loom/jquery.weave#initialize");

  QUnit.test("triggered on all elements", function (assert) {
    var $elements = $("<span></span><div></div>").each(function (index, element) {
      $(element)
        .attr("mu-widget", "one")
        .on("initialize." + id.call("one", index + 1), function () {
          assert.ok(true, "initialize called");
        });
    });

    assert.expect($elements.length);

    return weave.call($elements, "mu-widget", load);
  });

  QUnit.test("return promise to delay result", function (assert) {
    var count = 0;
    var $elements = $("<span></span><div></div>").each(function (index, element) {
      $(element)
        .attr("mu-widget", "one")
        .on("initialize." + id.call("one", index + 1), function () {
          return $.Deferred(function (deferred) {
            setTimeout(deferred.resolve, 0);
          }).done(function () {
            assert.ok(true, "initialize called");
          });
        });
    });

    assert.expect($elements.length + 1);

    return weave
      .call($elements, "mu-widget", load)
      .done(function () {
        assert.ok(true, "done called");
      });
  });
});