/*
 * @lc app=leetcode id=287 lang=typescript
 *
 * [287] Find the Duplicate Number
 */

// @lc code=start
function findDuplicate(nums: number[]): number {
  const sortedArray = nums.sort((a, b) => a - b);

  for (let i = 1; i < nums.length; i++) {
    if (sortedArray[i - 1] === sortedArray[i]) return sortedArray[i];
  }

  return -1;
}
// @lc code=end
