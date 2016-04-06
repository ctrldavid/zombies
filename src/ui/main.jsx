import React from 'react';
import {MapUI} from './map.jsx';

const MainGameUI = (props) => {
  const map = props.game.map;
  return <MapUI map={map} />;
};

export {MainGameUI};