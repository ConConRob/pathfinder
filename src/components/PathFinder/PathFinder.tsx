import React, { useState } from 'react';
import { Grid } from './Grid';
import { Graph } from '../../dataStructures';
import { dijkstras, generateMaze } from '../../pathfinders';
import { generateId } from '../../util';
import { Menu } from './Menu';

export type tCoords = [number, number];
export type tAlgorithm = 'Dijkstras' | 'Dfs' | 'Bfs';
export type tMaterial = 'Sand' | 'Clear' | 'Wall';

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
  delayTime?: number;
}

export function PathFinder() {
  const [dimensions, setDimensions] = useState<tCoords>([40, 20]);
  const [startCoords, setStartCoords] = useState<tCoords>([0, 0]);
  const [endCoords, setEndCoords] = useState<tCoords>([3, 3]);
  const [walls, setWalls] = useState<{ coord: tCoords; material: tMaterial }[]>(
    []
  );
  const [currentInterval, setCurrentInterval] = useState<number | undefined>();
  const [paintingMaterial, setPaintingMaterial] = useState<tMaterial>('Wall');
  function setStartOrEndCoords(type: 'start' | 'end', newCoords: tCoords) {
    reset();

    if (type === 'start') {
      setStartCoords(newCoords);
    } else if (type === 'end') {
      setEndCoords(newCoords);
    }
  }

  function spaceType(coord: tCoords) {
    const wall = walls.find(
      (wall) => wall.coord[0] === coord[0] && wall.coord[1] === coord[1]
    );
    return wall?.material || 'Clear';
  }

  function toggleGraphItem(coord: tCoords) {
    // if it is a start or end point ignore
    if (coord[0] === startCoords[0] && coord[1] === startCoords[1]) {
      return;
    }
    if (coord[0] === endCoords[0] && coord[1] === endCoords[1]) {
      return;
    }
    setWalls((oldWalls) => {
      // filter out at this location
      const newWalls = oldWalls.filter(
        (oldWall) =>
          oldWall.coord[0] !== coord[0] || oldWall.coord[1] !== coord[1]
      );
      if (paintingMaterial !== 'Clear') {
        newWalls.push({ coord, material: paintingMaterial });
      }
      return newWalls;
    });
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
      { coords: coordsVisited, class: 'visit', time: 30 },
      { coords: path, class: 'path', time: 70, delayTime: 500 },
      { coords: [endCoords], class: 'found', time: 70 },
    ];

    runIntervalCommands(intervalCommands);
  }

  function runIntervalCommands(intervalCommands: IIntervalCommand[]) {
    const currentIntervalCommand = intervalCommands.shift();
    if (!currentIntervalCommand) {
      return;
    }
    const waitToStartTime = currentIntervalCommand.delayTime || 0;
    setTimeout(() => {
      const length = currentIntervalCommand?.coords.length || 0;
      let i = 0;
      const interval = setInterval(() => {
        if (i === length) {
          clearInterval(interval);
          setCurrentInterval(undefined);
          // run next interval
          runIntervalCommands(intervalCommands);
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
    const items = document.querySelectorAll('.item');
    items.forEach((item) => (item.className = 'item'));
    const startCell = document.querySelector(
      `[data-x="${startCoords[0]}"][data-y="${startCoords[1]}"]`
    );
    const startItem = startCell?.querySelector('div');
    if (startItem) startItem.className = 'item start';
    const endCell = document.querySelector(
      `[data-x="${endCoords[0]}"][data-y="${endCoords[1]}"]`
    );
    const endItem = endCell?.querySelector('div');
    if (endItem) endItem.className = 'item end';
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
        const SAND_VALUE = 30;
        if (y - 1 >= 0 && spaceType([x, y - 1]) !== 'Wall') {
          if (spaceType([x, y - 1]) === 'Sand')
            graph.addEdge(currentId, generateId(x, y - 1), SAND_VALUE);
          else graph.addEdge(currentId, generateId(x, y - 1), 1);
        } else {
        }
        // right
        if (x + 1 < dimensions[0] && spaceType([x + 1, y]) !== 'Wall') {
          if (spaceType([x + 1, y]) === 'Sand')
            graph.addEdge(currentId, generateId(x + 1, y), SAND_VALUE);
          else graph.addEdge(currentId, generateId(x + 1, y), 1);
        }
        // bottom
        if (y + 1 < dimensions[1] && spaceType([x, y + 1]) !== 'Wall') {
          if (spaceType([x, y + 1]) === 'Sand')
            graph.addEdge(currentId, generateId(x, y + 1), SAND_VALUE);
          else graph.addEdge(currentId, generateId(x, y + 1), 1);
        }
        // left
        if (x - 1 >= 0 && spaceType([x - 1, y]) !== 'Wall') {
          if (spaceType([x - 1, y]) === 'Sand')
            graph.addEdge(currentId, generateId(x - 1, y), SAND_VALUE);
          else graph.addEdge(currentId, generateId(x - 1, y), 1);
        }
      }
    }
    return graph;
  }

  return (
    <>
      <Menu
        algorithm="Dijkstras"
        setAlgorithm={(name: tAlgorithm) => {}}
        material={paintingMaterial}
        setMaterial={setPaintingMaterial}
        generateMaze={() => {
          reset();
          setWalls(
            generateMaze(
              dimensions[0],
              dimensions[1],
              startCoords
            ).map((coord) => ({ coord, material: 'Wall' }))
          );
        }}
        reset={() => {
          reset();
          setWalls([]);
        }}
        play={runPathFinder}
      />

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
