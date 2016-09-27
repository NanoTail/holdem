'use strict'

let _ = require('lodash')
let d = require('debug')('holdem:hand')

var Hand = class hand {
  constructor(cards) {
    this.cards = cards
    this.hash = {} 
    this.suits = ''
    this.value = [] 
    this.rank = 0
    this.rankName = 0
    this.rankBit = 0

    this._reduce()
  }

  _toValue (cards) {
    cards = _.toString(cards)
    return cards.replace(/[CDHS]/g, '').split(',')
  }
  
  _faceValue (face) {
    var value = (face === 'T' ? 10 : face === 'J' ? 11 : face === 'Q' ? 12 : face === 'K' ? 13 : face === 'A' ? 14 : parseInt(face))
    return value
  }

  _reduce() {
    //extract suits
    this.suits = this.cards.toString().replace(/[^CDHS]/g, '')

    var hash = {}, i
    var value = this._toValue(this.cards).map((v) => {
      return this._faceValue(v)
    })

    for(i = 0; i < 5; i++) {
      hash[value[i]] = (hash[value[i]] >= 1) ? hash[value[i]] + 1 : 1
    }
    value = value.sort((a,b) => {
      return (hash[a] < hash[b]) ? +1 : (hash[a] > hash[b]) ? -1 : (b - a)
    })

    this.rankBit = value[0]<<16|value[1]<<12|value[2]<<8|value[3]<<4|value[4]
    this.hash = hash
    this.value = value
  }
}

module.exports = Hand

