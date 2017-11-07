'use strict'

const sodium = require('sodium-native')

module.exports = options => {
  const signature = Buffer.from(options.signature, 'hex')
  const message = Buffer.from(options.message)
  const publicKey = Buffer.from(options.publicKey, 'hex')
  const bool = sodium.crypto_sign_verify_detached(signature, message, publicKey)
  return bool
}