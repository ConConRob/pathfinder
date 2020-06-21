import React, { useState } from 'react';
import { Grid } from './Grid';
import { Graph } from '../../dataStructures';
export type tCoords = [number, number];

export function PathFinder() {
  const [startCoords, setStartCoords] = useState<tCoords>([1, 1]);
  const [endCoords, setEndCoords] = useState<tCoords>([3, 3]);
  const [dimensions, setDimensions] = useState<tCoords>([5, 5]);

  function setStartOrEndCoords(type: 'start' | 'end', newCoords: tCoords) {
    if (type === 'start') {
      setStartCoords(newCoords);
    } else if (type === 'end') {
      setEndCoords(newCoords);
    }
  }

  function runPathFinder() {
    const graph = generateGraph();
    console.log(graph);
  }

  function generateGraph(): Graph {
    const graph = new Graph();

    function generateId(x: number, y: number): string {
      return `${x}.${y}`;
    }
    // add vertices
    for (let x = 0; x < dimensions[0]; x++) {
      for (let y = 0; y < dimensions[1]; y++) {
        graph.addVertex(generateId(x, y));
      }
    }
    // add edges
    for (let x = 0; x < dimensions[0]; x++) {
      for (let y = 0; y < dimensions[1]; y++) {
        // calculate 4 neighbors and check if in dimensions. If so add edge
        const currentId = generateId(x, y);
        // top
        if (y - 1 >= 0) {
          graph.addEdge(currentId, generateId(x, y - 1), 1);
        } else {
        }
        // right
        if (x + 1 < dimensions[0]) {
          graph.addEdge(currentId, generateId(x + 1, y), 1);
        }
        // bottom
        if (y + 1 < dimensions[1]) {
          graph.addEdge(currentId, generateId(x, y + 1), 1);
        }
        // left
        if (x - 1 >= 0) {
          graph.addEdge(currentId, generateId(x - 1, y), 1);
        }
      }
    }
    return graph;
  }

  return (
    <>
      <button onClick={runPathFinder}>RUN PATH FINDER</button>
      <Grid
        rows={dimensions[1]}
        columns={dimensions[0]}
        startPoint={startCoords}
        endPoint={endCoords}
        setStartOrEndCoords={setStartOrEndCoords}
      />
    </>
  );
}
