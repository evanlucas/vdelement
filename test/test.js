'use strict'

const test = require('tap').test
const Element = require('../')
const EE = require('events')

test('Element()', (t) => {
  t.plan(6)
  const ae = new EE()
  const a = new Element(ae)
  t.type(a, Element)
  t.type(a.emit, 'function')
  t.equal(a.target, ae)

  const be = new EE()
  const b = Element(be)
  t.type(b, Element)
  t.type(b.emit, 'function')
  t.equal(b.target, be)
})

test('Element#send', (t) => {
  test('send without target', (t) => {
    const a = new Element()
    t.equal(a.send(), false, 'send without target returns false')
    t.end()
  })

  test('send with invalid target', (t) => {
    const a = new Element({})
    t.equal(a.send(), false, 'send with invalid target returns false')
    t.end()
  })

  test('send with emitter target', (t) => {
    t.plan(16)
    const a = new EE()
    const b = new Element(a)

    a.on('one', () => {
      t.pass('one arg')
    })

    a.on('two', (msg) => {
      t.equal(msg, 'one')
    })

    a.on('three', (a, b) => {
      t.equal(a, 'two')
      t.equal(b, 'one')
    })

    a.on('1', (a, b, c) => {
      t.equal(a, '2')
      t.equal(b, '3')
      t.equal(c, '4')
    })

    a.on('5', (a, b, c, d) => {
      t.equal(a, '4')
      t.equal(b, '3')
      t.equal(c, '2')
      t.equal(d, '1')
    })

    t.equal(b.send('one'), true, 'one arg works')
    t.equal(b.send('two', 'one'), true, 'two args works')
    t.equal(b.send('three', 'two', 'one'), true, 'three args works')
    t.equal(b.send('1', '2', '3', '4'), true, 'four args works')
    t.equal(b.send('5', '4', '3', '2', '1'), true, 'five args works')
  })

  t.end()
})
