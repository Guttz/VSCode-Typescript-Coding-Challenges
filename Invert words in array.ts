// @lc code=end

// ["I", " ", "m", "a", "k", "e", " ", "i", "t"] => ["I", " ", "e", "k", "a", "m", " ", "t", "i"]

// Solution 1 - not constranint conformant
// Create new array and go through the old array searching for first empty char " " and then go backwards until the word
// is finished and go back to the index we were before and search again for the next empty char

// Time and Space analysis -> when N is the length of array
// Space = O(n)
// Time O(n) (to find empty spaces) + O(n) (worst case to add a single word of length n to second array )
// Time = O(n)

// ----------------

// Soltution 2
// 1 - To reverse a word we only need the mirror version of it. That means we need to swap the first letter with the last,
// the second letter with the second to last letter and so on until we reach the middle of the word.
// 2 - That means, if we go through the array and search for the starting index and the ending index of a word, we can
// without the assistance of another array reverse a word in-place
// 3 - If we search the next empty string and repeat step two for all words in the array we would
// achieve the desired output

// Time and Space analysis -> when N is the length of array
// Space O(k) = O(1) = constant
// Time O(n) (to go through array)  + O(n/2) to swap characters = O(n)

// ----------------------
// We will move forward with Solution 2

// Function to reverse a words using indexes of array
function reverseWord(i: number, j: number, arr: string[]): string[] {
  const halfArrayIndex = Math.trunc((j - i) / 2); // 1,5 -> 1

  for (let k = 0; k <= halfArrayIndex; k++) {
    const kI = i + k;
    const kJ = j - k;

    const auxChar = arr[kJ];
    arr[kJ] = arr[kI];
    arr[kI] = auxChar;
  }

  return arr;
}

// ["I", " ", "m", "a", "k", "e", " ", "i", "t"] => ["I", " ", "e", "k", "a", "m", " ", "i", "t"]
reverseWord(2, 5, ["I", " ", "m", "a", "k", "e", " ", "i", "t"]).forEach(
  (c, index) => {
    if (c !== ["I", " ", "e", "k", "a", "m", " ", "i", "t"][index])
      console.log("Test failed");
  }
);

// ["I", " ", "m", "a", "x", "k", "e", " ", "i", "t"] => ["I", " ", "e", "k", "x", "a", "m", " ", "i", "t"]
reverseWord(2, 6, ["I", " ", "m", "a", "x", "k", "e", " ", "i", "t"]).forEach(
  (c, index) => {
    if (c !== ["I", " ", "e", "k", "x", "a", "m", " ", "i", "t"][index])
      console.log("Test failed");
  }
);

// Function to reverse a words using indexes of array
function reverseWords(arr: string[]): string[] {
  if (arr.length == null || arr.length === 0 || arr.length === 1) return [];

  let wordStartIndex = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] === " ") wordStartIndex = i;
    if (arr[i] === " ") {
      reverseWord(wordStartIndex, i - 1, arr);
      wordStartIndex = -1;
    }
  }
  if (wordStartIndex !== -1) reverseWord(wordStartIndex, arr.length - 1, arr);
  // We have to consider the edge case when there are no empty spaces -> ["a", "b", "c"]
  return arr;
}

// ["I", " ", "m", "a", "k", "e", " ", "i", "t"] => ["I", " ", "e", "k", "a", "m", " ", "t", "i"]
console.log(reverseWords(["I", " ", "m", "a", "k", "e", " ", "i", "t"]));
reverseWords(["I", " ", "m", "a", "k", "e", " ", "i", "t"]).forEach(
  (c, index) => {
    if (c !== ["I", " ", "e", "k", "a", "m", " ", "t", "i"][index])
      console.log("Test failed");
  }
);

reverseWords(["I", " ", "m", "a", "x", "k", "e", " ", "i", "t"]).forEach(
  (c, index) => {
    if (c !== ["I", " ", "e", "k", "x", "a", "m", " ", "t", "i"][index])
      console.log("Test failed");
  }
);
