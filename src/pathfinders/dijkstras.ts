import { MinHeap, Graph } from '../dataStructures';
export function dijkstras(startId: string, endId: string, graph: Graph) {
  const heap = new MinHeap<{ vertexId: string; fromVertexId?: string }>();
  const visits: string[] = [];

  heap.add({ value: 0, payload: { vertexId: startId } });

  while (heap.size > 0) {
    const currentVertex = heap.poll();
    const currentVertexId = currentVertex.payload.vertexId;
    visits.push(currentVertexId);
    if (currentVertexId === endId) {
      break;
    }
    console.log(currentVertex.value);
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
  return { path: [], visits };
}
