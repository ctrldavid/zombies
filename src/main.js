import React from 'react';
import ReactDOM from 'react-dom';

import 'global.css';
import {MapGenerator} from 'map/map_generator';
import {MainGameUI} from 'ui/main.jsx';

import {Game} from 'game';

// console.log(Graph);
// console.log(MapGenerator);

let map = new MapGenerator();

const delay = (time) => new Promise((resolve) => window.setTimeout(resolve, time))
const render = () => {
  ReactDOM.render(
    <MainGameUI game={{map}}/>
    , document.getElementById('content')
  );
};

let gen = async function(){
  while (map.poisson()) {
    render();
    await delay(0);
  }
  console.time("voronoi");
  map.calcVoronoi();
  console.timeEnd("voronoi");
  console.dir(map);
  console.time("Delaunay");
  map.connectDelaunay();
  console.timeEnd("Delaunay");
  render();
  let g = new Game();
  g.map = map;
  console.log(g);
  g.render = render;
}

gen();

// window.setInterval(() =>{
//   map.step();
//   ReactDOM.render(
//     <Graph graph={map.graph} />
//     , document.getElementById('content')
//   );

// }, 10)





//logger("test");


// let werk = (n) => new Promise((resolve, reject) => window.setTimeout(resolve, n));

// let test = async function(){
//   logger("start");
//   await werk(100);
//   logger("1");
//   await werk(400);
//   logger("2");
//   await werk(1600);
//   logger("3");
//   await werk(800);
//   logger("4");
//   await werk(400);
//   logger("end");
// }


// test();
