(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-loom/tests/expr"] = factory.apply(root, modules.map(function (m) {
      return this[m] || root[m.replace(/^\.{2}/, "mu-jquery-loom")];
    }, {
        "qunit": root.QUnit,
        "jquery": root.jQuery
      }));
  }
})([
  "qunit",
  "jquery",
  "../expr",
], this, function (QUnit, $, expr) {
  var expando = $.expando;
  var name = "mu-jquery-loom/expr";

  QUnit.module(name);

  QUnit.testStart(function(details) {
    if (details.module.startsWith(name)) {
      $.expr[":"].loom = expr($, "mu-widget");
    }
  });

  QUnit.testDone(function(details) {
    if (details.skipped) {
      return;
    }
    else if (details.module.startsWith(name)) {
      delete $.expr[":"].loom;
    }
  });

  QUnit.test("not matching", function (assert) {
    assert.expect(1);

    var $element = $("<div>");

    assert.notOk($element.is(":loom"), "selector does not match");
  });

  QUnit.test("matching woven", function (assert) {
    assert.expect(1);

    var $element = $("<div>", { "mu-widget": "test@123"});

    assert.ok($element.is(":loom"), "selector does not match");
  });

  QUnit.test("matching search woven", function (assert) {
    assert.expect(1);

    var $element = $("<div>", { "mu-widget": "test@123"});

    assert.ok($element.is(":loom(tes)"), "selector does not match");
  });

  QUnit.test("matching", function (assert) {
    assert.expect(1);

    var $element = $("<div>", { "mu-widget": "test"});

    assert.ok($element.is(":loom"), "selector matches");
  });

  QUnit.test("matching search (one)", function (assert) {
    assert.expect(1);

    var $element = $("<div>", { "mu-widget": "test"});

    assert.ok($element.is(":loom(tes)"), "selector matches");
  });

  QUnit.test("matching search (many)", function (assert) {
    assert.expect(1);

    var $element = $("<div>", { "mu-widget": "xyz test zoom"});

    assert.ok($element.is(":loom(tes)"), "selector matches");
  });

  QUnit.test("matching for several $elements", function (assert) {
    assert.expect(1);

    var $elements = $("<div></div><div></div><div></div>");
    var $element1 = $elements.eq(0).attr("mu-widget", "test1");
    var $element2 = $elements.eq(2).attr("mu-widget", "test2");

    assert.deepEqual($elements.filter(":loom").get(), [ $element1.get(0), $element2.get(0) ] , "finds matching elements");
  });
});