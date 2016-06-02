'use strict'

let mocha = require('mocha')
let chai = require('chai')
let _ = require('lodash')
var expect = chai.expect

let Cards = require('../lib/cards')
let HandRank = require('../lib/rank')

describe('Hand Ranks', function () {
  it('requires at least two hands', function (){
    expect(() => new HandRank([])).to.throw(Error)
  })

  it('stores hands in property', function (){
    var cards = new Cards()
    cards.shuffle()
    var hands = _.times(5, () => { return cards.deal(5) })
    var handRank = new HandRank(hands)
    expect(handRank.hands.length).to.equal(5)
  })

  it('detect a flush', function () {
    var cards = new Cards()
    cards.shuffle()
    var hands = _.times(2, () => { return cards.deal(5) })
    //override the first hand and set to a flush
    hands[0] = ['H5', 'HQ', 'H2', 'H7', 'H9']
    var handRank = new HandRank(hands)
    expect(handRank._isFlush(handRank.hands[0])).to.be.true
  })

  it('detect a straight', function () {
    var cards = new Cards()
    cards.shuffle()
    var hands = _.times(2, () => { return cards.deal(5) })
    //override the first hand and make a straight
    hands[0] = ['HK', 'HA', 'HQ', 'HJ', 'HT']
    var handRank = new HandRank(hands)
    expect(handRank._isStraight(handRank.hands[0])).to.be.true
  })

})

