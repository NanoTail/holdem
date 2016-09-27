'use strict'

let faker = require('faker')

var Player = class player {
  static generate () {
    return {
      name: faker.name.firstName(),
      avatar: faker.internet.avatar()
    }
  }
}

module.exports = Player
