'use strict'

import { expect, describe, it } from 'vitest'
import batchRunner from '../src/main.js'


describe ( 'batch-runner', () => {

it ( 'init', () => {
                const batch = batchRunner ()
                expect ( batch ).to.be.an ( 'object' )
                expect ( batch.define ).to.be.a ( 'function' )
                expect ( batch.run ).to.be.a ( 'function' )
   }) // it init


it ( 'call a non-existing batch', () => {
                const batch = batchRunner ()
                const x = batch.run ( 'non-existing-batch' )
                expect ( x ).to.be.deep.equal ( [] )
    }) // it call a non-existing batch


it ( 'Define and run a batch', () => {
                const batch = batchRunner ()
                const received = []
                batch.define ({
                          name: 'test-batch'
                        , source: () => [ 1, 2, 3 ]
                        , job: ( {item}, ...args ) => {
                                        received.push ( { item, args } )
                                    }
                    })
                batch.run ( 'test-batch', 'a', 'b' )
                expect ( received ).to.have.length ( 3 )
                expect ( received[0].item ).to.be.equal ( 1 )
                expect ( received[0].args ).to.be.deep.equal ( [ 'a', 'b' ] )
                expect ( received[2].item ).to.be.equal ( 3 )
    }) // it Define and run a batch



it ( 'Data from a function', () => {
                const batch = batchRunner ()
                let counter = 0
                batch.define ({
                              name: 'test-batch'
                            , source: () => [ 1, 2, 3 ]
                            , job: ({item}) => {
                                            counter++
                                            expect ( item ).to.be.a ( 'number' )
                                        }
                        })
                batch.run ( 'test-batch' )
                expect ( counter ).to.be.equal ( 3 )
    }) // it Data from a function



it ( 'Data as a single item', () => {
                const batch = batchRunner ()
                let counter = 0
                batch.define ({
                              name: 'test-batch'
                            , source: () => 1
                            , job: ({item}) => {
                                            counter++
                                            expect ( item ).to.be.a ( 'number' )
                                        }
                        })
                batch.run ( 'test-batch' )
                expect ( counter ).to.be.equal ( 1 )
    }) // it Data as a single item



it ( 'Data as a single string', () => {
                const batch = batchRunner ()
                let counter = 0
                batch.define ({
                              name: 'test-batch'
                            , source: () => 'tada'
                            , job: ({item}) => {
                                            counter++
                                            expect ( item ).to.be.equal ( 'tada' )
                                        }
                        })
                batch.run ( 'test-batch' )
                expect ( counter ).to.be.equal ( 1 )
    }) // it Data as a single string



it ( 'Data as null does not crash', () => {
                // Regression: source returning null used to throw on data.hasOwnProperty('length')
                const batch = batchRunner ()
                batch.define ({
                              name: 'test-batch'
                            , source: () => null
                            , job: ({item}) => item
                        })
                const r = batch.run ( 'test-batch' )
                expect ( r ).to.be.deep.equal ( [ null ] )
    }) // it Data as null does not crash



it ( 'Data as a function does not crash', () => {
                // Regression: source returning a function used to throw on data.entries()
                const batch = batchRunner ()
                const fn = () => 42
                batch.define ({
                              name: 'test-batch'
                            , source: () => fn
                            , job: ({item}) => item
                        })
                const r = batch.run ( 'test-batch' )
                expect ( r ).to.be.deep.equal ( [ fn ] )
    }) // it Data as a function does not crash



it ( 'Data as an array-like object (HTMLCollection shape) does not crash', () => {
                // Regression: anything with .length but no .entries() used to throw
                const fakeCollection = { length: 2, 0: 'a', 1: 'b' }
                const batch = batchRunner ()
                batch.define ({
                              name: 'test-batch'
                            , source: () => fakeCollection
                            , job: ({item}) => item
                        })
                const r = batch.run ( 'test-batch' )
                expect ( r ).to.be.deep.equal ( [ fakeCollection ] )
    }) // it Data as an array-like object does not crash



it ( 'Source function with extra params', () => {
                const batch = batchRunner ()
                batch.define ({
                                  name: 'test-batch'
                                , source: function () { return [ ...arguments ] }
                                , job: ({item}) => item
                        })
                // Arguments 1, 2, 3 are passed to job function but also to source function
                const r = batch.run ( 'test-batch', 1, 2, 3 )
                expect ( r ).to.be.deep.equal ( [ 1, 2, 3 ] )
    }) // it Source function with extra params



it ( 'Set and execute a batch in the same call', () => {
                const batch = batchRunner ()
                let counter = 0
                batch.run ({
                              name: 'test-batch'
                            , source: () => 1
                            , job: ({item}) => {
                                            counter++
                                            expect ( item ).to.be.a ( 'number' )
                                        }
                        })
                expect ( counter ).to.be.equal ( 1 )
    }) // it Set and execute a batch in the same call



it ( 'Combined define+run throws on invalid batch', () => {
                // Regression: bad input was silently returning [] with no warning
                const batch = batchRunner ()
                expect ( () => batch.run ({ name: 'bad', job: 'not a function' }) ).to.throw ()
    }) // it Combined define+run throws on invalid batch



 it ( 'Optional source function', () => {
                const batch = batchRunner ()
                let counter = 0
                batch.define ({
                              name: 'test-batch'
                            , job: ({item}) => {
                                            counter++
                                            expect ( item ).to.be.a ( 'undefined' )
                                            return item
                                        }
                        })
                const r = batch.run ( 'test-batch' )
                expect ( counter ).to.be.equal ( 1 )
                expect ( r ).to.be.deep.equal ( [ undefined ] )
    }) // it Optional source function



 it ( 'define() rejects non-object input gracefully', () => {
                // Regression: passing null/undefined to define used to throw on destructure
                const batch = batchRunner ()
                expect ( batch.define ( null ) ).to.be.false
                expect ( batch.define ( undefined ) ).to.be.false
                expect ( batch.define ( 'not an object' ) ).to.be.false
                expect ( batch.define ( 42 ) ).to.be.false
    }) // it define() rejects non-object input gracefully



it ( 'Limit the results', () => {
                const batch = batchRunner ()
                batch.define ({
                                          name: 'test-batch'
                                        , source: () => [ 22, 43, 55, 66, 77, 88, 99 ]
                                        , job: ({item,i,END}) => i < 2 ? item : END
                                })
                const r = batch.run ( 'test-batch' )
                expect ( r.length ).to.be.equal ( 2 )
                expect ( r ).to.be.deep.equal ( [ 22, 43 ] )
}) // it Limit the results



it ( 'final', () => {
                const batch = batchRunner ()
                batch.define ({
                                          name: 'test-batch'
                                        , source: () => [ 22, 43, 55, 66, 77, 88, 99 ]
                                        , job: ({item,i,END}) => i < 2 ? item : END
                                        , final: ( result ) => result.reduce ( ( acc, item ) => acc + item, 0 )
                                })
                const r = batch.run ( 'test-batch' )
                expect ( r ).to.be.equal ( 65 )
}) // it final



it ( 'final can return any value (including null/undefined)', () => {
                // Confirm the user can intentionally return null/undefined from final
                const batch = batchRunner ()
                batch.define ({
                              name: 'null-final'
                            , source: () => [ 1, 2, 3 ]
                            , job: ({item}) => item
                            , final: () => null
                        })
                expect ( batch.run ( 'null-final' ) ).to.be.null

                batch.define ({
                              name: 'undef-final'
                            , source: () => [ 1, 2, 3 ]
                            , job: ({item}) => item
                            , final: () => undefined
                        })
                expect ( batch.run ( 'undef-final' ) ).to.be.undefined
    }) // it final can return any value

}) // describe
