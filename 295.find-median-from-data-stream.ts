/*
 * @lc app=leetcode id=295 lang=typescript
 *
 * [295] Find Median from Data Stream
 */

import { MinHeap, MaxHeap } from "@datastructures-js/heap";

// @lc code=start
class MedianFinder {
  lo = new MaxHeap<number>();
  hi = new MinHeap<number>();
  constructor() {}

  addNum(num: number): void {
    this.lo.insert(num);
    this.hi.insert(this.lo.extractRoot() as number);
    if (this.hi.size() > this.lo.size()) {
      const extractedMin = this.hi.extractRoot() as number;
      this.lo.insert(extractedMin);
    }
  }

  findMedian(): number {
    const streamSize = this.lo.size() + this.hi.size();
    if (streamSize === 0) return 0;

    if (streamSize % 2 === 0) {
      this.lo.root();
      const extractedMax = this.lo.root() as number;
      const extractedMin = this.hi.root() as number;
      return (extractedMax + extractedMin) / 2;
    } else return this.lo.root() as number;
  }
}

const median = (arr) => {
  let middle = Math.floor(arr.length / 2);
  arr = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0
    ? arr[middle]
    : (arr[middle - 1] + arr[middle]) / 2;
};

[...Array(40)]
  .map((e) => ~~(Math.random() * 40))
  .forEach((arr) => {
    const randomArray = [...Array(40)].map((e) => ~~(Math.random() * 40));
    const medianFinder = new MedianFinder();
    randomArray.forEach((n) => medianFinder.addNum(n));
    console.log(
      "Median matches",
      median(randomArray),
      medianFinder.findMedian(),
      randomArray
    );
  });

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
// @lc code=end
