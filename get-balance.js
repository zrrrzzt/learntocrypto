'use strict'

const hashToHex = require('./hash-to-hex')

function isValid(prevHash, item) {
  const expectedHash = hashToHex(prevHash + JSON.stringify(item.value, null, 2))
  return expectedHash === item.hash
}

module.exports = log => {
  return log.reduce((a, b) => {
    if (isValid(a.prevHash, b)) {
      if (b.value.cmd === 'deposit') {
        a.amount += parseInt(b.value.amount, 10)
      }
      if (b.value.cmd === 'withdraw' && parseInt(b.value.amount, 10) <= a.amount) {
        a.amount -= parseInt(b.value.amount, 10)
      }
      a.prevHash = b.hash
      return a
    } else {
      throw new Error('We have been hacked!')
    }
  }, {amount: 0, prevHash: Buffer.alloc(32).toString('hex')})
}
