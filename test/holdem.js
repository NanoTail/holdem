'use strict'

let mocha = require('mocha')
let chai = require('chai')
let _ = require('lodash')
let expect = chai.expect

let Holdem = require('../lib/holdem')

describe('Holdem', function () {
  var holdem = null;
  before(function(){
    holdem = new Holdem();
  })

  it('is constructable', function (done) {
    expect(holdem).to.be.an('object')
    done()
  })

  it('accepts two hold cards', function(done) {
    holdem.holdCards(randomCards(2))
    expect(holdem.hand.length).to.be.equal(2)
    done()
  })

  it('discards any extra cards dealt', function () {
    holdem.holdCards(randomCards(5))
    expect(holdem.hand.length).to.be.equal(2)
  })

  it('accepts three community cards', function() {
    holdem.communityCards(randomCards(3))
    expect(holdem.hand.length).to.be.equal(5)
  })

  it('discards any extra cards dealt in community', function () {
    holdem = new Holdem()
    holdem.holdCards(randomCards(5))
    holdem.communityCards(randomCards(5))
    expect(holdem.hand.length).to.be.equal(5)
  })
})

describe('Helpers', function () {
  it('returns specified number of shuffled cards', function () {
    var firstDeal = randomCards(5)
    var secondDeal = randomCards(5)
    expect(firstDeal.length).to.equal(5)
    expect(secondDeal.length).to.equal(5)
    expect(firstDeal).not.to.equal(secondDeal)
  })
})

// Helpers
let cards = [
  'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK', 'HA',
  'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DJ', 'DQ', 'DK', 'DA',
  'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'SJ', 'SQ', 'SK', 'SA',
  'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK', 'CA',
]
function randomCards (count) {
  return _.take(_.shuffle(cards), count)
}
