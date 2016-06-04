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
    this.cardMap = ['2','3','4','5','6','7','8','9','T','J','Q','K','A']
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
      var cardValues = hand.value.join('')
      var royality = /([TJQKA])/g
      var royals = cardValues.match(royality)
      return (royals.length === 5)
    }
    return false
  }

  _isStraightFlush (hand) {
    if (this._isFlush(hand) && this._isStraight(hand)) {
      this._setRank(hand, 'Straight Flush')
      return true
    }
    return false
  }

  _isFlush (hand) {
    var cards = _.toString(hand.cards)
    var flushRegEx = /([CDHS]{1})/g
    var uniqSuits = _.uniq(cards.match(flushRegEx))
    return uniqSuits.length === 1
  }

  _isStraight (hand) {
    var seqCount = 0
    for(var i = 0; i < hand.hash.length; i++) {
      if(hand.hash[i] === 0) {
        seqCount = 0
      } else {
        seqCount++
      }

      if(seqCount === 5) {
        break
      }
    }
    return seqCount === 5
  }

  _isOnePair (hand) {
    var pairs = 0
    hand.hash.map((v) => {
      (v === 2) ? pairs++ : pairs
    })

    return pairs === 1
  }

  _isTwoPair (hand) {
    var pairs = 0
    hand.hash.map((v) => {
      (v === 2) ? pairs++ : pairs
    })

    return pairs === 2
  }

  _isThreeOfaKind (hand) {
    var threes = 0
    hand.hash.map((v) => {
      (v === 3) ? threes++ : threes
    })

    return threes > 0
  }

  _isFullHouse (hand) {
    return (this._isThreeOfaKind(hand) && this._isOnePair(hand))
  }

  _isFourOfaKind (hand) {
    var fours = 0
    hand.hash.map((v) => {
      (v === 4) ? fours++ : fours
    })

    return fours === 1
  }

  _highCard (hand) {
    for(var i = hand.hash.length; i > 0; i--) {
      if(hand.hash[i] > 0) {
        return this.cardMap[i]
      }
    }
  }
}

module.exports = HandRank
