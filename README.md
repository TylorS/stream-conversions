# Stream Conversions
Convert between different stream implementations

## Install
```shell
npm install stream-conversions
```

## Examples
```js
import * as convert from 'stream-conversions'

import most from 'most'
import Rx from 'rx'

convert.most.toRx(most.just(100))
  .map(x => x * 5)
  .subscribe(x => {
    console.log(x) // 500
  })

convert.most.toMost(most.just(100))
  .map(x => x * 5)
  .observe(x => {
    console.log(x) // 500
  })

convert.rx.toRx(Rx.Observable.just(100))
  .map(x => x * 5)
  .subscribe(x => {
    console.log(x) // 500
  })

convert.rx.toMost(Rx.Observable.just(100))
  .map(x => x * 5)
  .observe(x => {
    console.log(x) // 500
  })

```
