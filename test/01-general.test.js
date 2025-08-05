'use strict'

import { expect } from "chai"
import batchRunner from "../src/main.js"
import { JSDOM } from 'jsdom'

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
                expect ( x.length ).to.be.equal ( 0 )
    }) // it call a non-existing batch


it ( 'Define and run a batch', done => {
                const batch = batchRunner ();
                let run = false
                batch.define ({
                          name: 'test-batch'
                        , source: () => [ 1, 2, 3 ]
                        , job: ( {item}, next ) => {
                                        run = true
                                        expect ( item ).to.be.a ( 'number' )
                                        expect ( next ).to.be.a ( 'function' )
                                    }
                    })
                function next () { 
                        expect ( run ).to.be.true 

                    }
                batch.run ( 'test-batch', next )
                next ()
                done ()
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
                            , job: ({item}) => {
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
                            , job: ({item}) => {
                                            counter++
                                            expect ( item ).to.be.a ( 'number' )
                                        }
                        })
                batch.run ( 'test-batch' )
                expect ( counter ).to.be.equal ( 1 )
    }) // it Data as a single item



it ( 'Data as a single string', () => {
                const batch = batchRunner ();
                let counter = 0;
                function source () {
                        return 'tada'
                    }
                batch.define ({
                              name: 'test-batch'
                            , source
                            , job: ({item}) => {
                                            counter++
                                            expect ( item ).to.be.equal ( 'tada' )
                                        }
                        })
                batch.run ( 'test-batch' )
                expect ( counter ).to.be.equal ( 1 )
    }) // it Data as a single string



it ( 'Source function with extra params', () => {
                const batch = batchRunner ();
                function source () {
                            return [ ...arguments ]
                    }
                batch.define ({
                                  name: "test-batch"
                                , source
                                , job : ({item}) => item
                        })
                // Arguments 1, 2, 3 are passed to job function but also to source function
                const r = batch.run ( 'test-batch', 1, 2, 3 )
                expect ( r ).to.be.deep.equal ( [ 1, 2, 3 ] )
}) // it Source function with extra params


    
it ( 'Set and execute a batch in the same call', () => {
                const batch = batchRunner ();
                let counter = 0;
                function source () {
                        return 1
                    }
                batch.run ({
                              name: 'test-batch'
                            , source
                            , job: ({item}) => {
                                            counter++
                                            expect ( item ).to.be.a ( 'number' )
                                        }
                        })
                expect ( counter ).to.be.equal ( 1 )
    }) // it Set and execute a batch in the same call


 it ( 'Optional source function', () => {
                const batch = batchRunner ();
                let counter = 0;
                batch.define ({
                              name: 'test-batch'
                            , job: ({item}) => {
                                            counter++
                                            expect ( item ).to.be.a ( 'undefined' )
                                        }
                        })
                batch.run ( 'test-batch' )

                expect ( counter ).to.be.equal ( 1 )
    }) // it Optional source function


 it ( 'Cover a browser case', () => {
                // Mock browser environment
                const gDOM = new JSDOM ()
                global.window = gDOM.window
                global.HTMLCollection = gDOM.window.HTMLCollection
                global.NodeList = gDOM.window.NodeList

                const batch = batchRunner ();
                function source () {
                        return 1
                    }
                batch.define ({
                              name: 'test-batch'
                            , source
                            , job: ({item}) => {
                                            expect ( item ).to.be.a ( 'number' )
                                            return item
                                        }
                        })
                const r = batch.run ( 'test-batch' )
                expect ( r ).to.be.deep.equal ( [ 1 ] )
    })



it ( 'Limit the results', () => {
                const batch = batchRunner ();
                function source () {
                        return [ 22, 43, 55, 66, 77, 88, 99 ]
                    }
                const r = batch.run ({
                                          name: 'test-batch'
                                        , source
                                        , job: ({item,i,END}) => {
                                                        return i < 2 ? item : END
                                                    }
                                });
                expect ( r.length ).to.be.equal ( 2 )
}) // it Limit the results

}) // describe