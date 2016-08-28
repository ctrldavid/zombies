var ws = require('ws');

var WebSocketServer = ws.Server
  , wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});

let games = ["first game", "second game", "third game"];

console.log(games);





/*
  Server -> Client communication will be push based, with the server deciding when
  and what to send to the client. Each 'sender' module will need its own 
  heuristic for determining what is important to send.
  It would be nice to have some way of pulling pending frames from each sender
  so that the overall framework can grab frames from all senders until 
  the websocket message is 'full' (which i guess would depend on the client's 
  bandwidth? And time if it's taking ages to fill the message.)
*/


class PrioritySender {
  constructor() {
    console.log('hehehe');
  }
}


const x = new PrioritySender();