# vdelement

[![Build Status](https://travis-ci.org/evanlucas/vdelement.svg)](https://travis-ci.org/evanlucas/vdelement)
[![Coverage Status](https://coveralls.io/repos/evanlucas/vdelement/badge.svg?branch=master&service=github)](https://coveralls.io/github/evanlucas/vdelement?branch=master)

Base Element for use with virtual-dom.

This was originally taken from https://github.com/moose-team/friends/blob/master/lib/elements/base-element.js and modified for efficiency.

Requires Node.js v4+.

## Install

```bash
$ npm install --save vdelement
```

## Example

```js
const inherits = require('util').inherits
const Element = require('vdelement')
const h = require('virtual-dom/h')

module.exports = Sidebar

function Sidebar(app) {
  Element.call(this, app)
}
inherits(Sidebar, Element)

Element.prototype.handleLink = function handleLink(e, link) {
  // do something with the link
  e.preventDefault()
  this.send('openUrl', link.href)
}

Element.prototype.render = function render(links) {
  const logs = links.map((link) => {
    return h('li', [
      h('a', {
        href: link.href
      , onclick: (e) => {
          this.handleLink(e, link)
        }
      }, link.name)
    ])
  })

  return [
    h('ul', logs)
  ]
}
```

## Test

```bash
$ npm test
```

## Author

Evan Lucas

## License

MIT (See `LICENSE` for more info)
