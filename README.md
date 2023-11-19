# Batch Runner (@peter.naydenov/batch-runner)

## Description

Execute a batch job with a simple call.

## Methods

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