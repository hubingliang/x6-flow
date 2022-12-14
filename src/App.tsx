import React, { useEffect } from "react";
import { Graph } from "@antv/x6";
import "./App.css";
import "reactflow/dist/style.css";
import { flow } from "./lib/flow";
import FlowCase from "./Flow";
export interface WobbleArgs {
  spread?: number;
  raw?: boolean;
}

Graph.registerConnector("flow", flow, true);

const App = () => {
  let container: any = null;

  useEffect(() => {
    const graph = new Graph({
      container: container,
      grid: true,
      connecting: {
        anchor: {
          name: "midSide",
          args: {
            // rotate: true,
          },
        },
      },
    });
    const rect1 = graph.addNode({
      x: 30,
      y: 30,
      width: 100,
      height: 40,
      label: "hello1",
    });

    const rect2 = graph.addNode({
      x: 30,
      y: 240,
      width: 100,
      height: 40,
      label: "world2",
    });

    const rect3 = graph.addNode({
      x: 300,
      y: 30,
      width: 100,
      height: 40,
      label: "hello3",
    });

    const rect4 = graph.addNode({
      x: 300,
      y: 240,
      width: 100,
      height: 40,
      label: "world4",
    });
    const rect5 = graph.addNode({
      x: 167,
      y: 124,
      width: 100,
      height: 40,
      label: "world5",
    });
    graph.addEdge({
      source: rect5,
      target: rect4,

      connector: {
        name: "flow",
        args: {
          spread: 16,
        },
      },
    });
    console.log("rect5: ", rect5);
    graph.addEdge({
      source: rect1,
      target: rect5,

      connector: {
        name: "flow",
      },
    });
    graph.addEdge({
      source: rect5,
      target: rect2,

      connector: {
        name: "flow",
      },
    });
    graph.addEdge({
      source: rect3,
      target: rect5,

      connector: {
        name: "flow",
      },
    });
  }, [container]);

  const refContainer = (_container: HTMLDivElement) => {
    container = _container;
  };
  return (
    <div className="app">
      <div className="wrapper">
        <div className="app-content" ref={refContainer} />
      </div>
      <FlowCase></FlowCase>
    </div>
  );
};
export default App;
