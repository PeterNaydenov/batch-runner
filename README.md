# Batch Runner (@peter.naydenov/batch-runner)

![version](https://img.shields.io/github/package-json/v/peterNaydenov/batch-runner)
![GitHub License](https://img.shields.io/github/license/peterNaydenov/batch-runner)
![GitHub issues](https://img.shields.io/github/issues-raw/peterNaydenov/batch-runner)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/%40peter.naydenov%2Fbatch-runner)

## Description

Execute a batch job with a simple call. Batch itself contains a name, source of data and a job to be executed. Batch runner will execute the job for each item in the source.

Source is a function that returns an array of items. Source function will be executed on each job run request so the source can be dynamic. Each item will be passed to the job function.

In job run request you can provide extra data parameters that will be passed to the job function as well after the item from the source.

## Installation
Here is how to install the library:
```
npm i @peter.naydenov/batch-runner
```



## Methods
Library has only two methods:
```js
  define : 'define a batch'
, run   : 'run a batch'
```



## Definition of Batch
    
```js
batch.define ( {
      name   : 'string. Name of the batch'
    , source : 'function. Should return a source of data for the job'
    , job    : 'job to be executed'
```



## How to use
Simplified example:
```js
import batchRunner from '@peter.naydenov/batch-runner'

const batch = batchRunner();
batch.define ({
                      name   : 'myBatch'
                    , source : () => [1, 2, 3]
                    , job    : (item,x) => console.log(item,x)
            });

batch.run ( 'myBatch', 'extra') // Extra parameter will be passed to the job function
// -> 1,extra
// -> 2,extra
// -> 3,extra
// Number of extra parameters is not limited
```




## Links
- [History of changes](https://github.com/PeterNaydenov/batch-runner/blob/main/Changelog.md)

## Credits
'@peter.naydenov/dom-selector' was created and supported by Peter Naydenov.



## License
'@peter.naydenov/dom-selector' is released under the [MIT License](http://opensource.org/licenses/MIT).