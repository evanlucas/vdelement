'use strict'

const inherits = require('util').inherits
const EE = require('events')

module.exports = Element

function Element(target) {
  if (!(this instanceof Element))
    return new Element(target)

  EE.call(this)
  this.target = target
}
inherits(Element, EE)

Element.prototype.send = function send() {
  const target = this.target
  if (target && typeof target.emit === 'function') {
    const len = arguments.length
    switch (len) {
      case 1:
        return target.emit(arguments[0])
      case 2:
        return target.emit(arguments[0], arguments[1])
      case 3:
        return target.emit(arguments[0], arguments[1], arguments[2])
      case 4:
        return target.emit(
          arguments[0]
        , arguments[1]
        , arguments[2]
        , arguments[3]
        )
      default:
        return target.emit.apply(target, arguments)
    }
  } else {
    return false
  }
}
