'use strict'

import { expect }   from "chai"
import domSelector  from "@peter.naydenov/dom-selector"
import batchRunner  from "../src/main.js"
import VisualController from '@peter.naydenov/visual-controller-for-vue3'

import Example1 from "./components/vue-example-01.vue"

const html = new VisualController ();


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


it ( 'Define and run a batch', () => {
        const batch = batchRunner ();
        let count = 0;

        batch.define ({
                  name: 'test-batch'
                , source: () => [ 1, 2, 3 ]
                , job: ( {item}, next ) => {
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



it ( 'Navigation example', done => {
        cy.viewport ( 800, 600 )

        const d = document.querySelector ( '[data-cy-root]' );
        d.id = 'app'

        
        // cy.wait ( 0 )
        html.publish ( Example1, {}, 'app' )

        const dom = domSelector ();

        dom.define ({ // Scan the DOM from the element with class 'list' and select all <a> elements
                          name: 'list'
                        , selector: () => d.getElementsByClassName ( 'list' )
                        , direction: 'down'
                        , where : ({item}) => (item.nodeName === 'A')? item : null
                })
        const batch = batchRunner ();
        batch.define ({ // Update the active item job
                          name: 'clean-selection'
                        , source: () => dom.run ( 'list' )
                        , job: ({item,i,END}) => item.classList.remove ( 'active' )
                })
        cy.wait ( 0 )
          .then ( () => {
                        const ls = dom.run ( 'list' )
                        ls.forEach ( el => el.addEventListener ( 'click', e => {
                                                        e.preventDefault ()
                                                        batch.run ( 'clean-selection' )
                                                        e.target.classList.add ( 'active' )
                                                })
                                )
                        ls[0].click ()
                        return ls
                })
          .then ( ls => {
                        expect ( ls[0].classList.contains ( 'active' )).to.be.true
                        done ()
                })
}) // it Navigation example



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