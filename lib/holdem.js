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

module.exports = Holdem
