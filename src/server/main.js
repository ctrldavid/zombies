const ws = require('ws');
const uuid = require('uuid');

/*
  Server -> Client communication will be push based, with the server deciding when
  and what to send to the client. Each 'sender' module will need its own 
  heuristic for determining what is important to send.
  It would be nice to have some way of pulling pending frames from each sender
  so that the overall framework can grab frames from all senders until 
  the websocket message is 'full' (which i guess would depend on the client's 
  bandwidth? And time if it's taking ages to fill the message.)
*/

// No idea how to do priorities yet. Possibly multiple queues pulled from disproportionately
const PRIORITY = {
  high: Symbol(),
  medium: Symbol(),
  low: Symbol(),
};

// Slices are chunks of information that are to be sent to the player
class Slice {
  constructor() {
    this.target = "a connection uuid?";
    this.priority = "an enum thing so it's consistent";
    this.created = Date.now();
    this.timeCritical = true;
    this.timeValid = 1000; //ms

    // UDP stuff?
    //this.needsAck = false;
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
  }
}

class Server {
  constructor() {
    this.connections = [];
    this.webSocketServer =  new ws.Server({ port: 8081 });

    // Services register themselves with the server with a string.
    // Any incoming messages that are tagged with that string get sent
    // to the appropriate service.
    this.services = {};

    this.initWebsocket();
  }

  initWebsocket() {
    this.webSocketServer.on('connection', (ws) => {
      // Create a connection object to track information about this.
      const connection = new Connection(ws);

      ws.on('message', (message) => {
        try {
          message = JSON.parse(message);
        } catch(e) {
          ws.send("send object plz.");
        }
        console.log('received: %s from %s', message, connection.id);
        if (message.service && this.services[message.service]) {
          this.services[message.service].incoming(connection, message);
        } else {
          ws.send("Sorry need a service.");
        };
      });

      ws.send('something else');
    });
  }

  registerService (service) {
    console.log("New service registered to listen to channel %s", service.serviceTag);
    this.services[service.serviceTag] = service;
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

class GameService extends Service {
  constructor() {
    super();
    this.serviceTag = "test";
    this.games = ["game 1", "game 2", "game 3"];
  }

  incoming (connection, message) {
    if (!this.connections.has(connection)) {
      console.log("adding %s to %s connections", connection.id, this.serviceTag);
      this.addConnection(connection);
    }
  }
}

// Bootstrapping code:
let s = new Server();
let g = new GameService();
s.registerService(g);