ng-easy-inject
---

Easily inject angular dependencies into your unit tests.


```javascript
// or window.easyInject for non CJS users
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
