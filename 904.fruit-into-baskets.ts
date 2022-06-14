/*
 * @lc app=leetcode id=904 lang=typescript
 *
 * [904] Fruit Into Baskets
 */

// Variables
// Save position of first element of current tuple (firstElementIndex)
// Always save position of last number that ocurred (secondElementIndex)
// for i = 0 until i < length
// When finding new element that not in tuple
//   if(i - firstElementIndex >  maxCount)  maxCount = i - firstElementIndex
//      firstElementIndex = secondElementIndex
//      secondElementIndex = i

// return maxCount ? maxCount : length

// @lc code=start
function totalFruit(fruits: number[]): number {
  if (fruits.length === 0) return 0;

  let maxCount: number = 0;
  let tuple: number[] = [];
  let firstElementIndex = 0;

  let secondElementIndex = 0;
  for (let i = 0; i < fruits.length; i++) {
    if (tuple.find((t) => t === fruits[i]) == null) {
      if (tuple.length === 2)
        tuple = tuple.filter((t) => t === fruits[secondElementIndex]);
      tuple.push(fruits[i]);

      if (maxCount < i - firstElementIndex) maxCount = i - firstElementIndex;
      firstElementIndex = secondElementIndex;
    }

    if (fruits[i] != fruits[secondElementIndex]) secondElementIndex = i;
  }

  if (fruits.length - firstElementIndex > maxCount)
    maxCount = fruits.length - firstElementIndex;

  return maxCount;
}

console.log(totalFruit([1, 0, 1, 4, 1, 4, 1, 2, 3]) === 5);

console.log(totalFruit([0, 0, 1, 0]) === 4);

console.log(totalFruit([3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4]) === 5);

console.log(totalFruit([1, 2, 1]) === 3);

console.log(totalFruit([0, 1, 2, 2]) === 3);
// @lc code=end
