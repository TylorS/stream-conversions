import {isMost} from '../checks'
import {Observable} from 'rx'

export default function mostToRx(stream) {
  isMost(stream)
  return Observable.create(observer => {
    stream
      .observe(x => observer.onNext(x))
      .then(x => observer.onCompleted(x))
      .catch(x => observer.onError(x))
  })
}
