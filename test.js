const CP = require('child_process');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});

// wss.broadcast = function broadcast(data) {
//   wss.clients.forEach(function each(client) {
//     client.send(data);
//   });
// };

//const server = spawn('ls', ['-la']);
//const server = spawn('webpack-dev-server',  ['--config webpack.config.dev.js', '--host 0.0.0.0'], {cwd:'./'});
//const server = spawn('which', ['webpack-dev-server']);

const server = CP.exec('webpack-dev-server --config webpack.config.dev.js --host 0.0.0.0');

server.stdout.on('data', (data) => {
  console.log(data.toString());
  wss.clients.forEach(function each(client) {
    client.send(data.toString());
  });

});

server.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);
});

server.on('error', (err) => {
  console.log(err);
});