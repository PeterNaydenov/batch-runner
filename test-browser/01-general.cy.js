'use strict'

import { expect } from "chai"
import batchRunner  from "../src/main.js"


describe ( 'batch-runner', () => {



    it ( 'init', () => {
        const batch = batchRunner ();
        expect ( batch ).to.be.an ( 'object' )
        expect ( batch.define ).to.be.a ( 'function' )
        expect ( batch.run ).to.be.a ( 'function' )
}) // it init


it ( 'call a non-existing batch', () => {
        const batch = batchRunner ();
        const x = batch.run ( 'non-existing-batch' );
        expect ( x ).to.be.false
}) // it call a non-existing batch


it ( 'Define and run a batch', () => {
        const batch = batchRunner ();
        let count = 0;

        batch.define ({
                  name: 'test-batch'
                , source: () => [ 1, 2, 3 ]
                , job: ( item, next ) => {
                                count++
                                expect ( item ).to.be.a ( 'number' )
                                expect ( next ).to.be.a ( 'function' )
                            }
            })
        function next () { 
                expect ( run ).to.be.true 

            }
        batch.run ( 'test-batch', next )
        // setTimeout ( () => console.log ( count ), 3 )
        expect ( count ).to.be.equal ( 3 )
        // next ()
}) // it Define and run a batch



it ( 'Data from a function', () => {
        const batch = batchRunner ();
        let counter = 0;
        function source () {
                return [ 1, 2, 3 ]
            }

        batch.define ({
                      name: 'test-batch'
                    , source
                    , job: ( item ) => {
                                    counter++
                                    expect ( item ).to.be.a ( 'number' )
                                }
                })

        batch.run ( 'test-batch' )
        expect ( counter ).to.be.equal ( 3 )
}) // it Data from a function



it ( 'Data as a single item', () => {
        const batch = batchRunner ();
        let counter = 0;
        function source () {
                return 1
            }
        batch.define ({
                      name: 'test-batch'
                    , source
                    , job: ( item ) => {
                                    counter++
                                    expect ( item ).to.be.a ( 'number' )
                                }
                })
        batch.run ( 'test-batch' )
        expect ( counter ).to.be.equal ( 1 )
}) // it Data as a single item



it ( 'Set and execute a batch in the same call', () => {
        const batch = batchRunner ();
        let counter = 0;
        function source () {
                return 1
            }
        batch.run ({
                      name: 'test-batch'
                    , source
                    , job: ( item ) => {
                                    counter++
                                    expect ( item ).to.be.a ( 'number' )
                                }
                })
        expect ( counter ).to.be.equal ( 1 )
}) // it Set and execute a batch in the same call

    
}) // describe