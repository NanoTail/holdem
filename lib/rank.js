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
    var straightRegEx = /(23456|34567|45678|56789|6789A|789AJ|89AJK|9AJKQ|AJKQT)/g
    //get rid of the suits, they hold no value for this check
    var cardsWidthoutSuit = this._toValue(cards)
    var handToTest = cardsWidthoutSuit.match(straightRegEx)
    return handToTest !== null
  }

  _highCard (hand) {
    var highCard = 2 //the lowest possible card
    hand = this._toValue(hand).split('')
    hand.sort((a, b) => {
      a = (a === 'T' ? 10 : (a === 'J' ? 11 : (a === 'Q' ? 12 : (a === 'K' ? 13 : (a === 'A' ? 14 : a)))))
      b = (b === 'T' ? 10 : (b === 'J' ? 11 : (b === 'Q' ? 12 : (b === 'K' ? 13 : (b === 'A' ? 14 : b)))))
      return a < b
    })
    highCard = _.first(hand)
    return highCard
  }
  
  /**
   * Creates a string containing only card values
   */
  _toValue (cards) {
    cards = _.toString(cards)
    return cards.replace(/[CDHS]/g, '').split(',').join('')
  }

  /**
   * Creates a string containing only the card suits
   */
  _toSuit (cards) {
    cards = _.toString(cards)
    return cards.replace(/[^CDHS]/g, '').split(',').join('')
  }
}

module.exports = HandRank
