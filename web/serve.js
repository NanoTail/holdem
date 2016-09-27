'use strict'

let express = require('express')
let bodyParser = require('body-parser')
let swig = require('swig')
let _ = require('lodash')
let path = require('path')
let Player = require(path.join(__dirname, 'randomPlayer'))
let Card = require(path.join(__dirname, '../lib/cards'))
let Rank = require(path.join(__dirname, '../lib/rank'))

var app = express()
var templateFolder = path.join(__dirname, 'public/html')
app.use(express.static('web/public'))
app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`Connection from: ${ip} at ${new Date().toISOString()}`)
  res.send(swig.renderFile(path.join(templateFolder, 'index.html'), {body: 'Hello world....'}))
})

app.get('/player', function(req, res, next) {
  var player = Player.generate()
  res.send(player)
})

app.get('/deal', function(req, res, next) {
  res.send(deal())
})

app.post('/rank', function(req, res, next) {
    var hands = []
    req.body.hands.map((h) => {
      hands.push(req.body.communityCards.concat(h))
    })

    var handRank = new Rank(hands)
    var ranks = handRank.rank()

    res.send(ranks)
})

app.listen(8000, function() {
  console.log('Server started.')
})

function deal() {
  var cards = new Card()
  cards.shuffle()
  var communityCards = cards.dealCommunityCards()
  var hands = _.times(5, () => { return cards.deal() })
  return {communityCards: communityCards, hands: hands}
}
