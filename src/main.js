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
 * @property {function} [final] - Optional. Final refinement of the accumulated result
 */


const MISSING = Symbol ( 'missing' )   // Internal sentinel: source/final was not provided
const END     = Symbol ( 'end___' )    // Public sentinel: job returned END to stop iteration


function batchRunner () {

    const store = new Map()


    /**
     * @function define
     * @description Define a batch
     * @param {Batch|object} batch - Batch definition
     * @returns {boolean} - true if batch was defined, false otherwise
     */
    function define ( batch ) {
                if ( batch == null || typeof batch !== 'object' )   return false
                let { name, source, job, final } = batch
                if ( source == null )   source = () => MISSING    // Job will be executed once with item === undefined
                if ( final  == null )   final  = () => MISSING    // No final function -> return the accumulated result as an array
                if ( typeof name   !== 'string'   )   return false
                if ( typeof source !== 'function' )   return false
                if ( typeof job    !== 'function' )   return false
                if ( typeof final  !== 'function' )   return false
                store.set ( name, { name, source, job, final })
                return true
        } // define func.


    /**
     * @function run
     * @description Run a batch over each data item
     * @param {string|Batch} name - Batch name, or a batch definition (define + run in one call)
     * @param {...*} [args] - Extra arguments passed to source, job and final
     * @returns {*} - Whatever `final` returns; or the raw results array if no `final` was defined
     */
    function run ( name, ...args ) {
        if ( typeof name !== 'string' ) {   // Combined define+run path
                    if ( !define ( name ) )   throw new Error ( 'batch-runner: invalid batch definition' )
                    name = name.name
            }

        const record = store.get ( name )
        if ( record == null )   return []

        const 
              { source, job, final } = record
            , result = []
            ;

        let data = source ( ...args )
        if ( data === MISSING )   data = [ undefined ]
        if ( !Array.isArray ( data ) )   data = [ data ]   // Wrap any non-array (null, undefined, primitives, fns, objects) into a single-item array

        for ( let [i, item] of data.entries () ) {
                    let r = job ( { item, i, END }, ...args )
                    if ( r === END )   break
                    result.push ( r )
            }
        const finalResult = final ( result, ...args )
        return finalResult !== MISSING ? finalResult : result
    } // run func.

    // Batch runner API
    return {
              define
            , run
        }
} // batch-runner func.



export default batchRunner
