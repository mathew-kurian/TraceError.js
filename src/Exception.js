import WeakMap from 'weakmap';

const privates = new WeakMap();

class Exception {
  static searchPrototype = false;

  get stack() {
    return this.getHiddenProperty('error').stack;
  }

  set stack(stack) {
    this.getHiddenProperty('error').stack = stack;
  }

  get name() {
    return this.getHiddenProperty('error').name;
  }

  set name(name) {
    this.getHiddenProperty('error').name = name;
  }

  get message() {
    return this.getHiddenProperty('error').message;
  }

  set message(message) {
    this.getHiddenProperty('error').message = message;
  }

  // TEMP for extending the base class via Exception.prototype - unsafe procedure
  // marked for deprecation
  get(key) {
    return this.getHiddenProperty('error')[key];
  }

  // marked for deprecation
  set(key, value) {
    this.getHiddenProperty('error')[key] = value;
  }

  defineHiddenProperty(key, value) {
    const pr = privates.has(this) ? privates.get(this) : {};
    pr[key] = value;
    privates.set(this, pr);
  }

  getHiddenProperty(key, def) {
    return privates.has(this) ? privates.get(this)[key] : def;
  }

  constructor(...args) {
    const error = new Error(...args);
    error.name = this.constructor.name;
    this.defineHiddenProperty('error', error);
  }

  toJSON() {
    if (!Exception.searchPrototype) {
      return {stack: this.stack, message: this.message, name: this.name};
    }

    const json = {};
    let currProto = this;
    const chain = [currProto];

    while (currProto = Object.getPrototypeOf(currProto)) {
      chain.push(currProto);
    }

    for (const proto of chain) {
      for (const key of Object.getOwnPropertyNames(proto)) {
        if (json.hasOwnProperty(key)) continue;
        const desc = Object.getOwnPropertyDescriptor(proto, key);
        if (desc) {
          const value = desc.get ? desc.get.call(this) : desc.value;

          if (proto.isPrototypeOf(value)) {
            continue;
          }

          if (typeof value !== 'function') {
            json[key] = value;
          }
        }
      }
    }

    return json;
  }
}

Object.setPrototypeOf(Exception.prototype, Error.prototype);

module.exports = Exception;
