'use strict'

/*
     batch-runner
    ============

    History Notes:
    - Idea was born on 2023-11-12
    - First implementation on 2023-11-19
    
 */


/**
 * @typedef {Object} Batch
 * @property {string} name - Batch name
 * @property {function} [source] - Optional. Source of data. 
 * @property {function} job - Job to run on each data item
 * @property {function} [final] - Optional. Final job
 */


function batchRunner () {

    const 
          store = new Map()
        , MISSING = Symbol ( 'missing' )
        ;


    /**
     * @function define
     * @description Define a batch
     * @param {Batch} batch - Batch definition
     * @returns {boolean} - true if batch was defined, false otherwise
     */
    function define ( batch ) {
                let { name, source, job, final } = batch;
                if ( source == null )   source = () => MISSING   // Job will be executed once with data === undefined
                if ( final == null  )   final = ()  => MISSING   // If no final job is defined, will return the accumulated result as an array
                if ( typeof name   !== 'string'   )   return false
                if ( typeof source !== 'function' )   return false
                if ( typeof job    !== 'function' )   return false
                if ( typeof final  !== 'function' )   return false
                store.set( name, { name, source, job, final })
                return true
        } // define func.


    /**
     * @function run
     * @description Run a batch over each of data items
     * @param {string} name - Batch name
     * @param {...*} [args] - Extra arguments passed to the job
     * @returns {Array} - Array of results
     */
    function run ( name, ...args ) {
        if ( typeof name !== 'string') {   // When we want to register a new batch and run it with the same call
                    const { name:newName } = name;
                    define ( name )
                    name = newName
            }

        const record = store.get( name );
        if ( record == null )   return []

        const 
              { source, job, final } = record
            , END = Symbol ( 'end___' )
            , result = []
            ;

        let data = source ( ...args||[]); // Call source with args or empty array if no args provided
        if ( data === MISSING )   data = [ undefined ]
        if ( 
               typeof data === 'undefined' 
            || !data.hasOwnProperty ( 'length' ) 
            || typeof data === 'string' 
          )   data = [data] // Ensure data is an array

        for ( let [k,v] of data.entries() ) {
                    let r = job ({item:v, i:k, END}, ...args )
                    if ( r === END )   break
                    result.push ( r )
            }
        const finalResult = final ( result, ...args )
        if ( finalResult !== MISSING )   return finalResult
        else                             return result
    } // run func.

    // Batch runner API
    return {
              define
            , run
        }
} // batch-runner func.



export default batchRunner


