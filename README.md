# TraceError
[![Build Status](https://travis-ci.org/bluejamesbond/TraceError.js.svg?branch=master)](https://travis-ci.org/bluejamesbond/TraceError.js)

```bash
npm install trace-error --save
```

```js
import TraceError from 'trace-error';

global.TraceError = TraceError; // expose globally (optional)

throw new TraceError('Could not set status', srcError, ...otherErrors);
```

## Output
  
![](https://www.dropbox.com/s/gbfoh4sr9p24hsg/Screenshot%202016-03-01%2022.26.27.png?dl=1)    

## Functions

```js
TraceError#cause - first error
TraceError#causes - list of chained errors
```