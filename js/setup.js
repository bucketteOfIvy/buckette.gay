const canvas = document.createElement('canvas')
canvas.width = window.visualViewport.width
canvas.height = window.visualViewport.height
canvas.style.zindex = -10
// canvas.style.webkitFilter = 'blur(3px)'
// setup style
document.body.appendChild(canvas)
const ctx = canvas.getContext('2d')
ctx.globalAlpha = 0.5

// setup the *actual* splotches
const amount = 125
const size = 250
const splotches = []
function Splotch (x, y, r, color) {
  this.x = x
  this.y = y
  this.r = r
  this.color = color
  this.rate = Math.random() * Math.PI / 90
  this.t = Math.random() * 2 * Math.PI
  this.scale = Math.random() * 25
  this.px = this.x / window.innerWidth
  this.py = this.y / window.innerHeight

  // TODO: adjust this so that it *actually* hovers
  this.hover = () => {
    const newt = this.t + this.rate
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x + Math.sin(newt) * this.scale, this.y + Math.cos(newt) * this.scale, this.r * 0.5, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
    ctx.shadowColor = this.color
    ctx.shadowBlur = 0.5
    this.t = newt
  }
}

function generateSplotches (amount, col) {
  const currentLength = splotches.length
  for (let i = currentLength; i < currentLength + amount; i++) {
    splotches[i] = new Splotch(
      window.innerWidth * Math.random(),
      window.innerHeight * Math.random(),
      size * Math.random(),
      col
    )
  }
}

function animateSplotches () {
  let i = 0
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  while (i < splotches.length) {
    // setInterval(splotches[i].hover, interval, interval)
    splotches[i].hover()
    i++
  }
}

for (let i = 0; i < amount; i += 10) {
  generateSplotches(5, '#F7A8B8')
  generateSplotches(5, '#55CDFC')
}
function animate () {
  animateSplotches()
  window.requestAnimationFrame(animate)
}
animate()

function resize () {
  for (let i = 0; i < splotches.length; i += 1) {
    splotches[i].x = splotches[i].px * window.innerWidth
    splotches[i].y = splotches[i].py * window.innerHeight
  }
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth
  ctx.globalAlpha = 0.5
}

window.addEventListener('resize', resize)
window.addEventListener('orientationchange', resize)
