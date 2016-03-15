'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TraceError = function (_Error) {
  _inherits(TraceError, _Error);

  function TraceError(message) {
    for (var _len = arguments.length, causes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      causes[_key - 1] = arguments[_key];
    }

    _classCallCheck(this, TraceError);

    var _this = _possibleConstructorReturn(this, _Error.call(this, message));

    var stack = Object.getOwnPropertyDescriptor(_this, 'stack');

    Object.defineProperty(_this, 'stack', {
      get: function get() {
        var stacktrace = _this.customFormat || _this.customFormat2 || stack.get.call(_this);
        var causeStacktrace = '';

        for (var _iterator = causes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var cause = _ref;

          if (cause.customFormat) {
            // trigger lookup
            causeStacktrace += '\n' + cause.customFormat;
          } else if (cause.customFormat2) {
            causeStacktrace += '\n' + cause.customFormat2;
          } else if (cause instanceof Error) {
            causeStacktrace += '\n' + cause.stack;
          } else {
            try {
              var json = JSON.stringify(cause, null, 2);
              causeStacktrace += '\n' + json;
            } catch (e) {
              causeStacktrace += '\n' + cause;
              // ignore
            }
          }
        }

        causeStacktrace = causeStacktrace.split('\n').join('\n    ');

        return stacktrace + causeStacktrace;
      }
    });

    // access first error
    Object.defineProperty(_this, 'cause', { value: function value() {
        return causes[0];
      }, enumerable: false, writable: false });

    // untested; access cause stack with error.causes()
    Object.defineProperty(_this, 'causes', { value: function value() {
        return causes;
      }, enumerable: false, writable: false });
    return _this;
  }

  return TraceError;
}(Error);

exports.default = TraceError;
