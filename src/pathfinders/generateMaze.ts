import { Graph } from '../dataStructures';
import { tCoords } from '../components/PathFinder';
import { generateId } from '../util';

export function generateMaze(
  columns: number,

  rows: number,
  startCoord: tCoords
) {
  const graph = new Graph();
  const graphRows = Math.ceil(rows / 2);
  const graphColumns = Math.ceil(columns / 2);

  for (let x = 0; x < graphColumns / 2; x++) {
    for (let y = 0; y < graphRows / 2; y++) {
      graph.addVertex(generateId(x, y));
    }
  }

  const stack = [generateId(startCoord[0], startCoord[1])];

  const visited: { [key: string]: true } = {
    [generateId(startCoord[0], startCoord[1])]: true,
  };
  while (stack.length) {
    const currentVertexId = stack.pop();
    if (currentVertexId) {
      const currentCoord = currentVertexId?.split('.').map((n) => parseInt(n));
      const [x, y] = currentCoord;

      const possibleNewPlaces = [];
      if (y - 1 >= 0 && !visited[generateId(x, y - 1)]) {
        possibleNewPlaces.push([x, y - 1]);
      } else {
      }
      // right
      if (x + 1 < graphColumns && !visited[generateId(x + 1, y)]) {
        possibleNewPlaces.push([x + 1, y]);
      }
      // bottom
      if (y + 1 < graphRows && !visited[generateId(x, y + 1)]) {
        possibleNewPlaces.push([x, y + 1]);
      }
      // left
      if (x - 1 >= 0 && !visited[generateId(x - 1, y)]) {
        possibleNewPlaces.push([x - 1, y]);
      }

      const nextVisited =
        possibleNewPlaces[Math.floor(Math.random() * possibleNewPlaces.length)];
      if (!nextVisited) continue;

      graph.addEdge(
        currentVertexId,
        generateId(nextVisited[0], nextVisited[1])
      );
      graph.addEdge(
        generateId(nextVisited[0], nextVisited[1]),
        currentVertexId
      );
      stack.push(currentVertexId);
      stack.push(generateId(nextVisited[0], nextVisited[1]));
      visited[generateId(nextVisited[0], nextVisited[1])] = true;
    }
  }

  const walls = [];
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      walls.push(generateId(x, y));
    }
  }

  for (let vertexId in graph.vertices) {
    const currentCoord = vertexId.split('.').map((n) => parseInt(n) * 2);
    const currentWallI = walls.findIndex(
      (wall) => wall === generateId(currentCoord[0], currentCoord[1])
    );
    if (currentWallI !== -1) {
      walls.splice(currentWallI, 1);
    }
    const edges = graph.vertices[vertexId].edges;

    for (let edge of edges) {
      const edgeCoord = edge.toVertexId.split('.').map((n) => parseInt(n) * 2);
      // if x value is larger at 1 to current x
      if (edgeCoord[0] > currentCoord[0]) edgeCoord[0]--;
      // if x is less minus 1 to current x
      else if (edgeCoord[0] < currentCoord[0]) edgeCoord[0]++;
      // if y value is larger at 1 to current y
      if (edgeCoord[1] > currentCoord[1]) edgeCoord[1]--;
      // if y is less minus 1 to current y
      else if (edgeCoord[1] < currentCoord[1]) edgeCoord[1]++;

      const edgeWallI = walls.findIndex(
        (wall) => wall === generateId(edgeCoord[0], edgeCoord[1])
      );
      if (edgeWallI !== -1) {
        walls.splice(edgeWallI, 1);
      }
    }
  }
  console.log(walls);
  return walls.map((w) => w.split('.').map((n) => parseInt(n))) as tCoords[];
}

function getBeside(x: number, y: number, maxX: number, maxY: number) {
  const returnCoords: number[] = [];

  const randomNumberX = Math.floor(Math.random() * 100);
  const randomNumberY = Math.floor(Math.random() * 100);
}
