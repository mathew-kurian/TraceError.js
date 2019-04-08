import Exception from './Exception';

class TraceError extends Exception {
  static indent = '    ';
  static globalStackProperty = 'stack';
  static Exception = Exception;

  serializeNonError(e) {
    try {
      return JSON.stringify(e, null, 2);
    } catch (e) {
      // ignore
    }

    return e;
  }

  resolveStackFromError(e) {
    return e === this && TraceError.globalStackProperty === 'stack' ?
      // use the parent stack to prevent stack overflow
      super.stack :
      // no need to check type since the fallback is the Error.prototype
      e[TraceError.globalStackProperty];
  }

  getLongStack() {
    const stacks = [];

    for (const cause of this.causes()) {
      if (cause instanceof TraceError) {
        stacks.push(cause.getLongStack())
      } else if (cause instanceof Error) {
        stacks.push(this.resolveStackFromError(cause));
      } else {
        stacks.push(this.serializeNonError(cause));
      }
    }

    const children = TraceError.indent + stacks.join('\n').split('\n').join('\n' + TraceError.indent);
    return (this.resolveStackFromError(this) + '\n' + children).trim();
  }

  get stack() {
    if (this.getHiddenProperty('useBase')) {
      return super.stack;
    }

    this.defineHiddenProperty('useBase', true);

    const stack = this.getLongStack();

    this.defineHiddenProperty('useBase', false);

    return stack;
  }

  messages() {
    let messages = [super.message];

    for (const cause of this.causes()) {
      if (cause instanceof TraceError) {
        messages = messages.concat(cause.messages());
      } else if (cause instanceof Error) {
        messages.push(cause.message);
      } else {
        messages.push(cause);
      }
    }

    return messages;
  }

  cause(index = 0) {
    return this.getHiddenProperty('causes', [])[index];
  }

  causes() {
    return this.getHiddenProperty('causes', []);
  }

  constructor(message, ...causes) {
    super(message);

    this.defineHiddenProperty('causes', causes);
  }
}

module.exports = TraceError;
