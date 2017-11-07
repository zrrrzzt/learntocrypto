'use strict'

const verify = require('./verify')
const args = process.argv
const options = {
  message: args[2],
  publicKey: args[3],
  signature: args[4]
}

console.log(verify(options))
