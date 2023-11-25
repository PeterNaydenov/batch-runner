# Migration Guides


## From 1.x.x to 2.x.x
Method `run()` was changed. Now first argument is an object `{item,i,END }`, where `item` is the current item, `i` is the current source index, `END` is constant. If you want to stop data iteration you should return the `END` constant.

```js
// Version 1.x.x
run : function ( item, ...args ) {
                    // ...
            }
// Version 2.x.x
run : function ({item,i,END}, ...args) {
                    // ...
            }

// if you had
run: ( item => doSomething(item) )
// should be
run: ( ({item}) => doSomething(item) )
// add curly braces around the item
```