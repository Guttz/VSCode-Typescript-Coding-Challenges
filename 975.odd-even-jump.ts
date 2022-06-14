// Solution 1
// Function oddEvenJumps(arr, startingIndex, jumpCount)
// (if startingIndex === arr.length - 1) return true
// Check if jump % 2 = 0
// If even
//  If there's a valid next jump - Try to find next appropriate to jump index
//    return oddEvenJumps(arr, foundJumpIndex, jumpCount + 1)

// If odd
//  If there's a valid next jump - Try to find next appropriate to jump index
//    return oddEvenJumps(arr, foundJumpIndex, jumpCount + 1)

//    return false

// Time - (n^2)
// Memory - o(n)

// Usually the space complexity for recursive solutions is o(height)
// The usual time complexicity is O(number of nodes) or O(2 ˆ height)

// Solution 2 -> begining from the end of array
// f(n) = 1
// f(n - 1) = 1 (check where can I arrived) + f(n)  = 1 + 1 = 1
// ...
// Time O(n)
// Space O(n) -> for every index save the result on a hash map

function oddEvenJumps(arr: number[], jumpCount?: number): number {
  return 1;
}
