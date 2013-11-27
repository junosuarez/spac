const fs = require('fs')
const Canvas = require('canvas')
const Image = Canvas.Image
const antsy = require('antsy')

const maxWidth = 50
const maxHeight = 20

module.exports = function drawGif(buffer) {
  renderToTerm(getImageData(buffer, maxWidth, maxHeight))
}

function getImageData(buffer, maxWidth, maxHeight) {
  const termRatio = (80 / 4) / (25 / 3) // 80x25 chars on 4:3 display

  var img = new Image
  img.src = buffer

  var landscape = img.width >= img.height
  var ratio = 1
  var height
  var width

  if (landscape) {
    width = maxWidth
    ratio = img.width / maxWidth
    height = Math.min(Math.round(img.height / ratio / termRatio), maxHeight)
  } else {
    height = maxHeight
    ration = img.height / maxHeight
    width = Math.min(Math.round(img.width * termRatio / ratio), maxWidth)
  }

  var canvas = new Canvas(width, height)
  var ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, width, height)
  var data = ctx.getImageData(0, 0, width, height).data
  return {
    data: data,
    width: width,
    height: height
  }
}

function renderToTerm(src) {

  var term = new antsy.Canvas(src.width, src.height)

  var x = 0
  var y = 0
  var r = 0
  var g = 0
  var b = 0
  var px = 0
  console.log(src.data[0], src.data[1], src.data[2], src.data[3])
  while(px < (src.width * src.height * 4)) {
    r = src.data[px++]
    g = src.data[px++]
    b = src.data[px++]
    px++

    term.at(x, y)
      .backgroundColor(toHex(r,g,b))
      .write(' ')
    x++
    if (x % 50 === 0) {
      // y++
    }
  }

  term.toStrings().forEach(function (line) {
    console.log(line)
  })  
}

function toHex(r, g, b) {
  var hex = '#'
  if (r<16) { hex+='0' }
  hex+=r.toString(16)
  if (g<16) { hex+='0' }
  hex+=g.toString(16)
  if (b<16) { hex+='0' }
  hex+=b.toString(16)
  return hex
}