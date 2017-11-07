'use strict'

const sodium = require('sodium-native')
let a = Buffer.alloc(sodium.crypto_generichash_BYTES)
let b = Buffer.from('Hello, World!')
sodium.crypto_generichash(a, b)
console.log(a.toString('hex'))