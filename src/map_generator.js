// Pick an active node
// Decide what type of new node to create
//   -> if it's a path, and at least 3 nodes away from a city, try a city.
//   -> etc
// Try to place it using annulus
//   -> fail? make inactive.

import {Graph, Node, Edge} from "./graph"
import Voronoi from '../lib/rhill-voronoi-core.js';


const TileTypes = {
  "city": Symbol(),
  "path": Symbol()
};

class MapGenerator {

  constructor () {
    this.scale = 75;
    this.graph = new Graph();
    this.activeNodes = [];
    this.voronoi = new Voronoi;
    this.vDiagram = undefined;

    let start = new Node(TileTypes.city);
    
    //DSX: Remove when sorted properly.
    start.x = 1000;
    start.y = 400;    
    
    this.graph.add(start);
    this.activeNodes.push(start);
  }

  newInAnnulus (node, minDist) {
    let dist = Math.random()*minDist + minDist;
    let direction = Math.random() * Math.PI * 2;
    let x = node.x + dist * Math.sin(direction);
    let y = node.y + dist * Math.cos(direction);
    return {x, y};
  }

  distance (node1, node2) {
    return Math.hypot(node1.x-node2.x, node1.y-node2.y);
  }
  clearance (node, distance) {
    return this.graph.nodes.filter((node2) => {
      return this.distance(node, node2) < distance
    }).length === 0;
    
  }

  edgeCheck (node) {
    let max = 3;
    return node.edges.length < max;  
  }

  // Use gorhill's voronoi lib
  calcVoronoi () {
    // Clean up if we are recalculating.
    if (this.vDiagram) {
      this.voronoi.recycle(this.vDiagram);
    }

    // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom
    const bbox = {xl: 30, xr: window.innerWidth-30, yt: 30, yb: window.innerHeight-30};

    let sites = this.graph.nodes;

    this.vDiagram = this.voronoi.compute(sites, bbox);
  }

  // Uses a calculated voronoi diagram to connect edges into delaunay triangulation
  connectDelaunay() {
    if (!this.vDiagram) {
      console.error("Cannot construct delaunay traingulation without first calculating voronoi.");
      return false;
    }
    this.vDiagram.edges.forEach((edge) => {
      if (edge.rSite && edge.lSite) {  // Some edges are border edges.
        this.graph.link(edge.rSite, edge.lSite);
      }
    });
  }

  //Wilson’s algorithm (loop-erased random walk)
  uniformSpanningTree() {
    // Add a random node to the tree
    // Loop:
    //   Select a random node not in the tree
    //   Random walk to a new node.
    //     If the node is in the walk already then erase the loop you just created.
    //     If the node is in the tree then add the entire walk to the tree and loop.

  }

  // Bridson’s algorithm for Poisson-disc sampling.
  poisson () {
    if (this.activeNodes.length === 0){ return false; }
    let currentNode = this.activeNodes[0| Math.random() * this.activeNodes.length];
    let targetType;
    if (currentNode.type === TileTypes.city) {
      targetType = TileTypes.path;
    }
    if (currentNode.type === TileTypes.path) {
      let nearestCity = currentNode.findNearest(TileTypes.city);
      if (nearestCity.distance > 3) {
        targetType = TileTypes.city;
      } else {
        targetType = TileTypes.path;
      }
    }

    let newNode;
    for (let attempt = 0; attempt < 50; attempt++) {
      let {x, y} = this.newInAnnulus(currentNode, this.scale);
      
      if (!this.clearance({x, y}, this.scale)) { continue; }
      if (window.innerWidth-30 < x) { continue; }
      if (x < 30) { continue; }
      if (window.innerHeight-30 < y) { continue; }
      if (y < 30) { continue; }
      if (!this.edgeCheck(currentNode)) { continue; }


      newNode = new Node(TileTypes.city);
      
      newNode.x = x;
      newNode.y = y;

      this.graph.add(newNode);
      this.activeNodes.push(newNode);

      break;
    }
    if (!newNode) {
      this.activeNodes = this.activeNodes.filter((node) => node != currentNode);
    }
    return true;
  }
}


export {MapGenerator}