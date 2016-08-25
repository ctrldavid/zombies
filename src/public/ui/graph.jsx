import React from 'react';
import {TestAction} from './actions/test'

const Node = (props) => {
  let x = props.x.toFixed(2);
  let y = props.y.toFixed(2);
  const transform = "translate(" + x + "px, " + y + "px" + ")";
  const style = {
    transform
  };

  const classes = [
    props.className,
    props.node.active?"quarry":"forest"
  ];

  const mouseEvents = {
    onMouseOver: () => TestAction.emit(props.node)
  };

  return <div className={classes.join(" ")} style={style} {...mouseEvents}></div>;
}

const Edge = (props) => {
  const translate = "translate(" + props.x1 + "px, " + props.y1 + "px" + ")";
  const angle = Math.atan2(props.y2 - props.y1, props.x2 - props.x1);
  const rotate = "rotate(" + angle + "rad)";
  const transform = [translate, rotate].join(" ");
  const width = Math.hypot(props.y2-props.y1, props.x2-props.x1);
  const style = {
    transform,
    width
  };
  return <div className={props.className} style={style}></div>;
}

const Graph = (props) => {
  return <div>
    {
      props.graph.edges.map((edge) => {
        return <Edge key={edge.id} className="edge" x1={edge.start.x} y1={edge.start.y} x2={edge.end.x} y2={edge.end.y} />
      })
    }{
      props.graph.nodes.map((node) => {
        return <Node node={node} key={node.id} className="node" x={node.x} y={node.y} />
      })
    }
  </div>
}

export {Graph, Edge, Node};

// ReactDOM.render(
//   <div>
//     <Edge className="edge" x1="100" y1="100" x2="200" y2="300" />
//     <Edge className="edge" x1="100" y1="100" x2="400" y2="200" />
//     <Edge className="edge" x1="400" y1="200" x2="200" y2="300" />
//     <Node className="node quarry" x="100" y="100"/>
//     <Node className="node mine" x="400" y="200"/>
//     <Node className="node forest" x="200" y="300"/>

//   </div>, document.getElementById('content')
// );
