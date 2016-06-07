'use strict'

let Card = require('./cards')
//let Hand = require('./lib/hand')
let Rank = require('./rank')
let _ = require('lodash')
let d = require('debug')('holdem:index')

var rankNames = [ 'Royal Flush', 'Straight Flush', '4 of a Kind', 'Full House', 'Flush',
      'Straight', '3 of a Kind', '2 Pair', '1 Pair', 'High Card'].reverse()
  //shuffle the deck
  //deal multiple hands of 5 cards
  //rank the hands in desc order

  /*var cards = new Card()
  cards.shuffle().shuffle()
  var communityCards = cards.dealCommunityCards()
  var hands = _.times(10, () => { return cards.deal5() })*/
  var hands = [
 ['S4','DT','H8','C9','H6'] //: High Card
,['H9','CK','S2','D5','DT']
,['H6','C4','DJ','D7','H3']
,['CA','S8','SQ','CQ','D3'] //: 1 Pair
,['CK','S7','H4','D7','S3']
,['D3','HK','S7','DA','D7']
,['DJ','H4','DJ','D4','S5'] //2 pair
,['SA','HA','H4','HQ','C4']
,['HT','D4','C4','CA','DT']
,['S3','H2','D4','C6','H5']
,['SA','H9','C9','DT','C9'] //: 3 of a Kind
,['H9','D6','H5','S9','C9']
,['DA','DK','S3','SA','CA']
,['S4','S5','S8','S7','SQ'] //: Flush
,['D5','D2','DT','D9','D7']
,['S8','SK','S6','S2','S3']
,['H9','C7','S9','C9','D9'] //4 of a kind
,['HA','HT','DT','CT','CA'] //full house
,['D5','D7','D4','D6','D8'] //straight flush
,['DT','DK','DQ','DA','DJ'] //royal flush
  ]
  var handRank = new Rank(hands)
  var ranks = handRank.rank()
  console.time('holdem')
  ranks = _.sortBy(ranks, ['rank', 'rankBit'])

  ranks.map((r) => {
    d(`${r.cards} : ${r.rankBit} : ${rankNames[r.rank-1]}`)
  })
  console.timeEnd('holdem')
