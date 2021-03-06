(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-jquery-loom/tests/jquery.wire"] = factory.apply(root, modules.map(function (m) {
      return this[m] || root[m.replace(/^\.{2}/, "mu-jquery-loom")];
    }, {
        "jquery": root.jQuery,
        "qunit": root.QUnit
      }));
  }
})([
  "qunit",
  "jquery",
  "../jquery.wire"
], this, function (QUnit, $, wire) {
  var modules = {
    "widget": function ($element, ns) {
      var me = this;

      me.ns = ns;
      me.$element = $element;
    }
  };

  function load(name) {
    return modules[name] || modules.widget;
  }

  function id(name, i) {
    return name + "@" + i;
  }

  function assert_result(names, $elements, guid) {
    var assert = this;

    return function (result) {
      $.each(result, function (index, widgets) {
        $.each(widgets, function (count, widget) {
          assert.ok(widget instanceof load(names[count]), "instanceof widgets");
          assert.ok(widget.$element.is($elements[index]), "widget.$element");
          assert.strictEqual(widget.ns, id(names[count], index * names.length + count + guid), "widget.ns");
        });
      });
    }
  }

  QUnit.module("mu-jquery-loom/jquery.wire#callback");

  QUnit.test("noop", function (assert) {
    var $elements = $("<span></span>");

    assert.expect(0);

    return wire.call($elements, "mu-widget", function () {
      assert.notOk(true, "shound not be called");
    });
  });

  QUnit.test("returning undefined defaults to name", function (assert) {
    var $elements = $("<span></span>")
      .attr("mu-widget", "one");

    assert.expect(1);

    return wire
      .call($elements, "mu-widget", function () { })
      .then(function (result) {
        assert.deepEqual(result, [["one"]], "result matches");
      });
  });

  QUnit.test("typeof(function) called for each element with correct parameters", function (assert) {
    var names = ["one", "two"];
    var $elements = $("<span></span><div></div>")
      .attr("mu-widget", names.join(" "));

    assert.expect($elements.length * names.length);

    return wire
      .call($elements, "mu-widget", function (name, index) {
        assert.strictEqual(name, names[index], "check that name matches");
        return load.apply(this, arguments);
      });
  });

  QUnit.test("typeof(function) called in correct scope", function (assert) {
    var names = ["one", "two"];
    var $elements = $("<span></span><div></div>")
      .attr("mu-widget", names.join(" "));

    assert.expect($elements.length * names.length);

    return wire
      .call($elements, "mu-widget", function (name, index) {
        assert.strictEqual(this, $elements, "scope matches");
        return load.apply(this, arguments);
      });
  });

  QUnit.test("!typeof(function).callback called for each element with correct parameters", function (assert) {
    var names = ["one", "two"];
    var $elements = $("<span></span><div></div>")
      .attr("mu-widget", names.join(" "));

    assert.expect($elements.length * names.length);

    return wire
      .call($elements, "mu-widget", {
        "callback": function (name, index) {
          assert.strictEqual(name, names[index], "check that name matches");
          return load.apply(this, arguments);
        }
      });
  });

  QUnit.test("!typeof(function).create not called if .callback returns falsy", function (assert) {
    var names = ["one", "two"];
    var $elements = $("<span></span><div></div>")
      .attr("mu-widget", names.join(" "));
    var count = 0;

    assert.expect(1);

    return wire
      .call($elements, "mu-widget", {
        "callback": function (m) {
          return m !== "one" && load.call(this, m);
        },
        "create": function (c, args) {
          count++;
        }
      })
      .then(function () {
        assert.strictEqual(count, 2, "count matches");
      });
  });

  QUnit.test("!typeof(function).create called for each element with correct parameters", function (assert) {
    var guid = $.guid;
    var count = 0;
    var names = ["one", "two"];
    var $elements = $("<span></span><div></div>")
      .attr("mu-widget", names.join(" "));

    assert.expect($elements.length * names.length * 3);

    return wire
      .call($elements, "mu-widget", {
        "callback": load,
        "create": function (c, args) {
          var name = names[count % names.length];
          assert.strictEqual(c, load(name), "check that instance matches");
          assert.ok(args[0].is($elements[Math.floor(count / $elements.length)]), "args[0] matches $element");
          assert.strictEqual(args[1], id(name, count++ + guid), "args[1] matches ns");
        }
      });
  });

  QUnit.test("!typeof(function).create called in correct scope", function (assert) {
    var names = ["one", "two"];
    var $elements = $("<span></span><div></div>")
      .attr("mu-widget", names.join(" "));

    assert.expect($elements.length * names.length);

    return wire
      .call($elements, "mu-widget", {
        "callback": load,
        "create": function (c, args) {
          assert.strictEqual(this, $elements, "scope matches");
        }
      });
  });

  QUnit.module("mu-jquery-loom/jquery.wire#constructor");

  QUnit.test("default arguments", function (assert) {
    var guid = $.guid;
    var count = 0;
    var names = ["one", "two"];
    var $elements = $("<span></span><div></div>")
      .attr("mu-widget", names.join(" "));
    var widget = function ($element, ns) {
      assert.ok($element.is($elements[Math.floor(count / $elements.length)]), "$element");
      assert.strictEqual(ns, id(names[count % names.length], count++ + guid), "ns");
    };

    assert.expect($elements.length * names.length * 2);

    return wire
      .call($elements, "mu-widget", function (name) {
        return {
          "one": widget,
          "two": widget
        }[name] || load.apply(this, arguments);
      });
  });

  QUnit.test("extra arguments", function (assert) {
    var o = {};
    var one = function ($element, ns, extra) {
      assert.strictEqual(extra, o, "extra");
    };
    var $elements = $("<span></span>")
      .attr("mu-widget", "one");

    assert.expect($elements.length);

    return wire
      .call($elements, "mu-widget", function (module) {
        return {
          "one": one
        }[module] || load.apply(this, arguments);
      }, o);
  });

  QUnit.module("mu-jquery-loom/jquery.wire#result");

  QUnit.test("$noop", function (assert) {
    var $elements = $();

    assert.expect(1);

    return wire
      .call($elements, "mu-widget", function () { })
      .then(function (result) {
        assert.deepEqual(result, [], "result matches");
      });
  });

  QUnit.test("returning undefined defaults to name", function (assert) {
    var $elements = $("<span></span>")
      .attr("mu-widget", "one");

    assert.expect(1);

    return wire
      .call($elements, "mu-widget", function () { })
      .then(function (result) {
        assert.deepEqual(result, [["one"]], "result matches");
      });
  });

  QUnit.test("0/1 (widgets/elements)", function (assert) {
    var $elements = $("<span></span>");

    assert.expect(1);

    return wire
      .call($elements, "mu-widget", load)
      .done(function (result) {
        assert.deepEqual(result, [[]], "result matches");
      });
  });

  QUnit.test("1/1 (widgets/elements)", function (assert) {
    var guid = $.guid;
    var $elements = $("<span></span>")
      .attr("mu-widget", "one");

    assert.expect($elements.length * 3);

    return wire
      .call($elements, "mu-widget", load)
      .done(assert_result.call(assert, ["one"], $elements, guid));
  });

  QUnit.test("1/n (widgets/elements)", function (assert) {
    var guid = $.guid;
    var $elements = $("<span></span><div></div>")
      .attr("mu-widget", "one");

    assert.expect($elements.length * 3);

    return wire
      .call($elements, "mu-widget", load)
      .done(assert_result.call(assert, ["one"], $elements, guid));
  });

  QUnit.test("n/1 (widgets/elements)", function (assert) {
    var guid = $.guid;
    var names = ["one", "two"]
    var $elements = $("<span></span>")
      .attr("mu-widget", names.join(" "));

    assert.expect($elements.length * names.length * 3);

    return wire
      .call($elements, "mu-widget", load)
      .done(assert_result.call(assert, names, $elements, guid));
  });

  QUnit.test("n/n (widgets/elements)", function (assert) {
    var guid = $.guid;
    var names = ["one", "two"]
    var $elements = $("<span></span><div></div>")
      .attr("mu-widget", names.join(" "));

    assert.expect($elements.length * names.length * 3);

    return wire
      .call($elements, "mu-widget", load)
      .done(assert_result.call(assert, names, $elements, guid));
  });
});