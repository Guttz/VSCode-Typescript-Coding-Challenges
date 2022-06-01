/*
 * @lc app=leetcode id=347 lang=typescript
 *
 * [347] Top K Frequent Elements
 */

import { HeapNode, MinHeap } from "./minHeap";

// @lc code=start
function topKFrequent(nums: number[], k: number): number[] {
  const freqMap = new Map<number, number>();
  const minHeap = new MinHeap<number, number>();

  nums.forEach((num) => {
    if (!freqMap.has(num)) freqMap.set(num, 0);
    const updatedFreq = freqMap.get(num) + 1;
    freqMap.set(num, updatedFreq);
  });

  freqMap.forEach((value, key) => {
    minHeap.insert(value, key);
    if (minHeap.size > k) minHeap.extractMin();
  });

  return minHeap.values.map(
    (heapNode) => (heapNode as HeapNode<number, number>).key
  );
}
// @lc code=end
