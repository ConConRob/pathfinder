import React, { useState, useEffect } from 'react';
import { Grid } from './Grid';
import { Graph } from '../../dataStructures';
import { dijkstras } from '../../pathfinders';
import { generateId } from '../../util';

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
  isRememberLast?: boolean;
}

interface IIntervalCommand {
  coords: tCoords[];
  class: string;
  time: number;
}

export function PathFinder() {
  const [dimensions, setDimensions] = useState<tCoords>([50, 25]);
  const [startCoords, setStartCoords] = useState<tCoords>([1, 1]);
  const [endCoords, setEndCoords] = useState<tCoords>([3, 3]);
  const [walls, setWalls] = useState<tCoords[]>([]);
  const [currentInterval, setCurrentInterval] = useState<number | undefined>();

  function setStartOrEndCoords(type: 'start' | 'end', newCoords: tCoords) {
    reset();

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
    reset();
    const graph = generateGraph();
    const raw = dijkstras(
      generateId(...startCoords),
      generateId(...endCoords),
      graph
    );
    const coordsVisited: any = raw.visits
      .slice(1, raw.visits.length - 2)
      .map((visit) =>
        visit.split('.').map((string) => Number.parseInt(string))
      );
    const path: any = raw.path
      .slice(1, raw.path.length - 1)
      .map((path) => path.split('.').map((string) => Number.parseInt(string)));

    const intervalCommands: IIntervalCommand[] = [
      { coords: coordsVisited, class: 'visit', time: 10 },
      { coords: path, class: 'path', time: 70 },
    ];

    runIntervalCommands(intervalCommands);
  }

  function runIntervalCommands(
    intervalCommands: IIntervalCommand[],
    waitToStartTime = 0
  ) {
    const currentIntervalCommand = intervalCommands.shift();
    if (!currentIntervalCommand) {
      return;
    }
    setTimeout(() => {
      const length = currentIntervalCommand?.coords.length || 0;
      let i = 0;
      const interval = setInterval(() => {
        if (i === length) {
          clearInterval(interval);
          setCurrentInterval(undefined);
          // run next interval
          runIntervalCommands(intervalCommands, 500);
          return;
        }
        const coord = currentIntervalCommand.coords[i++];
        const x = coord[0];
        const y = coord[1];
        const cell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
        const item = cell?.querySelector('div');
        if (item) {
          item.className = `item ${currentIntervalCommand.class}`;
        }
      }, currentIntervalCommand.time);
      setCurrentInterval(interval);
    }, waitToStartTime);
  }

  function reset() {
    if (currentInterval) {
      clearInterval(currentInterval);
    }
    debugger;
    const items = document.querySelectorAll('.item');
    items.forEach((item) => (item.className = 'item'));
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

  return (
    <>
      <button onClick={runPathFinder}>RUN PATH FINDER</button>
      <button
        onClick={() => {
          reset();
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
        walls={walls}
        toggleGraphItem={toggleGraphItem}
      />
    </>
  );
}
