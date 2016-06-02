'use strict'

let _ = require('lodash')
let d = require('debug')('holdem:rank')
let Hand = require('./hand')

var HandRank = class handRank {
  //pass in several hands to the class
  constructor (hands) {
    this.hands = []
    if (typeof hands !== 'object' || hands.length < 2) {
      throw new Error('HandRank expects at least two hands')
    }

    this.hands = hands.map((hand) => {
      return new Hand(hand)
    })
  }

  _isFlush (hand) {
    var cards = _.toString(hand.cards)
    var flushRegEx = /([CDHS]{1})/g
    var uniqSuits = _.uniq(cards.match(flushRegEx))
    return uniqSuits.length === 1
  }

  _isStraight (hand) {
    var cards = hand.cards.sort()
    cards = _.toString(hand.cards)
    var straightRegEx = /(23456|34567|45678|56789|6789A|789AJ|89AJK|9AJKQ|AJKQT)/g
    //get rid of the suits, they hold no value for this check
    var cardsWidthoutSuit = (cards.replace(/[CDHS]/g, '')).split(',').join('')
    var handToTest = cardsWidthoutSuit.match(straightRegEx)
    return handToTest !== null
  }
}

module.exports = HandRank
