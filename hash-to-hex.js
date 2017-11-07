'use strict'

const sodium = require('sodium-native')

module.exports = input => {
  let hash = Buffer.alloc(sodium.crypto_generichash_BYTES)
  let data = Buffer.from(input)
  sodium.crypto_generichash(hash, data)
  return hash.toString('hex')
}
