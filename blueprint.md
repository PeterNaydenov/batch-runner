# DOM Spider

## Description
Remember selections of DOM elements and execute actions on them.
```js
const web = new Spider();

web.parent ( selectedNode, whereFn ).save ( name )
web.child ( selectedNode, whereFn ).save ( name )
// selector - beginning of the search
// scan - scan for all elements deeper of the selector
// walk - go searching from the selector - up and down
// where - filter function (optional)

function selectorFn ( helpers, node ) {
    helpers.parent( node )
}

function whereFind ( helpers, node ) {
    const {
              tag
            , getParent  // parent node
            , getSiblings
            , hasClass
            , hasChildren
            , hasText
            , hasTextLike
            , hasAttr
            , hasData
        } = helpers;

    const 
          res = getSiblings (node).map ( x => tag( 'li', x))
        , parent = getParent (node)
        ;

    // Do some checks on target node and if return
    return // array of booleans
        [
          tag ('div', node ) // function that returns boolean
        , hasClass ('myClass', parent, false ) // third parameter is inverts the result
        , res.every ( x => x )
        , hasData ({key, value}, node)
        , hasChildren ( node, false )
        ]
}
```

## Data
store - Map(store) where keys are 'savedNames' and value is array of DOM elements

```js
web.use('name').run ( Fn, where )
// Fn - function to execute on each element of the selection
// Where - filter test before execution (optional)


function run (store, api) {
return function run ( callback, where=null ) {
    const 
          name = api.getSelectedName()
        , hasWhere = where != null
        , rawLine = store.get(name)
        , ls = (rawLine typeof 'function') ? rawLine() : rawLine
        ;
    
    for ( let el of ls ) {
                // where returns an array of booleans [true, true, false]
                // execute callback only if all booleans are true
                if ( where(el).every(x=>x))   callback(el)
        }
}}
```

## Methods

```js
// selectors
  child  : 'scan the DOM for elements down'
, parent : 'find elements in the DOM up'
// storage
, save   : 'give a name to the current list of DOM elements'
, use    : 'use a list of DOM elements by name'
// run
, run    : 'execute a callback on the current list of DOM elements'
// extra
, setDependencies: 'set an array of external objects to be used in the where callback'
, getDependencies: 'take a look on external objects provided to the where callback'





const whereA = ( node, {tag}) = tag ('a', node )
// Find all <a> elements in the DOM at the moment of execution
web.save (
        'selectNavA', 
        () => web.child ( getElementById('nav'), whereA )  // It's a function that will be executed on demand
    ) 

// Find all <a> elements in the DOM once, use them later
web.save ( 
        'navA', 
        web.child ( getElementById('nav'), whereA ) // It's a static list of DOM elements
    )

web
  .use('navA')
  .run ( runFunction )

function runFunction (node, dependencies ) {
            // execute something on each element
    }

```












```js
// Client Interface for selecting DOM elements

select.define ({
    name: 'navA',
    selector: () => document.getElementById( 'nav' )
    direction: 'down'   // 'up' or 'down' - default 'down'
    where: (node, help) => {
                            const {tag} = help;
                            return tag('a', node )
                    }
        })

select.use ( 'navA' ).forEach ( node => {
                // do something with each node  
        })

for ( let node of select.use('navA') ) {
        // do something with each node
    }


batch.define ({
              name: 'updateNavLinks'
            , source: () => selector.use ( 'navA' )
            , job : (sourceData, ...args) => {
                                    const 
                                        [activeName] = args
                                        , text = node.innerText
                                        ;
                                    node.classList.remove('active')
                                    if ( text === activeName ) node.classList.add('active')
                            }
    })



batch.define ({
              name: 'renameText'
            , source: () => ([
                                  document.getElementById('title')
                                , document.getElementById('subtitle')
                            ])
            , job: (sourceData, ...args) => {
                                        const [text] = args;
                                        node.innerText = text
                                    }
})

batch.run ( 'updateNavLinks', 'Home' )  // Will set active class to the link with text 'Home'
batch.run ( 'renameText', 'New Title' ) // Will rename both title and subtitle

````