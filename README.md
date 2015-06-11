ng-easy-inject
---

[![Build Status](http://img.shields.io/travis/NickTomlin/ng-easy-inject.svg?style=flat&branch=master)](https://travis-ci.org/NickTomlin/ng-easy-inject)
![NPM package](https://img.shields.io/npm/v/ng-easy-inject.svg)

Easily inject angular dependencies into your unit tests.


```javascript
// or window.easyInject for non CJS users
// who include a <script> pointed at dist/ng-easy-inject.js
var easyInject = require('ng-easy-inject');

describe('injecting depedencies', function () {
  beforeEach(easyInject('$http $q'));

  it('is surprisingly easy', function () {
    expect(this.$http).to.respondTo('get');
  });
});
```

# Compatibility

Tested against mocha and Jasmine 2.x.

# Testing

```
npm i
npm t
```

# Related Projects

[bard.js](https://github.com/wardbell/bardjs) - Includes auto inject functionality and a lot of other useful helpers.
