// module "graph"

let edgeId = 0;
let nodeId = 0;

class Edge {
  constructor (start, end) {
    this.start = start;
    this.end = end;
    this.id = edgeId++;
  }
};

class Node {
  constructor (type) {
    this.edges = [];
    this.type = type;
    this.id = nodeId++;
  }

  // Find adjacent nodes by searching through the edge list.
  adj () {
    return this.edges.map((edge) => edge.start === this? edge.end : edge.start);
  }

  // This used to be a splice, but now it's a filter. Dunno which is faster.
  remove (edge) {
    this.edges = this.edges.filter(edge2 => edge != edge2);
  }

  findNearest (type) {
    // This algo radiates outward from the current node.
    // It will return all the found nodes at the nearest distance.
    let search = [this];
    let distance = 0;
    let touched = [];
    
    let found;
    while (search.length > 0) {
      // move the current nodes into touched.
      touched.push(search);
      // move all the adjacent nodes into the current list.
      search = search.reduce((adj, current) => adj.push(current.adj()), []);
      // bump up the distance
      distance += 1;

      found = search.filter((node) => node.type === type);
      if (found.length > 0) {
        return {distance: distance, results: found};
      }
    }
  }
};

class Graph {
  constructor () {
    this.nodes = [];
    this.edges = [];
  }
  
  add (node) {
    this.nodes.push(node);
  }
  
  remove (node) {
    // find it in the nodes list and remove it
    this.nodes = this.nodes.filter(node2 => node != node2);
    
    // remove its edges
    node.edges.forEach(edge => {
      // find in the graph and remove it
      this.edges = this.edges.filter(edge2 => edge != edge2);

      // remove from node's edge list
      edge.start.remove(edge);
      edge.end.remove(edge);
    });
  }

  link (node1, node2) {
    // TODO: check that nodes are in the graph
    let edge = new Edge(node1, node2);
    this.edges.push(edge);
    node1.edges.push(edge);
    node2.edges.push(edge);
  }
};

export {Edge, Node, Graph}