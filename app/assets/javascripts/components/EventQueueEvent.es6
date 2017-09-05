class EventQueueEvent {
  constructor(params) {
    this.duration = params.duration
    this.time = new Date().getTime() + params.duration
    this.description = params.description
    this.changes = params.changes
  }
}
