/*
 * @lc app=leetcode id=137 lang=typescript
 *
 * [137] Single Number II
 */

// @lc code=start
function singleNumber2(nums: number[]): number {
  const sumArr = Array.from({ length: 31 }, () => 0);

  nums.forEach((num) => {
    const bitRepresentation = num.toString(2);

    for (let i = 0; i < bitRepresentation.length; i++) {
      const sumArrIndex = 31 - bitRepresentation.length + i;
      sumArr[sumArrIndex] += +bitRepresentation[i];
    }
  });

  return parseInt(
    sumArr.map((n) => n % 3).reduce((s, char) => s + char, ""),
    2
  );

  //  transform number into bit representation
  //   go from first char until last and add to the array in reverse order
  // go through array and do % 3 for each number
  // transform array back in string and use parseInt
}

console.log(singleNumber2([30000, 500, 100, 30000, 100, 30000, 100]));

// @lc code=end
