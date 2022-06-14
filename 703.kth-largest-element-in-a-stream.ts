/*
 * @lc app=leetcode id=703 lang=typescript
 *
 * [703] Kth Largest Element in a Stream
 */

import { MinHeap } from "./minHeap";

// @lc code=start
class KthLargest {
  minHeap = new MinHeap<number>();
  heapSize: number = 0;

  constructor(k: number, nums: number[]) {
    this.heapSize = k;
    nums.forEach((num) => {
      this.minHeap.insert(num);
      if (this.minHeap.size > k) this.minHeap.extractMin();
    });
  }

  add(val: number): number {
    this.minHeap.insert(val);
    if (this.minHeap.size > this.heapSize) this.minHeap.extractMin();
    return this.minHeap.values[0] as number;
  }
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
// @lc code=end
