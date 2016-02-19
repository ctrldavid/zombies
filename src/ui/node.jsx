import React from 'react';
import ReactDOM from 'react-dom';

const Node = (props) => {
  const transform = "translate(" + props.x + "px, " + props.y + "px" + ")";
  const style = {
    transform
  };
  return <div className={props.className} style={style}></div>;
}

ReactDOM.render(
  <div>
    <Node className="node quarry" x="100" y="100"/>
    <Node className="node mine" x="400" y="200"/>
    <Node className="node forest" x="200" y="300"/>
  </div>, document.getElementById('content')
);