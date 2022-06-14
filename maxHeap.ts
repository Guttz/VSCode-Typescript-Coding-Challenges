type HeapNode<T extends number | string, U> = {
  value: T;
  key: U;
};

class MaxHeap<T extends number | string, U = undefined> {
  private _values: HeapNode<T, U>[];

  public get values(): (T | HeapNode<T, U>)[] {
    return this._values.map((node) => (node.key != null ? node : node.value));
  }

  public get size(): number {
    return this._values.length;
  }

  constructor() {
    this._values = [];
  }

  /**
   * Adds a new element to the max binary heap. Returns the success of the operation.
   * @param n Value of an integer to be added to the heap
   */
  public insert(value: T, key?: U): boolean {
    const newNode = { value, key };
    if (this.values.length === 0) {
      this._values.push(newNode);
      return true;
    }
    // Add the element to the end of the list
    this._values.push(newNode);
    // Find the correct spot for the new node in the max heap
    return this.bubbleUp();
  }

  private bubbleUp(): boolean {
    // Index of the element we need to bubble up
    let index = this._values.length - 1;
    const element = this._values[index];
    let parentIndex = Math.floor((index - 1) / 2); // Parent index of a child at index = n: Math.floor(n-1/2)

    // Keep looping until the parent node is greater than the child node
    while (
      parentIndex >= 0 &&
      this._values[parentIndex].value < element.value
    ) {
      // If parent < child, swap the nodes
      this._values[index] = this._values[parentIndex];
      this._values[parentIndex] = element;

      // Reset the indexes as we swapped the values
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
    return true;
  }

  /**
   * Return the maximum element in the heap and rebalances the heap.
   */
  public extractMax(): T | HeapNode<T, U> {
    if (this._values.length === 0) {
      return null;
    }

    // First value in the list will always be the maximum one
    let max = this._values[0];
    let end = this._values.pop();

    // Get the last element in the list to the front
    if (this._values.length > 0) {
      this._values[0] = end;

      // Rebalance the heap by sinking down the node to the correct spot
      this.sinkDown();
    }
    return max.key != null ? max : max.value;
  }

  private sinkDown() {
    let parentIdx = 0;
    let leftChildIdx = 0;
    let rightChildIdx = 0;
    let heapLength = this._values.length;

    let nodeToSink = this._values[parentIdx];
    let idxToSwap = 0;
    let swap = false;
    // Keep looping through the nodes util you find the right spot
    while (true) {
      leftChildIdx = 2 * parentIdx + 1;
      rightChildIdx = 2 * parentIdx + 2;

      swap = false;
      let leftChild: HeapNode<T, U> = null;
      let rightChild: HeapNode<T, U> = null;

      // Check with the left child only if it is a valid index
      if (leftChildIdx < heapLength) {
        leftChild = this._values[leftChildIdx];
        // Compare with the node to sink down
        if (nodeToSink.value < leftChild.value) {
          idxToSwap = leftChildIdx;
          swap = true;
        }
      }

      // Check with the right child only if it is a valid index
      if (rightChildIdx < heapLength) {
        rightChild = this._values[rightChildIdx];

        if (
          (swap && leftChild.value < rightChild.value) ||
          (!swap && nodeToSink.value < rightChild.value)
        ) {
          idxToSwap = rightChildIdx;
          swap = true;
        }
      }

      if (!swap) {
        // If there is no swap required, we found the correct spot for the element
        return;
      } else {
        // Swap the elements
        this._values[parentIdx] = this._values[idxToSwap];
        this._values[idxToSwap] = nodeToSink;

        // Set the reference to index to its new value
        parentIdx = idxToSwap;
      }
    }
  }
}
