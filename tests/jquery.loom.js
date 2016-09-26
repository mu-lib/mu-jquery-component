(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-loom/tests/jquery.loom"] = factory.apply(root, modules.map(function (m) {
      return {
        "jquery": root.jQuery,
        "qunit": root.QUnit
      }[m = m.replace(/^\.{2}/, "mu-jquery-loom")] || root[m];
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

  QUnit.testDone(function(details) {
    delete $.fn.crank;
    delete $.fn.twist;
    delete $.fn.weave;
  });


  QUnit.module("mu-jquery-loom/jquery.loom#weave");

  QUnit.test("constructor called with default arguments", function (assert) {
    assert.expect(3);

    var count = 0;
    var m = "test";
    var $e = $("<div></div>").attr("mu-widget", m);

    return loom.call($e, "[mu-widget]", "mu-widget", function () {
        return function ($element, ns) {
          assert.strictEqual(arguments.length, 2, "arguments.length is 2");
          assert.ok($element.is($e), "$element matches");
          assert.strictEqual(ns, name.call(m, ++count), "ns matches");
        };
      })
      .weave();
  });

  QUnit.test("constructor called with extra arguments", function (assert) {
    assert.expect(4);

    var count = 0;
    var m = "test";
    var $e = $("<div></div>").attr("mu-widget", m);
    var obj = {};

    return loom.call($e, "[mu-widget]", "mu-widget", function () {
        return function ($element, ns, o) {
          assert.strictEqual(arguments.length, 3, "arguments.length is 3");
          assert.ok($element.is($e), "$element matches");
          assert.strictEqual(ns, name.call(m, ++count), "ns matches");
          assert.strictEqual(o, obj);
        };
      }, obj)
      .weave();
  });

  QUnit.test("initialize called", function (assert) {
    assert.expect(1);

    var $e = $("<div></div>").attr("mu-widget", "test");

    return loom.call($e, "[mu-widget]", "mu-widget", function () {
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