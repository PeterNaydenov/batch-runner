# Batch Runner (@peter.naydenov/batch-runner)

![version](https://img.shields.io/github/package-json/v/peterNaydenov/batch-runner)
![GitHub License](https://img.shields.io/github/license/peterNaydenov/batch-runner)
![GitHub issues](https://img.shields.io/github/issues-raw/peterNaydenov/batch-runner)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/%40peter.naydenov%2Fbatch-runner)



## Description

Execute a batch job with a simple call. A batch contains a name, a source of data and a job to be executed. Batch runner will execute the job for each item provided by the source.

The source is a function that returns the data to iterate over. The source function is executed on every `run()` call, so the data can be dynamic. Any non-array return value (single item, primitive, `null`, etc.) is automatically wrapped in a single-item array.

Each item is passed to the job function. Extra arguments given to `run()` are forwarded to the `source`, the `job`, and the `final` function.

Library `batch-runner` is framework-agnostic. No runtime dependencies.



## Installation
```
npm i @peter.naydenov/batch-runner
```



## Methods
Library has only two methods:
```js
  define : 'define a batch'
, run    : 'run a batch'
```



## Definition of Batch

```js
batch.define ( {
      name   : 'string. Name of the batch'
    , source : 'function (optional). Should return a source of data for the job'
    , job    : 'job to be executed'
    , final  : 'function (optional). Final refinement of the results (since version 2.4.0)'
} )
```

`source`, `job` and `final` are functions. `source` and `final` are optional. `name` must be a string. `define` returns `true` on success and `false` if any of the required fields are missing or of the wrong type.



## How to use
Simplified example:
```js
import batchRunner from '@peter.naydenov/batch-runner'

const batch = batchRunner ();   // Creates a batch repository
batch.define ({
                      name   : 'myBatch'
                    , source : () => [1, 2, 3]
                    , job    : ({item,i,END},x) => console.log(`${item},${x}`)
            });

batch.run ( 'myBatch', 'extra' ) // Extra parameter will be passed to the job function
// -> 1,extra
// -> 2,extra
// -> 3,extra
// Number of extra parameters is not limited
```

The same extra arguments are also passed to the `source` and the `final` function, in that order: `source(...args)`, then `job({item, i, END}, ...args)`, then `final(result, ...args)`.

Job definition first argument is an object `{item, i, END}`, where `item` is the current item, `i` is the current source index, and `END` is a constant. To stop further function invocations, return the `END` constant.
Example:
```js
batch.define ({
                      name   : 'myBatch'
                    , source : () => [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
                    , job    : ({item,i,END},x) => {
                                    return ( i < 2 ) ? item : END
                                  }
            });
let r = batch.run ( 'myBatch' )
// r -> [1,2]
```

By default, `run()` returns an array of the accumulated job results. Provide a `final` function to reshape or refine the result.
```js
batch.define ({
                      name   : 'myBatch'
                    , source : () => [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
                    , job    : ({item,i,END},x) => {
                                    return ( i < 2 ) ? item : END
                                  }
                    , final  : ( result ) => result.reduce ( (acc,item) => acc = acc + item, 0 )  // result argument is [1,2]
                                          // convert array to sum of its items
            });
let r = batch.run ( 'myBatch' )
// r -> 3
```

A `final` function can return any value (including `null` or `undefined`); the runner returns it as-is. If no `final` is provided, the raw results array is returned.

If `source` is omitted, the job is executed once with `item === undefined`.



## Links
- [History of changes](https://github.com/PeterNaydenov/batch-runner/blob/main/Changelog.md)
- [Migration Guides](https://github.com/PeterNaydenov/batch-runner/blob/main/Migration.guide.md)



## Credits
'@peter.naydenov/batch-runner' was created and supported by Peter Naydenov.



## License
'@peter.naydenov/batch-runner' is released under the [MIT License](http://opensource.org/licenses/MIT).
