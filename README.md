# TraceError
[![Build Status](https://travis-ci.org/mathew-kurian/TraceError.js.svg?branch=master)](https://travis-ci.org/bluejamesbond/TraceError.js)

```bash
npm install trace-error --save
```

```js
import TraceError from 'trace-error';

global.TraceError = TraceError; // expose globally (optional)

(async () => {
  try {
    await fetch('google.com');
  } catch(e) {
    console.error(new TraceError('Failed to fetch content', e));
  }
})();
```

### Output 
```bash
TraceError: Failed to fetch content
    at _construct (.../TraceError.js/dist/Exception.js:35:393)
    at TraceError.Exception (.../TraceError.js/dist/Exception.js:110:17)
    at new TraceError (.../TraceError.js/dist/TraceError.js:186:74)
    at .../TraceError.js/tests/throw-test.js:159:19
    at Object.<anonymous> (.../TraceError.js/tests/throw-test.js:161:3)
    ReferenceError: fetch is not defined
        at .../TraceError.js/tests/throw-test.js:157:5
        at Object.<anonymous> (.../TraceError.js/tests/throw-test.js:161:3)
        at Module._compile (internal/modules/cjs/loader.js:689:30)
        at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
        at Module.load (internal/modules/cjs/loader.js:599:32)
```

#### Compatibility
Node >= 4.0; not tested on browsers

## Functions

#### `TraceError#cause(index = 0)`
Get the cause at the specified `index`

#### `TraceError#causes()`
Get a list of all the causes

#### `TraceError@stack`
Get the long stack (base error with chained cause errors)

#### `TraceError@messages`
Get a list of all the messages

#### `static TraceError@globalStackProperty`
Attribute used to aggregate the long stack. Can be further customized via. inheritance and/or prototype modification

#### `static TraceError@indent`
Spaces used to indent long stack

## More Detailed Examples

More detailed examples are in the `/tests` folder

### ES5/6 Cross-compatibility
Extend the TraceError as such in order to maximize compatibility with ES5; additionally, override the `toJSON` as necessary

```js
export class MyAppTraceError extends TraceError {
  constructor(...args) {
    super(...args);

    // not ideal
    Object.defineProperty(this, 'stack', {
      get: () => super.stack
    });
  }
}
```