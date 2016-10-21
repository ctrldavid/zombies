import {Connection} from './utils'
const ws = require('ws');

/*
  Server -> Client communication will be push based, with the server deciding when
  and what to send to the client. Each 'sender' module will need its own 
  heuristic for determining what is important to send.
  It would be nice to have some way of pulling pending frames from each sender
  so that the overall framework can grab frames from all senders until 
  the websocket message is 'full' (which i guess would depend on the client's 
  bandwidth? And time if it's taking ages to fill the message.)
*/

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


export default Server;