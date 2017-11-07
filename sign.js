'use strict'

const sodium = require('sodium-native')

module.exports = msg => {
  let publicKey = Buffer.alloc(sodium.crypto_sign_PUBLICKEYBYTES)
  let secretKey = Buffer.alloc(sodium.crypto_sign_SECRETKEYBYTES)
  let signature = Buffer.alloc(sodium.crypto_sign_BYTES)
  let message = Buffer.from(msg)
  sodium.crypto_sign_keypair(publicKey, secretKey)
  sodium.crypto_sign_detached(signature, message, secretKey)
  return {
    publicKey: publicKey.toString('hex'),
    signature: signature.toString('hex'),
    message: message.toString()
  }
}