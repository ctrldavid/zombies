import React from 'react';
import {Graph} from './graph.jsx';

const MapUI = (props) => {
  const graph = props.map.graph;
  return <Graph graph={graph} />;
};

export {MapUI};
