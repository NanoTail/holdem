'use strict'

let _ = require('lodash')
let d = require('debug')('holdem:rank')
let Hand = require('./hand')


var HandRank = class handRank {

  constructor (hands) {
    this.handRankPoints = {
      'Royal Flush': 10,
      'Straight Flush': 9,
      '4 of a Kind': 8,
      'Full House': 7,
      'Flush': 6,
      'Straight': 5,
      '3 of a Kind': 4,
      '2 Pair': 3,
      '1 Pair': 2,
      'High Card': 1
    }
    this.hands = []
    if (typeof hands !== 'object' || hands.length < 2) {
      throw new Error('HandRank expects at least two hands')
    }

    this.hands = hands.map((hand) => {
      return new Hand(hand)
    })
  }

  _setRank(hand, rankName) {
    hand.rank = this.handRankPoints[rankName]
  }

  _isRoyalFlush (hand) {
    if (this._isFlush(hand)) {
      var cardValues = this._toValue(hand.cards)
      var royality = /([TJQKA])/g
      var royals = cardValues.match(royality)
      this._setRank(hand, 'Royal Flush')
      return (royals.length === 5)
    }
    return false
  }

  _isStraightFlush (hand) {
    if (this._isFlush(hand) && this._isStraight(hand)) {
      this._setRank(hand, 'Straight Flush')
      return true
    }
  }

  _isFlush (hand) {
    var cards = _.toString(hand.cards)
    var flushRegEx = /([CDHS]{1})/g
    var uniqSuits = _.uniq(cards.match(flushRegEx))
    this._setRank(hand, 'Flush') 
    return uniqSuits.length === 1
  }

  _isStraight (hand) {
    var cards = hand.cards.sort()
    var straightRegEx = /(23456|34567|45678|56789|6789T|789JT|89JQT|9JKQT|AJKQT)/g
    //get rid of the suits, they hold no value for this check
    var cardsWidthoutSuit = this._toValue(cards)
    var handToTest = cardsWidthoutSuit.match(straightRegEx)
    this._setRank(hand, 'Straight') 
    return handToTest !== null
  }

  _highCard (hand) {
    var cards = hand.cards
    var highCard = 2 //the lowest possible card
    cards = this._toValue(cards).split('')
    cards.sort((a, b) => {
      a = (a === 'T' ? 10 : (a === 'J' ? 11 : (a === 'Q' ? 12 : (a === 'K' ? 13 : (a === 'A' ? 14 : a)))))
      b = (b === 'T' ? 10 : (b === 'J' ? 11 : (b === 'Q' ? 12 : (b === 'K' ? 13 : (b === 'A' ? 14 : b)))))
      return a < b
    })
    highCard = _.first(cards)
    this._setRank(hand, 'High Card') 
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
