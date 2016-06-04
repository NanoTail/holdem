'use strict'

let _ = require('lodash')
let mocha = require('mocha')
let chai = require('chai')
let expect = chai.expect

let Hand = require('../lib/hand')

describe('Hand object', function() {
  var cards = ['C5','S3','HT','SA','S4']
  var hand = null
  beforeEach(function() {
    hand = new Hand(cards)
  })

  it('accepts an array of cards', function () {
    expect(hand.cards).to.eql(cards)
  })

  it('returns value of face cards', function () {
    expect(hand._faceValue('5')).to.equal(5)
    expect(hand._faceValue('T')).to.equal(10)
    expect(hand._faceValue('J')).to.equal(11)
    expect(hand._faceValue('Q')).to.equal(12)
    expect(hand._faceValue('K')).to.equal(13)
    expect(hand._faceValue('A')).to.equal(14)
  })
})
