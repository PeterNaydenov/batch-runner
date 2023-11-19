'use strict'

/*
     batch-runner
    ============

    History Notes:
    - Idea was born on 2023-11-12
    - First implementation on 2023-11-19
    
 */



function batchRunner () {

    const store = new Map();



    function define ( batch ) {
                const { name, source, job } = batch;
                if ( typeof name   !== 'string'   )   return false
                if ( typeof source !== 'function' )   return false
                if ( typeof job    !== 'function' )   return false
                store.set( name, batch )
        } // define func.



    function run ( name, ...args ) {

        if ( typeof name !== 'string') {   // When we want to register a new batch and run it with the same call
                    const { name:newName } = name;
                    define ( name )
                    name = newName
            }

        const record = store.get( name );
        if ( record == null ) return false

        const { source, job } = record;
        let data = source ();

        return ( data.length )
                        ?  data.map ( item => job ( item, ...args )) 
                        :  [data].map ( item => job ( item, ...args ))
    } // run func.

    // Batch runner API
    return {
              define
            , run
        }
} // batch-runner func.



export default batchRunner


