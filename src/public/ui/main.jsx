import React from 'react';
import {MapUI} from './map.jsx';
import {MainMenuUI} from './menu/main.jsx'

const MainGameUI = (props) => {
  const map = props.game.map;
  return <div className="application">
      <MapUI map={map} />
      <MainMenuUI />
  </div>;
};

export {MainGameUI};
