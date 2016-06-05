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

  //high card, pair, 2 pairs, 3 of a kind, straight, flush, full house, 4 of a kind, straight flush, royal flush

  rank () {
    this.hands.map((h) => {
      //h.highCard = this._highCard(h)
      this._setRank(h, 'High Card')
      if(this._isRoyalFlush(h)) {
        this._setRank(h, 'Royal Flush')
      } else if(this._isStraightFlush(h)) {
        this._setRank(h, 'Straight Flush')
      } else if(this._isFourOfaKind(h)) {
        this._setRank(h, '4 of a Kind')
      } else if(this._isFullHouse(h)) {
        this._setRank(h, 'Full House')
      } else if (this._isFlush(h)) {
        this._setRank(h, 'Flush')
      } else if (this._isStraight(h)) {
        this._setRank(h, 'Straight')
      } else if (this._isThreeOfaKind(h)) {
        this._setRank(h, '3 of a Kind')
      } else if (this._isTwoPair(h)) {
        this._setRank(h, '2 Pair')
      } else if (this._isOnePair(h)) {
        this._setRank(h, '1 Pair')
      }
    })

    return this.hands
  }

  _setRank(hand, rankName) {
    hand.rank = this.handRankPoints[rankName]
  }

  _isRoyalFlush (hand) {
    if (this._isFlush(hand)) {
      return (
          hand.value[0] === 14 &&
          hand.value[1] === 13 &&
          hand.value[2] === 12 &&
          hand.value[3] === 11 &&
          hand.value[4] === 10
      )
    } 
    return false
  }

  _isStraightFlush (hand) {
    if (this._isFlush(hand) && this._isStraight(hand)) {
      return true
    }
    return false
  }

  _isFlush (hand) {
    var match = hand.suits.match(/CCCCC|DDDDD|HHHHH|SSSSS/g)
    return match != null
  }

  _isStraight (hand) {
    var straight = true, i
    for (i = 0; i < hand.value.length - 1; i++) {
      if(hand.value[i] !== hand.value[i+1] + 1) {
        straight = false
      }
    }

    return straight
  }

  _isOnePair (hand) {
    var pairCount = 0
    for (var card in hand.hash) {
      if(hand.hash[card] === 2) {
        pairCount++
      }
    }
    return pairCount === 1
  }

  _isTwoPair (hand) {
    var pairCount = 0
    for (var card in hand.hash) {
      if(hand.hash[card] === 2) {
        pairCount++
      }
    }
    return pairCount === 2
  }

  _isThreeOfaKind (hand) {
    var threes = 0

    for (var card in hand.hash) {
      if(hand.hash[card] === 3) {
        threes++
      }
    }

    return threes === 1
  }

  _isFullHouse (hand) {
    return (this._isThreeOfaKind(hand) && this._isOnePair(hand))
  }

  _isFourOfaKind (hand) {
    var fours = 0
    for (var card in hand.hash) {
      if(hand.hash[card] === 4) {
        fours++
      }
    }

    return fours === 1
  }

  /*_highCard (hand) {
    for(var i = hand.hash.length; i > 0; i--) {
      if(hand.hash[i] > 0) {
        return this.cardMap[i]
      }
    }
  }*/
}

module.exports = HandRank
