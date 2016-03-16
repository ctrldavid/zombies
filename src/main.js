import React from 'react';
import ReactDOM from 'react-dom';

import './global.css';
import logger from './logger';
//import Hello from './ui/hello.jsx';
import {Graph} from './ui/Graph.jsx';
//import * as Graph from './graph/graph';
import {MapGenerator} from './map_generator';



// Fucking warnings. I hate doing this.
console.clear();

console.log(Graph);
console.log(MapGenerator);

let map = new MapGenerator;

let gen = () => {
  if(map.poisson()) {
    window.setTimeout(gen, 0);
  } else {
    map.calcVoronoi();
    console.dir(map);
    map.connectDelaunay();
  }
  ReactDOM.render(
    <Graph graph={map.graph} />
    , document.getElementById('content')
  );  
};

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