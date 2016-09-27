'use strict'

let _ = require('lodash')

var Cards = class cards {
  constructor () {
    this.deck = [
      'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'HT', 'HJ', 'HQ', 'HK', 'HA',
      'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'DT', 'DJ', 'DQ', 'DK', 'DA',
      'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'ST', 'SJ', 'SQ', 'SK', 'SA',
      'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'CT', 'CJ', 'CQ', 'CK', 'CA',
    ] 
  }

  shuffle () {
    this.deck = _.shuffle(this.deck) 
    return this
  }

  dealCommunityCards () {
    if (this.deck.length < 3) {
      throw new Error('No more cards available in deck')
    }
    var dealtCards = _.take(this.deck, 3)
    this.deck = _.drop(this.deck, 3)
    return dealtCards
  }

  deal () {
    if (this.deck.length < 2) {
      throw new Error('No more cards available in deck')
    }
    var dealtCards = _.take(this.deck, 2)
    this.deck = _.drop(this.deck, 2)
    return dealtCards
  }

  /*deal5 () {
    this.shuffle()
    var dealtCards = _.take(this.deck, 5)
    //this.deck = _.drop(this.deck, 5)
    return dealtCards
  }*/
}

module.exports = Cards
