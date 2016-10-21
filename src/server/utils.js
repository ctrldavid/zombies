const uuid = require('uuid');

// No idea how to do priorities yet. Possibly multiple queues pulled from disproportionately
const PRIORITY = {
  high: Symbol(),
  medium: Symbol(),
  low: Symbol(),
};

// Slices are chunks of information that are to be sent to the player
class Slice {
  constructor(data) {
    this.target = "a connection uuid?";
    this.priority = "an enum thing so it's consistent";
    this.created = Date.now();
    this.timeCritical = true;
    this.timeValid = 1000; //ms

    // UDP stuff?
    //this.needsAck = false;

    this.data = data;
  }

  serialise() {
    return JSON.stringify(this.data);
  }
};

class PrioritySender {
  constructor() {
    // Create queues for all the entries in PRIORITY. Takes the symbol values
    // and maps them to a kv-pair array of [symbol, []]
    this.queues = new Map(Object.values(PRIORITY).map(s => [s,[]]));
  }

  addSlice(slice) {
    this.queues.get(slice.priority).push(slice);
  }

  read(number) {
    // The number could be a number of bytes to read rather than just a count.
    // For now just pull from medium till I decide how to do this.
    const read = [];
    let slice;
    let queue = this.queues.get(PRIORITY.medium);
    const now = Date.now();

    while (number > 0) {
      slice = queue.shift(); //.pop would give a stack.
      if (slice.timeCritical === true && now > slice.created + slice.timeValid) {
        continue; // We were too slow with this slice, just drop it.
      }
      read.push(slice);
      // Could reduce by number of bytes of the slice.      
      number -= 1;
    }

    return read;
  }

};

class Connection {
  constructor(ws) {
    this.id = uuid.v4();
    console.log(this.id);
    this.ws = ws;
    this.sender = new PrioritySender();
    this.created = Date.now();
    this.ws.on('close', (...args) => {
      console.log("close?", args)
    })
  }

  send(slice) {
    this.ws.send(slice.serialise());
  }
}

class Service {
  constructor() {
    this.connections = new Map();
  }

  addConnection(connection) {
    this.connections.set(connection, {});
  }

  incoming() {
    console.warn("%s doesn't overide incoming message hook", this.serviceTag);
  }
}


export {PRIORITY, Slice, PrioritySender, Connection, Service};