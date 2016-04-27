var streamConversions = (function (Most,rx,Bacon,Kefir,Xstream) {
  'use strict';

  Most = 'default' in Most ? Most['default'] : Most;
  Bacon = 'default' in Bacon ? Bacon['default'] : Bacon;
  Kefir = 'default' in Kefir ? Kefir['default'] : Kefir;
  Xstream = 'default' in Xstream ? Xstream['default'] : Xstream;

  var mostInterface = function mostInterface(stream, observer) {
    stream.observe(function (x) {
      return observer.onNext(x);
    }).then(function (x) {
      return observer.onCompleted(x);
    }).catch(function (x) {
      return observer.onError(x);
    });
  };

  var rxInterface = function rxInterface(stream, observer) {
    stream.subscribe(function (x) {
      return observer.onNext(x);
    }, function (x) {
      return observer.onError(x);
    }, function (x) {
      return observer.onCompleted(x);
    });
  };

  var baconInterface = function baconInterface(stream, observer) {
    stream.onValue(function (x) {
      return observer.onNext(x);
    });
    stream.onError(function (x) {
      return observer.onError(x);
    });
    stream.onEnd(function (x) {
      return observer.onCompleted(x);
    });
  };

  var kefirInterface = function kefirInterface(stream, observer) {
    stream.onValue(function (x) {
      return observer.onNext(x);
    });
    stream.onError(function (x) {
      return observer.onError(x);
    });
    stream.onEnd(function (x) {
      return observer.onCompleted(x);
    });
  };

  var xstreamInterface = function xstreamInterface(stream, observer) {
    stream.addListener({
      next: function next(x) {
        return observer.onNext(x);
      },
      error: function error(x) {
        return observer.onError(x);
      },
      complete: function complete(x) {
        return observer.onCompleted(x);
      }
    });
  };

  var interfaces = {
    most: mostInterface,
    rx: rxInterface,
    bacon: baconInterface,
    kefir: kefirInterface,
    xstream: xstreamInterface
  };

  var message = function message(lib) {
    return 'Stream provided is not a ' + lib + ' stream';
  };

  function isMost(stream) {
    if (typeof stream.observe !== 'function') {
      throw new Error(message('most'));
    }
  }

  function isRx(stream) {
    if (typeof stream.subscribe !== 'function' || typeof stream.onValue === 'function') {
      throw new Error(message('rx'));
    }
  }

  function isBacon(stream) {
    if (typeof stream.onValue !== 'function' || typeof stream.onAny === 'function') {
      throw new Error(message('bacon'));
    }
  }

  function isKefir(stream) {
    if (typeof stream.onAny !== 'function') {
      throw new Error(message('kefir'));
    }
  }

  function isXstream(stream) {
    if (typeof stream.addListener !== 'function') {
      throw new Error(message('xstream'));
    }
  }

  var is = {
    most: isMost,
    rx: isRx,
    bacon: isBacon,
    kefir: isKefir,
    xstream: isXstream
  };

  var toMost = function toMost(stream, streamInterface) {
    return Most.create(function (add, end, error) {
      var observer = {
        onNext: add,
        onCompleted: end,
        onError: error
      };
      streamInterface(stream, observer);
    });
  };

  var toRx = function toRx(stream, streamInterface) {
    return rx.Observable.create(function (observer) {
      streamInterface(stream, observer);
    });
  };

  var toBacon = function toBacon(stream, streamInterface) {
    return Bacon.fromBinder(function (sink) {
      var observer = {
        onNext: function onNext(x) {
          return sink(new Bacon.Next(x));
        },
        onCompleted: function onCompleted(x) {
          return sink(new Bacon.End(x));
        },
        onError: function onError(x) {
          return sink(new Bacon.Error(x));
        }
      };
      streamInterface(stream, observer);
    });
  };

  var toKefir = function toKefir(stream, streamInterface) {
    return Kefir.stream(function (emitter) {
      var observer = {
        onNext: function onNext(x) {
          return emitter.emit(x);
        },
        onError: function onError(x) {
          return emitter.error(x);
        },
        onCompleted: function onCompleted(x) {
          return emitter.end(x);
        }
      };
      streamInterface(stream, observer);
    });
  };

  var toXstream = function toXstream(stream, streamInterface) {
    return Xstream.create({
      start: function start(listener) {
        var observer = {
          onNext: function onNext(x) {
            return listener.next(x);
          },
          onError: function onError(x) {
            return listener.error(x);
          },
          onCompleted: function onCompleted(x) {
            return listener.complete(x);
          }
        };
        streamInterface(stream, observer);
      },
      stop: function stop() {}
    });
  };

  var to = {
    most: toMost,
    rx: toRx,
    bacon: toBacon,
    kefir: toKefir,
    xstream: toXstream
  };

  var libraries = ['most', 'rx', 'bacon', 'kefir', 'xstream'];

  var makeTo = function makeTo(fromLib) {
    return libraries.reduce(function (acc, toLib) {
      acc[toLib] = function (stream) {
        is[fromLib](stream);
        return to[toLib](stream, interfaces[fromLib]);
      };
      return acc;
    }, {});
  };

  var convert = libraries.reduce(function (acc, lib) {
    acc[lib] = { to: makeTo(lib) };
    return acc;
  }, {});

  return convert;

}(most,Rx,Bacon,Kefir,Xstream));
//# sourceMappingURL=stream-conversions.js.map