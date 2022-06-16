/*
 * @lc app=leetcode id=415 lang=typescript
 *
 * [415] Add Strings
 */

// @lc code=start
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (a, b) {
  const THRESHHOLD = 999999999999999;
  const THRESHHOLD_LEN = 14;

  const THRESHHOLD_HALF = THRESHHOLD / 2;

  function getNumberParts(s, len) {
    const parts = [];

    for (let i = s.length - 1; i >= 0; i = i - len) {
      const j = i - len;
      const part = s.substring(j + 1, i + 1);

      parts.push(part);
    }

    return parts;
  }

  // 1, 3 => 3 - 1 = 2, "0"
  function fillZeros(s, len) {
    if (s.length < len) return "0".repeat(len - s.length) + s;
    else return s;
  }

  function sumPart(a, b, overflow) {
    let sum = +a + +b;
    if (overflow) sum = sum + 1;

    const sumString = fillZeros(sum.toString(), THRESHHOLD_LEN);

    if (sumString.length > THRESHHOLD_LEN) {
      return {
        sum: sumString.substring(1),
        overflow: true,
      };
    } else {
      return {
        sum: sumString,
        overflow: false,
      };
    }
  }

  let output = "";
  if (a < THRESHHOLD_HALF && b < THRESHHOLD_HALF) return +a + +b + "";

  const partsA = getNumberParts(a, THRESHHOLD_LEN);

  const partsB = getNumberParts(b, THRESHHOLD_LEN);

  const outputLength = Math.max(partsA.length, partsB.length);
  let hadOverflow = false;

  for (let i = 0; i < outputLength; i++) {
    const partA = partsA[i];
    const partB = partsB[i];

    const sumOutput = sumPart(partA || "0", partB || "0", hadOverflow);

    hadOverflow = sumOutput.overflow;

    output = sumOutput.sum + output;
  }
  if (hadOverflow) output = "1" + output;
  while (output.length > 1 && output[0] === "0") {
    output = output.substring(1);
  }

  return output;
};

// @lc code=end
