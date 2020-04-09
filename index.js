const $$ = s =>
  Array.prototype.slice.call(
    document.querySelectorAll(s)
  )
const isEl = obj => obj instanceof HTMLElement
const isStr = obj => Object.prototype.toString.call(obj) === '[object String]'

const cursorDot = ({
  zIndex = 1,
  diameter = 80,
  borderWidth = 1,
  borderColor = '#ddd',
  easing = 4,
  background = 'transparent'
} = {}) => {
  let inited = false
  const alt = { x: 0, y: 0, o: 1, d: diameter }
  const cur = { x: 0, y: 0, o: 0, d: diameter }
  const dot = document.createElement('div')
  const tim = easing / 15
  dot.style = `position:fixed;top:0;left:0;border-radius:100%;pointer-events:none;opacity:0;z-index:${zIndex};height:${diameter}px;width:${diameter}px;background:${background};border:${borderWidth}px solid ${borderColor};mix-blend-mode:exclusion;transition:background ${tim}s,border ${tim}s;will-change:transform`

  document.addEventListener('mousemove', e => {
    alt.x = e.clientX
    alt.y = e.clientY
    dot.style.opacity = 1
    if (!inited) {
      document.body.append(dot)
      cur.x = alt.x
      cur.y = alt.y
      inited = true
      draw()
    }
  })

  const draw = () => {
    const dX = alt.x - cur.x
    const dY = alt.y - cur.y
    cur.x += (dX / easing)
    cur.y += (dY / easing)
    const t3d = `translate3d(${cur.x - cur.d / 2}px,${cur.y - cur.d / 2}px,0)`
    dot.style.webkitTransform = t3d
    dot.style.transform = t3d

    const dO = alt.o - cur.o
    cur.o += dO / easing
    dot.style.opacity = cur.o

    const dD = alt.d - cur.d
    cur.d += dD / easing
    dot.style.height = cur.d + 'px'
    dot.style.width = cur.d + 'px'

    try {
      requestAnimationFrame(draw)
    } catch (_) {
      setImmediate(draw)
    }
  }

  dot.over = (any, style) => {
    const fn = el => {
      el.addEventListener('mouseover', _ => {
        if (style.background) dot.style.backgroundColor = style.background
        if (style.borderColor) dot.style.borderColor = style.borderColor
        if (style.scale) alt.d = diameter * style.scale
      })
      el.addEventListener('mouseout', _ => {
        if (style.background) dot.style.backgroundColor = background
        if (style.borderColor) dot.style.borderColor = borderColor
        if (style.scale) alt.d = diameter
      })
    }
    if (isEl(any)) fn(any)
    else if (isStr(any)) $$(any).forEach(fn)
  }

  return dot
}

module.exports = cursorDot
