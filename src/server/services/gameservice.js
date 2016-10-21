import {Service, Slice} from '../utils';

class GameService extends Service {
  constructor() {
    super();
    this.serviceTag = "test";
    this.games = ["game 1", "game 2", "game 3"];
    setInterval(() => {
      if (Math.random()*10 < this.games.length) {
        this.games.splice(0|Math.random()*this.games.length,1);
      }
      if (Math.random()*10 > this.games.length) {
        this.games.push("game_" + (0|Math.random()*16*16).toString(16));
      }
    }, 7000);
    // Should be a weakmap? It will hold what each connection has already been sent.
    this.connectionState = new Map();
  }

  incoming(connection, message) {
    if (!this.connections.has(connection)) {
      console.log("adding %s to %s connections", connection.id, this.serviceTag);
      this.addConnection(connection);
      this.connectionState.set(connection, {lastUpdated:{}});
    }
  }

  getSliceFor(connection) {
    let now = Date.now();
    let state = this.connectionState.get(connection);    
    console.log("keys", [...this.connectionState.keys()][0].id);
    console.log("state", state);
    console.log("games", this.games);

    let toSend = this.games.filter((game) => {
      return (!state.lastUpdated[game] || state.lastUpdated[game] + 10000 < now)
    });
    let removed = [];
    if (state && state.lastUpdated) {
      removed = Object.keys(state.lastUpdated).filter((game) => {
        return this.games.indexOf(game) === -1
      });
    }
    
    for (let game of toSend) {
      this.connectionState.get(connection).lastUpdated[game] = now;
    }
    for (let game of removed) {
      delete this.connectionState.get(connection).lastUpdated[game];
    }

    return new Slice({gamelist: toSend, removed}); //toSend;
  }

  tick() {
    console.log("tick");
    let connection;
    for (connection of this.connections.keys()) {      
      connection.send(this.getSliceFor(connection));
    }
  }
}

export default GameService;