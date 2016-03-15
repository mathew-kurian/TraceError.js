export default class TraceError extends Error {
  constructor(message, ...causes) {
    super(message);

    const stack = Object.getOwnPropertyDescriptor(this, 'stack');

    Object.defineProperty(this, 'stack', {
      get: () => {
        const stacktrace = this.customFormat || this.customFormat2 || stack.get.call(this);
        let causeStacktrace = '';

        for (const cause of causes) {
          if (cause.customFormat) { // trigger lookup
            causeStacktrace += `\n${cause.customFormat}`;
          } else if (cause.customFormat2) {
            causeStacktrace += `\n${cause.customFormat2}`;
          } else if (cause instanceof Error) {
            causeStacktrace += `\n${cause.stack}`;
          } else {
            try {
              const json = JSON.stringify(cause, null, 2);
              causeStacktrace += `\n${json}`;
            } catch (e) {
              causeStacktrace += `\n${cause}`;
              // ignore
            }
          }
        }

        causeStacktrace = causeStacktrace.split('\n').join('\n    ');

        return stacktrace + causeStacktrace;
      }
    });

    // access first error
    Object.defineProperty(this, 'cause', {value: () => causes[0], enumerable: false, writable: false});

    // untested; access cause stack with error.causes()
    Object.defineProperty(this, 'causes', {value: () => causes, enumerable: false, writable: false});
  }
}