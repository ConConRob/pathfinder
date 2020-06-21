interface INode<T> {
  payload: T;
  value: number;
}
export class MinHeap<T> {
  items: INode<T>[];
  size: number;
  constructor() {
    this.items = [];
    this.size = 0;
  }

  private getLeftChildIndex(index: number): number {
    return 2 * index + 1;
  }
  private getRightChildIndex(index: number): number {
    return 2 * index + 2;
  }
  private getParentIndex(index: number): number {
    return (index - 1) / 2;
  }

  private hasLeftChild(index: number): boolean {
    return this.getLeftChildIndex(index) < this.size;
  }
  private hasRightChild(index: number): boolean {
    return this.getRightChildIndex(index) < this.size;
  }
  private hasParent(index: number): boolean {
    return this.getParentIndex(index) >= 0;
  }

  private leftChild(index: number): INode<T> {
    return this.items[this.getLeftChildIndex(index)];
  }
  private rightChild(index: number): INode<T> {
    return this.items[this.getRightChildIndex(index)];
  }
  private parent(index: number): INode<T> {
    return this.items[this.getParentIndex(index)];
  }

  private swap(indexOne: number, indexTwo: number): void {
    const temp = this.items[indexOne];
    this.items[indexOne] = this.items[indexTwo];
    this.items[indexTwo] = temp;
  }

  private bubbleDown() {
    let index = this.size - 1;
    while (
      this.hasParent(index) &&
      this.parent(index).value > this.items[index].value
    ) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  private bubbleUp() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      if (
        this.hasRightChild(index) &&
        this.rightChild(index).value < this.leftChild(index).value
      ) {
        smallerChildIndex = this.getRightChildIndex(index);
      }

      if (this.items[index].value > this.items[smallerChildIndex].value) {
        this.swap(index, smallerChildIndex);
        index = smallerChildIndex;
      } else {
        break;
      }
    }
  }

  public peek(): INode<T> {
    if (this.size === 0) throw new Error('Heep is empty');
    return this.items[0];
  }

  public poll(): INode<T> {
    if (this.size === 0) throw new Error('Heep is empty');
    const item = this.items[0];
    this.items[0] = this.items[this.size - 1];
    this.size--;
    this.bubbleDown();
    return item;
  }

  public add(node: INode<T>) {
    this.items[this.size] = node;
    this.size++;
    this.bubbleUp();
  }
}
