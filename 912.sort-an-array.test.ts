/*
 * @lc app=leetcode id=912 lang=typescript
 *
 * [912] Sort an Array
 */

function mergeArrays(array1: number[], array2: number[]) {
  let arr1 = array1;
  let arr2 = array2;

  const sortedArray = [];
  while (arr1.length !== 0 && arr2.length !== 0) {
    if (arr1[0] < arr2[0]) {
      sortedArray.push(arr1[0]);
      arr1 = arr1.slice(1);
    } else {
      sortedArray.push(arr2[0]);
      arr2 = arr2.slice(1);
    }
  }
  return [...sortedArray, ...arr1, ...arr2];
}

test("basic use cases", () => {
  expect(mergeArrays([2], [1])).toEqual([1, 2]);
  expect(mergeArrays([1, 2], [4, 5])).toEqual([1, 2, 4, 5]);
  expect(mergeArrays([4, 5], [1, 2])).toEqual([1, 2, 4, 5]);
  expect(mergeArrays([2, 5], [2, 9999999])).toEqual([2, 2, 5, 9999999]);
});

// @lc code=start
function sortArray(nums: number[]): number[] {
  function mergeArrays(array1: number[], array2: number[]) {
    let arr1 = array1;
    let arr2 = array2;

    const sortedArray = [];
    while (arr1.length !== 0 && arr2.length !== 0) {
      if (arr1[0] < arr2[0]) {
        sortedArray.push(arr1[0]);
        arr1 = arr1.slice(1);
      } else {
        sortedArray.push(arr2[0]);
        arr2 = arr2.slice(1);
      }
    }
    return [...sortedArray, ...arr1, ...arr2];
  }

  if (nums.length <= 1) return nums;

  const halfLength = Math.trunc(nums.length / 2);

  const firstSortedHalf = sortArray(nums.slice(0, halfLength));
  const secondSortedHalf = sortArray(nums.slice(halfLength));

  return mergeArrays(firstSortedHalf, secondSortedHalf);
}
// @lc code=end

test("sorts array accordinly", () => {
  expect(sortArray([5, 1, 1, 2, 0, 0])).toEqual([0, 0, 1, 1, 2, 5]);
});
