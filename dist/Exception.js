"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-names");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

var _weakmap = _interopRequireDefault(require("weakmap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var privates = new _weakmap.default();

var Exception =
/*#__PURE__*/
function () {
  _createClass(Exception, [{
    key: "get",
    // TEMP for extending the base class via Exception.prototype - unsafe procedure
    // marked for deprecation
    value: function get(key) {
      return this.getHiddenProperty('error')[key];
    } // marked for deprecation

  }, {
    key: "set",
    value: function set(key, value) {
      this.getHiddenProperty('error')[key] = value;
    }
  }, {
    key: "defineHiddenProperty",
    value: function defineHiddenProperty(key, value) {
      var pr = privates.has(this) ? privates.get(this) : {};
      pr[key] = value;
      privates.set(this, pr);
    }
  }, {
    key: "getHiddenProperty",
    value: function getHiddenProperty(key, def) {
      return privates.has(this) ? privates.get(this)[key] : def;
    }
  }, {
    key: "stack",
    get: function get() {
      return this.getHiddenProperty('error').stack;
    },
    set: function set(stack) {
      this.getHiddenProperty('error').stack = stack;
    }
  }, {
    key: "name",
    get: function get() {
      return this.getHiddenProperty('error').name;
    },
    set: function set(name) {
      this.getHiddenProperty('error').name = name;
    }
  }, {
    key: "message",
    get: function get() {
      return this.getHiddenProperty('error').message;
    },
    set: function set(message) {
      this.getHiddenProperty('error').message = message;
    }
  }]);

  function Exception() {
    _classCallCheck(this, Exception);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var error = _construct(Error, args);

    error.name = this.constructor.name;
    this.defineHiddenProperty('error', error);
  }

  _createClass(Exception, [{
    key: "toJSON",
    value: function toJSON() {
      if (!Exception.searchPrototype) {
        return {
          stack: this.stack,
          message: this.message,
          name: this.name
        };
      }

      var json = {};
      var currProto = this;
      var chain = [currProto];

      while (currProto = Object.getPrototypeOf(currProto)) {
        chain.push(currProto);
      }

      for (var _i = 0, _chain = chain; _i < _chain.length; _i++) {
        var proto = _chain[_i];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Object.getOwnPropertyNames(proto)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;
            if (json.hasOwnProperty(key)) continue;
            var desc = Object.getOwnPropertyDescriptor(proto, key);

            if (desc) {
              var value = desc.get ? desc.get.call(this) : desc.value;

              if (proto.isPrototypeOf(value)) {
                continue;
              }

              if (typeof value !== 'function') {
                json[key] = value;
              }
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return json;
    }
  }]);

  return Exception;
}();

_defineProperty(Exception, "searchPrototype", false);

Object.setPrototypeOf(Exception.prototype, Error.prototype);
module.exports = Exception;