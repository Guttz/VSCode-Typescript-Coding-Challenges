function subsets(nums: number[]): number[][] {
  const result: number[][] = [];
  const subsetAmount = Math.pow(2, nums.length);
  for (let i = 0; i < subsetAmount; i++) {
    const bitmask = i.toString(2).split("");
    bitmask.length - nums.length;
    result.push(
      bitmask
        .map((bit, index) =>
          bit === "1" ? nums[index + nums.length - bitmask.length] : null
        )
        .filter((v) => v != null)
    );
  }
  return result;
}
