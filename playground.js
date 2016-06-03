'use strict'

var handValue = ['5','5','5','5','9']

var hash = [
// 2,3,4,5,6,7,8,9,T,J,Q,K,A
   0,0,0,0,0,0,0,0,0,0,0,0,0
]

var map = ['2','3','4','5','6','7','8','9','T','J','Q','K','A']


function d(msg) {
  console.log(msg)
}

function reduce(handValue) {
  handValue.map((v) => {
    v = faceValue(v) - 2
    var posValue = hash[v]
    hash[v] = posValue + 1
  })
}

function faceValue (face) {
  var face = (face === 'T' ? 10 : face === 'J' ? 11 : face === 'Q' ? 12 : face === 'K' ? 13 : face === 'A' ? 14 : face)
  return face
}


//checks
function highCard(hash) {
  for(var i=hash.length-1; i > 0; i--) {
    if (hash[i] > 0)
      return map[i]
  }
}

function straight (hash) {
  //start from one end and look for a non zero element.
  //from there, there must be 4 other non zero elements in consecutive positions
  var sequence = 0;
  for(var i=0; i < hash.length; i++) {
    if (hash[i] === 0) {
      sequence = 0
    } else {
      sequence += 1
    }
    if (sequence === 5)
      break
  }
  return (sequence === 5)
}

function onePair (hash) {
  var pairs = 0
  hash.map((h) => {
    (h === 2) ? pairs++ : pairs
  })

  return pairs === 1
}

function twoPairs (hash) {
  var pairs = 0
  hash.map((h) => {
    (h === 2) ? pairs++ : pairs
  })

  return pairs === 2
}

function threeOfaKind (hash) {
  var threes = 0
  hash.map((h) => {
    (h === 3) ? threes++ : threes
  })
  return threes > 0
}

function fullHouse (hash) {
  return onePair(hash) && threeOfaKind(hash)
}

function fourOfaKind (hash) {
  var fours = 0
  hash.map((h) => {
    (h === 4) ? fours++ : fours
  })

  return fours === 1
}

reduce(handValue)
d(hash)
d('High card: ' + highCard(hash))
d('Straight: ' + straight(hash))
d('1 Pair: ' + onePair(hash))
d('2 Pairs: ' + twoPairs(hash))
d('3 of a kind: ' + threeOfaKind(hash))
d('Fullhouse: ' + fullHouse(hash))
d('4 of a kind: ' + fourOfaKind(hash))
