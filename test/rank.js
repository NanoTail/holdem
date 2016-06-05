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

  it('sets hand rank', function () {
    var cards = new Cards()
    cards.shuffle()
    var hands = _.times(5, () => { return cards.deal(5) })
    var handRank = new HandRank(hands)
    handRank._setRank(handRank.hands[0], 'Royal Flush')
    expect(handRank.hands[0].rank).to.equal(10)
  })

  /*it('finds highest card', function (){
    var cards = new Cards()
    cards.shuffle()
    var hands = _.times(2, () => { return cards.deal(5)})

    hands[0] = ['CK','CQ','D5','SA','HT']
    var handRank = new HandRank(hands)
    expect(
      handRank._highCard(handRank.hands[0]) 
    ).to.equal('A')
  })*/

  it('detects a flush', function () {
    var cards = new Cards()
    cards.shuffle()
    var hands = _.times(2, () => { return cards.deal(5) })
    //override the first hand and set to a flush
    hands[0] = ['H5', 'HQ', 'H2', 'H7', 'H9']
    hands[1] = ['H5', 'SQ', 'H2', 'H7', 'H9']
    var handRank = new HandRank(hands)
    expect(handRank._isFlush(handRank.hands[0])).to.be.true
    expect(handRank._isFlush(handRank.hands[1])).to.be.false
  })

  it('detects a straight', function () {
    var cards = new Cards()
    cards.shuffle()
    var hands = _.times(2, () => { return cards.deal(5) })
    //override the first hand and make a straight
    hands[0] = ['HK', 'HA', 'HQ', 'HJ', 'HT']
    var handRank = new HandRank(hands)
    expect(handRank._isStraight(handRank.hands[0])).to.be.true
  })

  it('detects a straight flush', function () {
    var cards = new Cards()
    cards.shuffle()
    var hands = _.times(2, () => { return cards.deal(5) })
    //override the first hand and make a straight
    hands[0] = ['H7', 'HJ', 'HT', 'H8', 'H9']
    hands[1] = ['H7', 'DJ', 'HT', 'H8', 'H9']
    var handRank = new HandRank(hands)
    expect(handRank._isStraightFlush(handRank.hands[0])).to.be.true
    //check false positive
    expect(handRank._isStraightFlush(handRank.hands[1])).to.be.false
  })

  it('detects a royal flush', function () {
    var cards = new Cards()
    cards.shuffle()
    var hands = _.times(2, () => { return cards.deal(5) })
    //override the first hand and make a straight
    hands[0] = ['HK', 'HT', 'HA', 'HJ', 'HQ']
    hands[1] = ['HK', 'ST', 'HA', 'HJ', 'HQ'] //check for false positives
    var handRank = new HandRank(hands)
    expect(handRank._isRoyalFlush(handRank.hands[0])).to.be.true

    expect(handRank._isRoyalFlush(handRank.hands[1])).to.be.false

  })

  it('detects 1 pair', function () {
    var cards = new Cards()
    cards.shuffle()
    var hands = _.times(2, () => { return cards.deal(5) })
    //override the first hand and make a straight
    hands[0] = ['HK', 'HT', 'HT', 'HJ', 'HQ']
    hands[1] = ['HK', 'ST', 'HA', 'HJ', 'HQ'] //check for false positives
    var handRank = new HandRank(hands)
    expect(handRank._isOnePair(handRank.hands[0])).to.be.true

    expect(handRank._isOnePair(handRank.hands[1])).to.be.false
  })

  it('detects 2 pair', function () {
    var cards = new Cards()
    cards.shuffle()
    var hands = _.times(2, () => { return cards.deal(5) })
    //override the first hand and make a straight
    hands[0] = ['HK', 'HT', 'HT', 'HJ', 'HK']
    hands[1] = ['HK', 'ST', 'HA', 'HJ', 'HQ'] //check for false positives
    var handRank = new HandRank(hands)
    expect(handRank._isTwoPair(handRank.hands[0])).to.be.true

    expect(handRank._isTwoPair(handRank.hands[1])).to.be.false
  })

  it('detects 3 of a kind', function () {
    var cards = new Cards()
    cards.shuffle()
    var hands = _.times(2, () => { return cards.deal(5) })
    //override the first hand and make a straight
    hands[0] = ['HK', 'HT', 'HT', 'HJ', 'HT']
    hands[1] = ['HK', 'ST', 'HA', 'HJ', 'HQ'] //check for false positives
    var handRank = new HandRank(hands)
    expect(handRank._isThreeOfaKind(handRank.hands[0])).to.be.true

    expect(handRank._isThreeOfaKind(handRank.hands[1])).to.be.false
  })

  it('detects fullhouse', function () {
    var cards = new Cards()
    cards.shuffle()
    var hands = _.times(2, () => { return cards.deal(5) })
    //override the first hand and make a straight
    hands[0] = ['HK', 'HT', 'HT', 'HK', 'HT']
    hands[1] = ['HK', 'HT', 'HQ', 'HK', 'HT'] //check for false positives
    var handRank = new HandRank(hands)
    expect(handRank._isFullHouse(handRank.hands[0])).to.be.true

    expect(handRank._isFullHouse(handRank.hands[1])).to.be.false
  })

  it('detects 4 of a kind', function () {
    var cards = new Cards()
    cards.shuffle()
    var hands = _.times(2, () => { return cards.deal(5) })
    //override the first hand and make a straight
    hands[0] = ['HT', 'HT', 'HT', 'HK', 'HT']
    hands[1] = ['HT', 'HT', 'HQ', 'HK', 'HT'] //check for false positives
    var handRank = new HandRank(hands)
    expect(handRank._isFourOfaKind(handRank.hands[0])).to.be.true

    expect(handRank._isFourOfaKind(handRank.hands[1])).to.be.false
  })

  it('ranks hand', function() {
    var hands = [
       ['S4','DT','H8','C9','H6'] //High Card
      ,['CA','S8','SQ','CQ','D3'] //1 Pair
      ,['DJ','H4','DJ','D4','S5'] //2 pair
      ,['S3','H2','D4','C6','H5'] // straight
      ,['SA','H9','C9','DT','C9'] //: 3 of a Kind
      ,['S4','S5','S8','S7','SQ'] //: Flush
      ,['H9','C7','S9','C9','D9'] //4 of a kind
      ,['HA','HT','DT','CT','CA'] //full house
      ,['D5','D7','D4','D6','D8'] //straight flush
      ,['DT','DK','DQ','DA','DJ'] //royal flush
    ]
    var handRank = new HandRank(hands)
    hands.map((h) => { handRank.rank(h) })
  })
})

