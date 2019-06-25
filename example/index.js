import './main.css'
import curDot from '..'

const $ = s => document.querySelector(s)

const cursor = curDot({
  easing: 4
})

cursor.over('.react1', {
  borderColor: 'rgba(255,255,255,.38)'
})

cursor.over('.react2', {
  scale: .5,
  background: '#fff'
})

cursor.over($('.react3'), {
  scale: 1.4,
  background: '#faa2c1',
  borderColor: 'transparent'
})
