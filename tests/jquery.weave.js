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
})(["qunit", "jquery", "mu-jquery-capture/capture", "../jquery.weave"], this, function (QUnit, $, capture, weave) {
  var slice = Array.prototype.slice;
  var setTimeout = this.setTimeout;

  var modules = {
    "widget": function ($element, ns) {
      var self = this;

      self.$element = $element;
      self.ns = ns;
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

  QUnit.module("mu-jquery-loom/jquery.weave#callback");

  QUnit.test("noop", function (assert) {
    var $elements = $("<span></span>");

    assert.expect(0);

    return weave.call($elements, "mu-widget", function () {
      assert.notOk(true, "shound not be called");
    });
  });

  QUnit.module("mu-jquery-loom/jquery.weave#result");

  QUnit.test("$noop", function (assert) {
    var $elements = $();

    assert.expect(1);

    return weave
      .call($elements, "mu-widget", load)
      .then(function (result) {
        assert.deepEqual(result, [], "result matches");
      });
  });

  QUnit.test("returning undefined defaults to name", function (assert) {
    var $elements = $("<span></span>")
      .attr("mu-widget", "one");

    assert.expect(1);

    return weave
      .call($elements, "mu-widget", function () { })
      .then(function (result) {
        assert.deepEqual(result, [["one"]], "result matches");
      });
  });

  QUnit.test("0/1 (widgets/elements)", function (assert) {
    var $elements = $("<span></span>", { "mu-widget": "" });

    assert.expect(1);

    return weave
      .call($elements, "mu-widget", load)
      .then(function (result) {
        assert.deepEqual(result, [[]], "result matches");
      });
  });

  QUnit.test("1/1 (widgets/elements)", function (assert) {
    var guid = $.guid;
    var $elements = $("<span></span>")
      .attr("mu-widget", "one");

    assert.expect($elements.length * 3);

    return weave
      .call($elements, "mu-widget", load)
      .done(assert_result.call(assert, ["one"], $elements, guid));
  });

  QUnit.test("1/n (widgets/elements)", function (assert) {
    var guid = $.guid;
    var $elements = $("<span></span><div></div>")
      .attr("mu-widget", "one");

    assert.expect($elements.length * 3);

    return weave
      .call($elements, "mu-widget", load)
      .done(assert_result.call(assert, ["one"], $elements, guid));
  });

  QUnit.test("n/1 (widgets/elements)", function (assert) {
    var guid = $.guid;
    var names = ["one", "two"]
    var $elements = $("<span></span>")
      .attr("mu-widget", names.join(" "));

    assert.expect($elements.length * names.length * 3);

    return weave
      .call($elements, "mu-widget", load)
      .done(assert_result.call(assert, names, $elements, guid));
  });

  QUnit.test("n/n (widgets/elements)", function (assert) {
    var guid = $.guid;
    var names = ["one", "two"]
    var $elements = $("<span></span><div></div>")
      .attr("mu-widget", names.join(" "));

    assert.expect($elements.length * names.length * 3);

    return weave
      .call($elements, "mu-widget", load)
      .done(assert_result.call(assert, names, $elements, guid));
  });

  QUnit.module("mu-jquery-loom/jquery.weave#initialize");

  QUnit.test("triggered on all elements", function (assert) {
    var guid = $.guid + 2; // $.guid + ($elements * handlers)
    var $elements = $("<span></span><div></div>")
      .attr("mu-widget", "one")
      .each(function (index, element) {
        $(element)
          .on("initialize." + id("one", index + guid), function () {
            assert.ok(true, "initialize called");
          });
      });

    assert.expect($elements.length);

    return weave.call($elements, "mu-widget", load);
  });

  QUnit.test("callback triggered after all handlers", function (assert) {
    var guid = $.guid + 4; // $.guid + ($elements * handlers)
    var $elements = $("<span></span><div></div>").each(function (index, element) {
      var _id = id("one", index + guid);
      $(element)
        .attr("mu-widget", "one")
        .on("initialize." + _id, function () {
          assert.ok(true, "initialize called");
        })
        .on("initialize." + _id, function ($event, cb) {
          cb(function (result) {
            assert.deepEqual(result, [[_id]], "callback called");
          });
        });
    });

    assert.expect($elements.length * 2);

    return weave.call($elements, "mu-widget", load);
  });

  QUnit.test("return promise to delay result", function (assert) {
    var guid = $.guid + 2; // $.guid + ($elements * handlers)
    var $elements = $("<span></span><div></div>").each(function (index, element) {
      $(element)
        .attr("mu-widget", "one")
        .on("initialize." + id("one", index + guid), capture($, function () {
          return $.Deferred(function (deferred) {
            setTimeout(deferred.resolve, 0);
          }).done(function () {
            assert.ok(true, "initialize called");
          });
        }));
    });

    assert.expect($elements.length + 1);

    return weave
      .call($elements, "mu-widget", load)
      .done(function () {
        assert.ok(true, "done called");
      });
  });
});