import GameService from './services/gameservice'
import Server from './server'


// Bootstrapping code:
let s = new Server();
let g = new GameService();
s.registerService(g);

global.setInterval(() => g.tick(), 3000);