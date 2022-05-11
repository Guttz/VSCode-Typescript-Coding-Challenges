var SparseVector = /** @class */ (function () {
    function SparseVector(nums) {
        var _this = this;
        this.vectorSize = 0;
        this.numsHash = [];
        this.numsMap = new Map();
        this.vectorSize = nums.length;
        nums.forEach(function (num, index) {
            if (num !== 0)
                _this.numsHash[index] = num;
        });
    }
    SparseVector.prototype.getValue = function (index) {
        if (index >= this.vectorSize)
            return 0;
        if (!!this.numsHash[index])
            return this.numsHash[index];
        else
            return 0;
    };
    // Return the dotProduct of two sparse vectors
    SparseVector.prototype.dotProduct = function (vec) {
        var _this = this;
        return Object.entries(vec.numsHash).reduce(function (prevValue, currValue) {
            var index = currValue[0], value = currValue[1];
            console.log(index, value);
            console.log(prevValue + value * _this.getValue(+index));
            return prevValue + value * _this.getValue(+index);
        }, 0);
    };
    return SparseVector;
}());
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
//# sourceMappingURL=DotProductSparseVector.js.map