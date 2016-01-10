# Stream Conversions
Convert between different stream implementations

## Install
```shell
npm install stream-conversions
```

## Supported Stream libraries
- **Most.js** - aliased as most
- **Rx 4** - aliased as rx
- **Bacon.js** - aliased as bacon
- **Kefir.js** - aliased as kefir

## API

###### *fromLibrary*. to. *toLibrary* (*stream*)

- **Arguments** :
  - *fromLibrary* :: Object key - All supported library aliases
  - *toLibrary* :: Object key - All supported library aliases
  - *stream* :: fromLibrary type Stream - A stream of the *fromLibrary* type
- **Returns** :
  A stream of the *toLibrary* type

## Examples
```js
import convert from 'stream-conversions'

import most from 'most'
import Rx from 'rx'
import Bacon from 'baconjs'
import kefir from 'kefir'

convert.most.to.rx(most.just(100)).observe(x => console.log(x)) // 100

convert.rx.to.bacon(Rx.Observable.just(100)).onValue(x => console.log(x)) // 100

convert.bacon.to.most(Bacon.once(100)).observe(x => console.log(x)) // 100

convert.kefir.to.kefir(Kefir.constant(100)).onValue(x => console.log(x)) // 100
convert.keft.to.rx(Kefir.constant(100)).subscribe(x => console.log(x)) // 100

```

## How to add support for other libraries

coming soon...
