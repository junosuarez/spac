const socketIO = require('socket.io-client')
const drawGif = require('./draw')

function spac () {

const socket = socketIO.connect('https://chat.meatspac.es')

socket.on('connect', function () {
  console.log('teim to spac some meats')
  socket.on('message', function (e) {

    var gif = new Buffer(
      e.chat.value.media.substr('data:image/gif;base64,'.length)
    , 'base64'
    )


    drawGif(gif)
    console.log(e.chat.value.message)
    console.log('=====================')

    // drawGif

    // imaging.draw(e.chat.value.media, {char: '●'},
    //   function (resp, status) {
    //   console.log('==============================================================')
    //   console.log(resp)
    //   console.log(e.chat.value.message)

    // })

  })
})

socket.on('error', function (e) {
  console.error(e)
  process.exit(1)
})

  
}

module.exports = spac

spac()