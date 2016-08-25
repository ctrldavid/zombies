import React from 'react';
import {MapUI} from './map.jsx';
import {MainMenuUI} from './menu/main.jsx'

const MainGameUI = (props) => {
  const map = props.game.map;
  return <div>
    <MapUI map={map} />
    <div className="menu">
      <MainMenuUI />
    </div>
  </div>;
};

export {MainGameUI};
