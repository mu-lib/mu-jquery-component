(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-loom/tests/jquery.loom"] = factory.apply(root, modules.map(function (m) {
      return this[m] || root[m.replace(/^\.{2}/, "mu-jquery-loom")];
    }, {
        "jquery": root.jQuery,
        "qunit": root.QUnit
      }));
  }
})([
  "qunit",
  "jquery",
  "../jquery.loom"
], this, function (QUnit, $, loom) {

  function name(count) {
    return this + "@" + count;
  }

  QUnit.testDone(function (details) {
    delete $.fn.crank;
    delete $.fn.twist;
    delete $.fn.weave;
  });


  QUnit.module("mu-jquery-loom/jquery.loom#weave");

  QUnit.test("constructor called with default arguments", function (assert) {
    var guid = $.guid;
    var count = 0;
    var names = "test";
    var $element = $("<div></div>")
      .attr("mu-widget", names);

    assert.expect(3);

    return loom
      .call($element, "[mu-widget]", "mu-widget", function () {
        return function ($element, ns) {
          this.$element = $element;
          this.ns = ns;
          assert.strictEqual(arguments.length, 2, "arguments.length is 2");
          assert.ok($element.is($element), "$element matches");
          assert.strictEqual(ns, name.call(names, count++ + guid), "ns matches");
        };
      })
      .weave();
  });

  QUnit.test("constructor called with extra arguments", function (assert) {
    var guid = $.guid;
    var count = 0;
    var names = "test";
    var obj = {};
    var $element = $("<div></div>")
      .attr("mu-widget", names);

    assert.expect(4);

    return loom
      .call($element, "[mu-widget]", "mu-widget", function () {
        return function ($element, ns, o) {
          this.$element = $element;
          this.ns = ns;
          assert.strictEqual(arguments.length, 3, "arguments.length is 3");
          assert.ok($element.is($element), "$element matches");
          assert.strictEqual(ns, name.call(names, count++ + guid), "ns matches");
          assert.strictEqual(o, obj);
        };
      }, obj)
      .weave();
  });

  QUnit.test("initialize called", function (assert) {
    var $element = $("<div></div>")
      .attr("mu-widget", "test");

    assert.expect(1);

    return loom
      .call($element, "[mu-widget]", "mu-widget", function () {
        return function ($element, ns) {
          this.$element = $element.on("initialize." + ns, function () {
            assert.ok(true, "initialize called");
          });
          this.ns = ns;
        };
      })
      .weave();
  });
});