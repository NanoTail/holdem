'use strict'

let _ = require('lodash')

var Holdem = class holdem {
  constructor () {
    this.hand = []
  }  

  holdCards (cards) {
    // we only need 2 hold cards, will discard any extra ones if dealt by mistake
    this.hand = _.take(cards, 2)
  }

  communityCards (cards) {
    this.hand = _.concat(_.take(cards, 3), this.hand)
  }
}

let cards = [
  'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK', 'HA',
  'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DJ', 'DQ', 'DK', 'DA',
  'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'SJ', 'SQ', 'SK', 'SA',
  'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK', 'CA',
]

module.exports = Holdem
