'use strict'

let mocha = require('mocha')
let chai = require('chai')
let _ = require('lodash')

let Cards = require('../lib/cards')

var expect = chai.expect

describe('Cards', function () {
  var cards = new 
  before(function(){
    cards = new Cards()
  })

  it('has 52 cards', function () {
    expect(cards.deck.length).to.equal(52)
  })

  it('can shuffle cards', function () {
    var cardsBeforeShuffle = cards.deck
    cards.shuffle()
    expect(cards.deck).not.to.equal(cardsBeforeShuffle)
  })

  it('can deal cards', function () {
    var cardCount = cards.deck.length
    var dealCards = 2
    var hand = cards.deal(dealCards)
    expect(hand.length).to.equal(dealCards)
    expect(cards.deck.length).to.equal(cardCount - dealCards)
  })

  it('cannot deal more than 24 hands', function () {
    var newDeck = new Cards()
    newDeck.shuffle()
    //deal the community cards
    newDeck.dealCommunityCards()
    //deal hold cards
    newDeck.deal()
    //try to deal 25 hands
    expect(
        () => {
          _.times(25, 
              () => { 
                newDeck.deal(2) 
              })
        }).to.throw(Error)
    //check that dealCommunity too throws error 
    expect(() => newDeck.dealCommunityCards())
      .to.throw(Error)
  })
})
