class SparseVector {
  vectorSize = 0;
  numsHash: { [key: number]: number } = [];

  constructor(nums: number[]) {
    this.vectorSize = nums.length;

    nums.forEach((num, index) => {
      if (num !== 0) this.numsHash[index] = num;
    });
  }

  getValue(index: number) {
    if (index >= this.vectorSize) return 0;
    if (!!this.numsHash[index]) return this.numsHash[index];
    else return 0;
  }

  // Return the dotProduct of two sparse vectors
  dotProduct(vec: SparseVector): number {
    return Object.entries(vec.numsHash).reduce((prevValue, currValue) => {
      const [index, value] = currValue;
      return prevValue + value * this.getValue(+index);
    }, 0);
  }
}

var v1 = new SparseVector([1, 0, 0, 2, 3]);
var v2 = new SparseVector([0, 3, 0, 4, 0]);
var ans = v1.dotProduct(v2);

console.log(ans === 8 ? "Passed" : "Failed");

/**
 * Your SparseVector object will be instantiated and called as such:
 * var v1 = new SparseVector(nums1)
 * var v2 = new SparseVector(nums1)
 * var ans = v1.dotProduct(v2)
 */
