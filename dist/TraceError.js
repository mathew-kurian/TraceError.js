"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.iterator");

var _Exception2 = _interopRequireDefault(require("./Exception"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TraceError =
/*#__PURE__*/
function (_Exception) {
  _inherits(TraceError, _Exception);

  _createClass(TraceError, [{
    key: "serializeNonError",
    value: function serializeNonError(e) {
      try {
        return JSON.stringify(e, null, 2);
      } catch (e) {// ignore
      }

      return e;
    }
  }, {
    key: "resolveStackFromError",
    value: function resolveStackFromError(e) {
      return e === this && TraceError.globalStackProperty === 'stack' ? // use the parent stack to prevent stack overflow
      _get(_getPrototypeOf(TraceError.prototype), "stack", this) : // no need to check type since the fallback is the Error.prototype
      e[TraceError.globalStackProperty];
    }
  }, {
    key: "getLongStack",
    value: function getLongStack() {
      var stacks = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.causes()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var cause = _step.value;

          if (cause instanceof TraceError) {
            stacks.push(cause.getLongStack());
          } else if (cause instanceof Error) {
            stacks.push(this.resolveStackFromError(cause));
          } else {
            stacks.push(this.serializeNonError(cause));
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

      var children = TraceError.indent + stacks.join('\n').split('\n').join('\n' + TraceError.indent);
      return (this.resolveStackFromError(this) + '\n' + children).trim();
    }
  }, {
    key: "messages",
    value: function messages() {
      var messages = [_get(_getPrototypeOf(TraceError.prototype), "message", this)];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.causes()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var cause = _step2.value;

          if (cause instanceof TraceError) {
            messages = messages.concat(cause.messages());
          } else if (cause instanceof Error) {
            messages.push(cause.message);
          } else {
            messages.push(cause);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return messages;
    }
  }, {
    key: "cause",
    value: function cause() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return this.getHiddenProperty('causes', [])[index];
    }
  }, {
    key: "causes",
    value: function causes() {
      return this.getHiddenProperty('causes', []);
    }
  }, {
    key: "stack",
    get: function get() {
      if (this.getHiddenProperty('useBase')) {
        return _get(_getPrototypeOf(TraceError.prototype), "stack", this);
      }

      this.defineHiddenProperty('useBase', true);
      var stack = this.getLongStack();
      this.defineHiddenProperty('useBase', false);
      return stack;
    }
  }]);

  function TraceError(message) {
    var _this;

    _classCallCheck(this, TraceError);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TraceError).call(this, message));

    for (var _len = arguments.length, causes = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      causes[_key - 1] = arguments[_key];
    }

    _this.defineHiddenProperty('causes', causes);

    return _this;
  }

  return TraceError;
}(_Exception2.default);

_defineProperty(TraceError, "indent", '    ');

_defineProperty(TraceError, "globalStackProperty", 'stack');

_defineProperty(TraceError, "Exception", _Exception2.default);

module.exports = TraceError;