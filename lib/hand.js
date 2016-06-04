'use strict'

let _ = require('lodash')
let d = require('debug')('holdem:hand')

var Hand = class hand {
  constructor(cards) {
    this.cards = cards
    this.hash = [
      // 2,3,4,5,6,7,8,9,T,J,Q,K,A
         0,0,0,0,0,0,0,0,0,0,0,0,0
    ]

    this.value = this._toValue() 
    this.rank = 0

    this._reduce(this.hash)
  }

  _toValue () {
    var cards = _.toString(this.cards)
    return cards.replace(/[CDHS]/g, '').split(',')
  }
  
  /**
   * Creates a string containing only the card suits
   */
  _toSuit () {
    var cards = _.toString(this.cards)
    return cards.replace(/[^CDHS]/g, '').split(',').join('')
  }

  _faceValue (face) {
    var value = (face === 'T' ? 10 : face === 'J' ? 11 : face === 'Q' ? 12 : face === 'K' ? 13 : face === 'A' ? 14 : parseInt(face))
    return value
  }

  _reduce(hash) {
    this.value.map((v) => {
      v = this._faceValue(v) - 2
      var posValue = hash[v]
      hash[v] = posValue + 1
    })
  }
}

module.exports = Hand

