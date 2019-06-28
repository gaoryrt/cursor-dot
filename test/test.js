import test from 'ava'
import curDot from '..'
import browserEnv from 'browser-env'
browserEnv()

test('insert', t => {
  const cursor = curDot()
  const e = new MouseEvent('mousemove', {
    view: window,
    bubbles: true,
    cancelable: true,
    clientX: 0,
    clientY: 0
  })
  document.body.dispatchEvent(e)
  t.is(cursor.parentNode, document.body)
})

test('preStyle', t => {
  const cursor = curDot({
    background: 'red'
  })
  t.is(cursor.style.background, 'red')
})
