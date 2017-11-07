'use strict'

const sign = require('./sign')
const args = process.argv
const message = args[2]
const signed = sign(message)

console.log(`key: ${signed.publicKey}`)
console.log(`signature: ${signed.signature}`)
console.log(`message: ${signed.message}`)
