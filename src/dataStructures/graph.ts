export class Graph {
  vertices: Record<string, Vertex>;

  constructor() {
    this.vertices = {};
  }

  private hasVertex(id: string) {
    return !!this.vertices[id];
  }

  public addVertex(id: string) {
    const vertex = new Vertex();
    this.vertices[id] = vertex;
  }

  public addEdge(fromId: string, toId: string, weight = 1) {
    if (!this.hasVertex(fromId)) {
      this.addVertex(fromId);
    }
    if (!this.hasVertex(toId)) {
      this.addVertex(toId);
    }
    this.vertices[fromId].addEdge(toId, this.vertices[toId], weight);
  }
}

class Vertex {
  edges: {
    toVertexId: string;
    toVertex: Vertex;
    weight: number;
  }[];
  constructor() {
    this.edges = [];
  }

  public addEdge(toVertexId: string, toVertex: Vertex, weight: number) {
    this.edges.push({ toVertexId, toVertex, weight });
  }
}
