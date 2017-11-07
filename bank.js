'use strict'

const sodium = require('sodium-native')
const jsonStream = require('duplex-json-stream')
const net = require('net')
const fs = require('fs')
const getBalance = require('./get-balance')
const hashToHex = require('./hash-to-hex')

let log = require('./log.json')

// One edge-case with referring to the previous hash is that you need a
// "genesis" hash for the first entry in the log
var genesisHash = Buffer.alloc(32).toString('hex')

function appendToTransactionLog (entry) {
  var prevHash = log.length ? log[log.length - 1].hash : genesisHash
  log.push({
    value: entry,
    hash: hashToHex(prevHash + JSON.stringify(entry, null, 2))
  })
  fs.writeFileSync('log.json', JSON.stringify(log, null, 2), 'utf-8')
}

console.log(`Welcome to the bank. Our amount of schmeckels are at the moment ${getBalance(log).amount}`)

var server = net.createServer(function (socket) {
  socket = jsonStream(socket)

  socket.on('data', function (msg) {
    console.log('Bank received:', msg)
    if (['deposit', 'withdraw'].includes(msg.cmd)) {
      appendToTransactionLog(msg)
      socket.write({cmd: msg.cmd, balance: getBalance(log).amount})
    } else {
      socket.write({cmd: 'balance', balance: getBalance(log).amount})
    }
    // socket.write can be used to send a reply
  })
})

server.listen(3876)