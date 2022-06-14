/*
 * @lc app=leetcode id=973 lang=typescript
 *
 * [973] K Closest Points to Origin
 */

// @lc code=start

function kClosest(points: number[][], k: number): number[][] {
  const maxHeap = new MaxHeap<number, number>();

  points.forEach((coords, index) => {
    const distance = Math.sqrt(Math.pow(coords[0], 2) + Math.pow(coords[1], 2));
    maxHeap.insert(distance, index);
    if (maxHeap.size > k) maxHeap.extractMax();
  });

  return maxHeap.values.map(
    (node) => points[(node as HeapNode<number, number>).key]
  );
}

// Analysis -> x
// @lc code=end
