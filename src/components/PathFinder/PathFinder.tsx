import React, { useState, useEffect } from 'react';
import { Grid } from './Grid';
import { Graph } from '../../dataStructures';
import { dijkstras } from '../../pathfinders';
import { generateId } from '../../util';
import { CELL_DELAY_TIME_MS } from '../../constants';

export type tCoords = [number, number];

export enum DisplayType {
  Path = 'path',
  Visit = 'visit',
  UndoVisit = 'undo visit',
  Untouched = 'untouched',
}
export interface IDisplayCommand {
  command: DisplayType;
  coords: tCoords[];
}

export function PathFinder() {
  const [dimensions, setDimensions] = useState<tCoords>([20, 20]);
  const [startCoords, setStartCoords] = useState<tCoords>([1, 1]);
  const [endCoords, setEndCoords] = useState<tCoords>([3, 3]);
  const [walls, setWalls] = useState<tCoords[]>([]);

  const [displayCommands, setDisplayCommands] = useState<IDisplayCommand[]>([]);
  const [currentDisplayCommandIndex, setCurrentDisplayCommandIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (displayCommands.length === 0) {
      setCurrentDisplayCommandIndex(null);
    } else {
      setCurrentDisplayCommandIndex(0);
    }
  }, [displayCommands]);

  function nextCommand() {
    if (
      currentDisplayCommandIndex !== null &&
      displayCommands.length - 1 > currentDisplayCommandIndex
    ) {
      setCurrentDisplayCommandIndex(currentDisplayCommandIndex + 1);
    }
  }

  function setStartOrEndCoords(type: 'start' | 'end', newCoords: tCoords) {
    if (type === 'start') {
      setStartCoords(newCoords);
    } else if (type === 'end') {
      setEndCoords(newCoords);
    }
  }

  function isWall(coord: tCoords) {
    return !!walls.find((wall) => wall[0] === coord[0] && wall[1] === coord[1]);
  }

  function toggleGraphItem(coord: tCoords) {
    if (!isWall(coord)) {
      // add the wall
      setWalls((oldWalls) => [...oldWalls, coord]);
    } else {
      // remove the wall
      setWalls((oldWalls) =>
        oldWalls.filter(
          (oldWall) => oldWall[0] !== coord[0] || oldWall[1] !== coord[1]
        )
      );
    }
  }

  function runPathFinder() {
    setDisplayCommands([]);
    const graph = generateGraph();
    const raw = dijkstras(
      generateId(...startCoords),
      generateId(...endCoords),
      graph
    );
    const coordsVisited: any = raw.visits.map((visit) =>
      visit.split('.').map((string) => Number.parseInt(string))
    );
    const path: any = raw.path.map((path) =>
      path.split('.').map((string) => Number.parseInt(string))
    );

    setDisplayCommands([
      { command: DisplayType.Visit, coords: coordsVisited.slice(0, -1) },
      { command: DisplayType.Path, coords: path },
    ]);
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
        if (y - 1 >= 0 && !isWall([x, y - 1])) {
          graph.addEdge(currentId, generateId(x, y - 1), 1);
        } else {
        }
        // right
        if (x + 1 < dimensions[0] && !isWall([x + 1, y])) {
          graph.addEdge(currentId, generateId(x + 1, y), 1);
        }
        // bottom
        if (y + 1 < dimensions[1] && !isWall([x, y + 1])) {
          graph.addEdge(currentId, generateId(x, y + 1), 1);
        }
        // left
        if (x - 1 >= 0 && !isWall([x - 1, y])) {
          graph.addEdge(currentId, generateId(x - 1, y), 1);
        }
      }
    }
    return graph;
  }

  const displayCommand =
    currentDisplayCommandIndex !== null
      ? displayCommands[currentDisplayCommandIndex]
      : null;
  console.log(displayCommand);
  return (
    <>
      <button onClick={runPathFinder}>RUN PATH FINDER</button>
      <button
        onClick={() => {
          setDisplayCommands([]);
          // setWalls([]);
        }}
      >
        RESET
      </button>
      <Grid
        rows={dimensions[1]}
        columns={dimensions[0]}
        startPoint={startCoords}
        endPoint={endCoords}
        setStartOrEndCoords={setStartOrEndCoords}
        toggleGraphItem={toggleGraphItem}
        walls={walls}
        displayCommand={displayCommand}
        nextCommand={nextCommand}
      />
    </>
  );
}
