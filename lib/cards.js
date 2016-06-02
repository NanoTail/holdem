'use strict'

let _ = require('lodash')

var Cards = class cards {
  constructor () {
    this.deck = [
      'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK', 'HA',
      'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DJ', 'DQ', 'DK', 'DA',
      'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'SJ', 'SQ', 'SK', 'SA',
      'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK', 'CA',
    ] 
  }

  shuffle () {
    this.deck = _.shuffle(this.deck) 
  }

  deal (count) {
    if (this.deck.length < count) {
      throw new Error('No more cards available in deck')
    }
    var dealtCards = _.take(this.deck, count)
    this.deck = _.drop(this.deck, count)
    return dealtCards
  }
}

module.exports = Cards
