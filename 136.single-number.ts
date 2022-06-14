/*
 * @lc app=leetcode id=136 lang=typescript
 *
 * [136] Single Number
 */

// @lc code=start
function singleNumber(nums: number[]): number {
  let xorSum = 0;

  nums.forEach((n) => (xorSum ^= n));

  return xorSum;
}
