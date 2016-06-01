'use strict'

let mocha = require('mocha')
let chai = require('chai')
let _ = require('lodash')
let expect = chai.expect

let Holdem = require('../lib/holdem')
let Cards = require('../lib/cards')

describe('Holdem', function () {
  var holdem = null;
  var cards = null;
  before(function(){
    holdem = new Holdem();
    cards = new Cards()
  })

  it('is constructable', function (done) {
    expect(holdem).to.be.an('object')
    done()
  })

  it('accepts two hold cards', function(done) {
    var holdCardsCount = 2
    holdem.holdCards(cards.deal(holdCardsCount))
    expect(holdem.hand.length).to.be.equal(holdCardsCount)
    done()
  })

  it('discards any extra cards dealt', function () {
    holdem.holdCards(cards.deal(5))
    expect(holdem.hand.length).to.be.equal(2)
  })

  it('accepts three community cards', function() {
    holdem.communityCards(cards.deal(3))
    expect(holdem.hand.length).to.be.equal(5)
  })

  it('discards any extra cards dealt in community', function () {
    holdem = new Holdem()
    holdem.holdCards(cards.deal(5))
    holdem.communityCards(cards.deal(5))
    expect(holdem.hand.length).to.be.equal(5)
  })
})

