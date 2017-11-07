'use strict'

var jsonStream = require('duplex-json-stream')
var net = require('net')

const args = process.argv
var client = jsonStream(net.connect(3876))

client.on('data', function (msg) {
  console.log('Teller received:', msg)
})

client.end({cmd: args[2], amount: args[3] || 0})
// client.end can be used to send a request and close the socket