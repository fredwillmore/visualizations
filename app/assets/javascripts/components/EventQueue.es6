class Queue {

  constructor() {
    // should I call this 'queue' instead? I was thinking I should leave that as a possible method name.
    // are there private vars in es6 classes?
    this.q = []
  }

  map(f) {
    return this.q.map(f)
  }

  sort(attribute) {
    this.q.sort((a,b) => a[attribute] < b[attribute] ? -1 : +(a[attribute] > b[attribute]))
  }

  enqueue(queueItem) {
    this.q.push(queueItem)
  }

  dequeue() {
    return this.q.shift()
  }

  filter(f) {
    this.q.filter(f)
  }

  load(items){
    this.q = items
    this.sort()
  }

  processNextEvent(eventProcessor) {
    if(!this.nextEvent){
      return
    }
    return eventProcessor(this.nextEvent)
  }

}


class EventQueue extends Queue {

  sort() {
    super.sort('time')
  }

  build(items){
    super.build(items)
    console.log(this)
  }


}
