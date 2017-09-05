class PriorityQueue extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      // paused: true
    }
    this.margin = props.margin
    this.innerWidth  = props.width  - this.margin.left - this.margin.right
    this.innerHeight = props.height - this.margin.top  - this.margin.bottom
    this.eventQueue = new EventQueue
    this.transitionAttributes = new Map
    this.eventProcessor = this.eventProcessor.bind(this)
  }

  componentWillMount() {
    this.createScales()
  }

  componentDidMount() {
    $.ajax({
      url: this.props.dataUrl,
      dataType: 'json',
      success: function(data) {
        var formattedData = this.formatData(data)
        this.eventQueue.load(this.buildEvents(formattedData))
        this.setState({ data: formattedData })
        this.eventQueue.nextEvent = this.eventQueue.dequeue()
        this.eventQueue.processNextEvent(this.eventProcessor)
      }.bind(this)
    });
  }

  componentWillUpdate() {
    this.createScales()
    if(this.nextEvent) {
      this.eventQueue.processNextEvent(this.eventProcessor)
    }
    // this.nextEvent = this.getNextEvent()
  }

  componentDidUpdate() {
    // this.nextTransition()
    // this.nextEvent = null
  }


  formatData(data) {
    // data.forEach((d) => {
    // })
    return data.map((d, i) => Object.assign(d, {id: i+1}));
  }

  createScales() {
    this.colorScale = d3.scaleOrdinal(eval('d3.'+this.props.colorScheme))
  }

  buildEvents(data) {
    return data.map(this.buildEvent)
  }

  // buildEvent(d, i){
  //   var wall = (d.vx > 0) ? this.innerWidth : 0
  //   var time = (wall - d.cx + d.radius * ( d.vx < 0 ? 1 : -1))/d.vx
  //   var event = {
  //     time: time,
  //     changes: [{
  //       objectIndex: i,
  //       vx: -d.vx
  //     }]
  //   }
  //
  //   wall = (d.vy > 0) ? this.innerHeight : 0
  //   time = (wall - d.cy + d.radius * ( d.vy < 0 ? 1 : -1))/d.vy
  //   if(time < event.time){
  //     event = {
  //       time: time,
  //       changes: [{ objectIndex: i, vy: -d.vy }]
  //     }
  //   }
  //   return event
  // }

  buildEvent(d, direction){
    var describer = (d, direction) => {
      if(direction == 'x'){
        return `Object ID ${d.id} collides with ${(d.vx > 0) ? 'right' : 'left'} wall`
      } else {
        return `Object ID ${d.id} collides with ${(d.vy > 0) ? 'bottom' : 'top'} wall`
      }
    },
    timeToWall = (d, direction) => {
      if(direction == 'x'){
        wall = (d.vx > 0) ? this.innerWidth : 0
        return  Math.abs((wall - d.cx + d.radius * ( d.vx < 0 ? 1 : -1))/d.vx)
      } else {
        wall = (d.vy > 0) ? this.innerHeight : 0
        return Math.abs((wall - d.cy + d.radius * ( d.vy < 0 ? 1 : -1))/d.vy)
      }
    },
    buildChanges = (d, direction) => {
      if(direction == 'x'){
        return [{ objectID: d.id, vx: -d.vx }]
      } else {
        return [{ objectID: d.id, vy: -d.vy }]
      }
    }

    var direction = (timeToWall(d, 'y') < timeToWall(d, 'x')) ? 'y' : 'x'
    var eventParams = {
      duration: timeToWall(d, direction),
      description: describer(d, direction),
      changes: buildChanges(d, direction)
    }
    return new EventQueueEvent(eventParams)
  }

  updateData(event) {
    var updatedData = this.state.data.map((d, i) => {

    })
    event.changes.forEach((c) => {
      var newData
      if(newData = this.state.data.filter((d) => d.id == c.objectID)[0]){
        var changes = event.changes.filter((c) => c.objectID == d.id)
        changes.forEach((c) => {
          if(c.vx){ d.vx = c.vx }
          if(c.vy){ d.vy = c.vy }
        })
        return d
      }

    })
  }

  updateTransitionAttributes(event) {
    var newThing = new Map(this.state.data.map((d, i) => {
      var val = {
        duration: event.duration
      }
      var changed = false
      // I think the changes array should only have one change for any given ball,
      // so I could use .find instead of .filter,
      // but leaving it open to be an array in case I ever need it to have more than one change
      var changes = event.changes.filter((c) => c.objectID == d.id)
      val.callback = () => {
        if(!this.eventQueue.nextEvent){
          this.eventQueue.nextEvent = this.eventQueue.dequeue()
          // this is to trigger componentDidUpdate and render
          // seems like cheating though
          this.setState({something: true})
        }
      }

      return [d.id, val]
    }))
    newThing.forEach((v, k) => this.transitionAttributes.set(k, v))
  }

  updateData(event) {
    var updatedData = this.state.data
    var newThing = new Map(this.state.data.map((d, i) => {
      var changes = event.changes.filter((c) => c.objectID == d.id)
      var val = {
        duration: event.duration
      }
      changes.forEach((c) => {
        if(c.vx){
          updatedData[i].vx = c.vx
        }
        if(c.vy){
          updatedData[i].vy = c.vy
        }
      })
      updatedData[i].cx = val.cx = updatedData[i].cx + updatedData[i].vx * this.eventQueue.nextEvent.duration
      updatedData[i].cy = val.cy = updatedData[i].cy + updatedData[i].vy * this.eventQueue.nextEvent.duration

      if(changes.length){
        this.updateEventQueue(updatedData[i], i)
      }
      return [d.id, val]
    }))

    return updatedData

  }

  eventProcessor(event) {
    if(!this.state.paused){
      this.updateTransitionAttributes(event)
      var updatedData = this.updateData(event)
      var newState = {
        data: updatedData,
        currentEvent: this.eventQueue.nextEvent
      }
      this.eventQueue.nextEvent = null
      this.setState(newState)
    }
  }

  updateEventQueue(d, i){
    this.eventQueue.filter(
      (e) => e.changes.filter((c) => c.objectID == d.id).length > 0
    )
    this.eventQueue.enqueue(this.buildEvent(d, i))
    this.eventQueue.sort()
  }

  render(){
    return (
      <div>
        <button onClick={this.play.bind(this)}>Play</button>
        <button onClick={this.pause.bind(this)}>Pause</button>
        <svg width = {this.props.width} height = {this.props.height}>
          <g transform = {`translate(${this.margin.left},${this.margin.top})`} >
            <rect
              x = {0}
              y = {0}
              width = {this.innerWidth}
              height = {this.innerHeight}
              stroke = 'black'
              fill = 'white'
            />
            <ReactTransitionGroup component="g" className="view">
              <EventQueueLegend
                currentEvent = {this.state.currentEvent}
                eventQueue = {this.eventQueue}
                transitionAttributes = {{
                  duration: this.transitionAttributes.get(1) ? this.transitionAttributes.get(1).duration : 0
                }}
              >
              </EventQueueLegend>
              {
                this.state.data.map((d) => {
                  var a = this.transitionAttributes.get(d.id)
                  return (
                  <Ball
                    key={d.id}
                    fill={d.id==1 ? 'lightgray' : 'darkgray'}
                    cx = {(a || d).cx}
                    cy = {(a || d).cy}
                    r = {d.radius}
                    transitionAttributes = {a}
                    paused = {this.state.paused}
                  />
                )})
              }
            </ReactTransitionGroup>
          </g>
        </svg>
      </div>
    )
  }

  play(){
    this.setState({paused: false})
  }

  pause(){
    this.setState({paused: true})
  }

}

PriorityQueue.defaultProps = {
  margin: {top: 10, right: 10, bottom: 10, left: 10}
}
