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
    this.eventQueue = []
    this.transitionAttributes = []
  }

  componentWillMount() {
    this.createScales()
  }

  componentDidMount() {
    $.ajax({
      url: this.props.dataUrl,
      dataType: 'json',
      success: function(data) {
        formattedData = this.formatData(data)
        this.setState({
          data: formattedData,
        })
        this.buildEventQueue(formattedData)
        this.currentEvent = this.getNextEvent()
        this.processCurrentEvent()
      }.bind(this)
    });
  }

  componentWillUpdate() {
    this.createScales()
    if(this.currentEvent) {
      this.processCurrentEvent()
    }
    // this.currentEvent = this.getNextEvent()
  }

  componentDidUpdate() {
    // this.nextTransition()
    // this.currentEvent = null
  }

  buildEvent(d, i){
    var wall = (d.vx > 0) ? this.innerWidth : 0
    var time = (wall - d.cx + d.radius * ( d.vx < 0 ? 1 : -1))/d.vx
    var event = {
      time: time,
      changes: [{
        objectIndex: i,
        vx: -d.vx
      }]
    }

    wall = (d.vy > 0) ? this.innerHeight : 0
    time = (wall - d.cy + d.radius * ( d.vy < 0 ? 1 : -1))/d.vy
    if(time < event.time){
      event = {
        time: time,
        changes: [{ objectIndex: i, vy: -d.vy }]
      }
    }
    return event
  }

  buildEventQueue(formattedData) {
    this.eventQueue = []
    formattedData.forEach((d, i) => {
      var event = this.buildEvent(d, i)
      this.eventQueue.push(event)
    })
    this.sortEventQueue()
    return

    // dummy test data
    this.eventQueue = [
      {
        time: 300,
        changes: [
          { objectIndex: 0, vx: .1, vy: .2 }
        ]
      }, {
        time: 500,
        changes: [
          { objectIndex: 0, vx: .2, vy: .1 }
        ]
      }, {
        time: 200,
        changes: [
          { objectIndex: 0, vx: -.2, vy: -.1 }
        ]
      }, {
        time: 600,
        changes: [
          { objectIndex: 0, vx: -.1, vy: -.2 }
        ]
      }
    ]

  }

  sortEventQueue() {
    this.eventQueue.sort((a,b) => a.time < b.time ? -1 : +(a.time > b.time))
  }

  getNextEvent(){
    return this.eventQueue.shift()
  }

  formatData(data) {
    // data.forEach((d) => {
    // })
    return data;
  }

  createScales() {
    this.colorScale = d3.scaleOrdinal(eval('d3.'+this.props.colorScheme))
  }

  // nextTransition() {
  //   if(this.currentEvent){
  //     var updatedData = this.state.data
  //     this.currentEvent.changes.forEach((c) => {
  //       if(c.vx){
  //         updatedData[c.objectIndex].vx = c.vx
  //       }
  //       if(c.vy){
  //         updatedData[c.objectIndex].vy = c.vy
  //       }
  //
  //       this.eventQueue = this.eventQueue.filter(
  //         (event) => event.changes.filter(
  //           (change) => change.objectIndex == c.objectIndex
  //         )
  //       )
  //       var event = this.buildEvent(this.state.data[c.objectIndex], c.objectIndex)
  //       this.eventQueue.push(event)
  //       this.sortEventQueue()
  //     })
  //     this.setState({data: updatedData})
  //   }
  // }

  processCurrentEvent() {
    if(this.currentEvent){
      var updatedData = this.state.data
      this.transitionAttributes = this.state.data.map((d, i) => {
        var val = {
          duration: this.currentEvent.time
        }
        var changed = false
        // I think the changes array should only have one change for any given ball,
        // so I could use .find instead of .filter,
        // but leaving it open to be an array in case I ever need it to have more than one change
        this.currentEvent.changes
          .filter((c) => c.objectIndex == i)
          .forEach((c) => {
            if(c.vx){
              val.vx = c.vx
            }
            if(c.vy){
              val.vy = c.vy
            }
            changed = true
          })
        val.callback = () => {
          if(!this.currentEvent){
            this.currentEvent = this.getNextEvent()
          }
        }
        val.cx = updatedData[i].cx + updatedData[i].vx * this.currentEvent.time
        val.cy = updatedData[i].cy + updatedData[i].vy * this.currentEvent.time

        if(val.vx) { updatedData[i].vx = val.vx }
        if(val.vy) { updatedData[i].vy = val.vy }
        updatedData[i].cx = val.cx
        updatedData[i].cy = val.cy
        if(changed){
          this.updateEventQueue(updatedData[i], i)
        }
        return val
      })

      this.currentEvent = null
      this.setState({data: updatedData})
    }
  }

  updateEventQueue(d, i){
    this.eventQueue = this.eventQueue.filter((event) => {
      return event.changes.filter((c) => c.objectIndex == i).length > 0
    })
    var event = this.buildEvent(d, i)
    this.eventQueue.push(event)
    this.sortEventQueue()
    console.log(this.eventQueue)
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
              {
                this.state.data.map((d, i) => {
                  var a = this.transitionAttributes[i]
                  return (
                  <Ball
                    key={i}
                    fill={i ? 'lightgray' : 'darkgray'}
                    cx = {(a || d).cx}
                    cy = {(a || d).cy}
                    r = {d.radius}
                    transitionAttributes = {a}
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
