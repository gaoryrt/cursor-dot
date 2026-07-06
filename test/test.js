import test from 'ava'
import curDot from '..'
import browserEnv from 'browser-env'
browserEnv()

test('insert', t => {
  const cursor = curDot()
  const e = new MouseEvent('mousemove', {
    bubbles: true,
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

test('over style', t => {
  const cursor = curDot()
  cursor.over('body', {
    background: 'red',
    borderColor: '4px',
    scale: 4
  })
  const mouseover = new MouseEvent('mouseover', {
    bubbles: true,
    clientX: 0,
    clientY: 0
  })
  document.body.dispatchEvent(mouseover)
  const mouseout = new MouseEvent('mouseout', {
    bubbles: true,
    clientX: 0,
    clientY: 0
  })
  document.body.dispatchEvent(mouseout)
  t.pass()
})

test('destroy removes DOM', t => {
  const cursor = curDot()
  document.dispatchEvent(new MouseEvent('mousemove', {
    bubbles: true,
    clientX: 0,
    clientY: 0
  }))
  t.is(cursor.parentNode, document.body)
  cursor.destroy()
  t.is(cursor.parentNode, null)
})

test('destroy then re-create', t => {
  const old = curDot()
  document.dispatchEvent(new MouseEvent('mousemove', {
    bubbles: true,
    clientX: 0,
    clientY: 0
  }))
  old.destroy()
  const cursor = curDot()
  document.dispatchEvent(new MouseEvent('mousemove', {
    bubbles: true,
    clientX: 10,
    clientY: 10
  }))
  t.is(cursor.parentNode, document.body)
  t.not(cursor, old)
})
