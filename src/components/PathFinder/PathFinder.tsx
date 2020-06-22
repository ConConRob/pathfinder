import React, { useState } from 'react';
import { Grid } from './Grid';
import { Graph } from '../../dataStructures';
import { dijkstras } from '../../pathfinders';
import { generateId } from '../../util';
export type tCoords = [number, number];

export function PathFinder() {
  const [dimensions, setDimensions] = useState<tCoords>([20, 20]);
  const [startCoords, setStartCoords] = useState<tCoords>([1, 1]);
  const [endCoords, setEndCoords] = useState<tCoords>([3, 3]);
  const [walls, setWalls] = useState<tCoords>([]);

  const [isMouseDown, setIsMouseDown] = useState(false);

  const [visitedCoords, setVisitedCoords] = useState<tCoords[]>([]);
  function setStartOrEndCoords(type: 'start' | 'end', newCoords: tCoords) {
    if (type === 'start') {
      setStartCoords(newCoords);
    } else if (type === 'end') {
      setEndCoords(newCoords);
    }
  }

  function runPathFinder() {
    setVisitedCoords([]);
    debugger;
    const graph = generateGraph();
    const raw = dijkstras(
      generateId(...startCoords),
      generateId(...endCoords),
      graph
    );
    const coordsVisited: any = raw.visits.map((visit) =>
      visit.split('.').map((string) => Number.parseInt(string))
    );
    setVisitedCoords(coordsVisited);
    // let i = 0;
    // const interval = setInterval(() => {
    //   if (i === coordsVisited.length) {
    //     window.clearInterval(interval);
    //   }
    //   setVisitedCoords(coordsVisited.slice(0, i++));
    // }, 30);
  }

  function generateGraph(): Graph {
    const graph = new Graph();

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
      <button onClick={() => setVisitedCoords([])}>RESET</button>
      <Grid
        rows={dimensions[1]}
        columns={dimensions[0]}
        startPoint={startCoords}
        endPoint={endCoords}
        setStartOrEndCoords={setStartOrEndCoords}
        visitedCoords={visitedCoords}
      />
    </>
  );
}
