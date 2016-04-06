import {MapGenerator} from './map/map_generator';
import {Player} from './player'

import {TestAction} from './ui/actions/test'

class Game {
  constructor () {
    this.map = new MapGenerator();
    this.player = new Player();

    TestAction.on((node) => {
      node.active = true;
      node.edges.forEach((edge) => {
        edge.active = true;
      });
      this.render();
    })
  }
}

export {Game};