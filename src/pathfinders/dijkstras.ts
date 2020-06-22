import { MinHeap, Graph } from '../dataStructures';
interface IVertex {
  vertexId: string;
  fromVertexId?: string;
}
export function dijkstras(startId: string, endId: string, graph: Graph) {
  const heap = new MinHeap<IVertex>();
  const visits: string[] = [];

  const visitedToFrom: any = {}; //{[key: string]: string}

  heap.add({ value: 0, payload: { vertexId: startId } });

  while (heap.size > 0) {
    const currentVertex = heap.poll();
    const currentVertexId: string = currentVertex.payload.vertexId;
    visits.push(currentVertexId);

    visitedToFrom[currentVertexId] = currentVertex.payload.fromVertexId;
    if (currentVertexId === endId) {
      break;
    }
    // loop over edges calculating new value and adding to the heap
    const edges = graph.getVertexEdges(currentVertexId);
    for (let edge of edges) {
      // check if vertex was visited
      if (visits.includes(edge.toVertexId)) {
        continue;
      }
      // check if in heap already
      const existingHeapItem = heap.getByProperty('vertexId', edge.toVertexId);
      if (existingHeapItem) {
        const existingValue = existingHeapItem.value;
        const newValue = currentVertex.value + edge.weight;
        if (existingValue > newValue) {
          heap.updateValueByProperty('vertexId', edge.toVertexId, newValue);
        }
      } else {
        heap.add({
          value: edge.weight + currentVertex.value,
          payload: { vertexId: edge.toVertexId, fromVertexId: currentVertexId },
        });
      }
    }
  }

  let lastId = visits[visits.length - 1];

  const path: string[] = [];

  while (lastId) {
    path.unshift(lastId);
    lastId = visitedToFrom[lastId];
  }
  return { path, visits };
}
