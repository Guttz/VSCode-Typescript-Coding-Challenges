/*
 * @lc app=leetcode id=57 lang=typescript
 *
 * [57] Insert Interval
 */

function findIndexToInsert(
  intervals: number[][],
  newInterval: number[]
): number {
  if (intervals.length === 0) return 0;
  const halfLength = Math.trunc(intervals.length / 2);

  if (intervals.length === 1) {
    if (newInterval[0] < intervals[halfLength][0]) return 0;
    else return 1;
  }

  if (newInterval[0] < intervals[halfLength][0])
    return findIndexToInsert(intervals.slice(0, halfLength), newInterval);
  else
    return (
      halfLength + findIndexToInsert(intervals.slice(halfLength), newInterval)
    );
}

describe("fun findIndexToInsert", () => {
  test("if it finds proper index", () => {
    expect(
      findIndexToInsert(
        [
          [1, 3],
          [6, 9],
        ],
        [2, 5]
      )
    ).toEqual(1);
    expect(
      findIndexToInsert(
        [
          [1, 2],
          [3, 5],
          [6, 7],
          [8, 10],
          [12, 16],
        ],
        [4, 8]
      )
    ).toEqual(2);
    expect(
      findIndexToInsert(
        [
          [2, 2],
          [3, 5],
          [6, 7],
          [8, 10],
          [12, 16],
        ],
        [1, 8]
      )
    ).toEqual(0);
    expect(
      findIndexToInsert(
        [
          [1, 2],
          [3, 5],
          [6, 7],
          [8, 10],
          [12, 16],
        ],
        [15, 25]
      )
    ).toEqual(5);
  });
});

function hasOverlapAtIndex(intervals: number[][], index: number): boolean {
  if (index + 1 >= intervals.length) return false;
  if (intervals[index + 1][0] <= intervals[index][1]) return true;
}

describe("function hasOverlapAtIndex", () => {
  test("if if identifies overlaps properly", () => {
    expect(
      hasOverlapAtIndex(
        [
          [1, 3],
          [2, 5],
          [6, 9],
        ],
        0
      )
    ).toEqual(true);
    expect(
      hasOverlapAtIndex(
        [
          [1, 2],
          [3, 5],
          [4, 8],
          [6, 7],
          [8, 10],
          [12, 16],
        ],
        1
      )
    ).toEqual(true);
    expect(
      hasOverlapAtIndex(
        [
          [1, 2],
          [3, 5],
          [6, 7],
          [8, 10],
          [12, 16],
        ],
        4
      )
    ).toEqual(false);
  });
});

function mergeIntervalsAtIndex(
  intervals: number[][],
  index: number
): number[][] {
  return [
    ...intervals.slice(0, index),
    [
      intervals[index][0],
      Math.max(intervals[index][1], intervals[index + 1][1]),
    ],
    ...intervals.slice(index + 2),
  ];
}

describe("function mergeIntervalsAtIndex", () => {
  test("if if merges at Index properly", () => {
    expect(
      mergeIntervalsAtIndex(
        [
          [1, 3],
          [3, 6],
          [2, 5],
          [6, 9],
        ],
        0
      )
    ).toEqual([
      [1, 6],
      [2, 5],
      [6, 9],
    ]);
  });

  expect(
    mergeIntervalsAtIndex(
      [
        [1, 2],
        [3, 8],
        [6, 7],
        [8, 10],
        [12, 16],
      ],
      1
    )
  ).toEqual([
    [1, 2],
    [3, 8],
    [8, 10],
    [12, 16],
  ]);
});

// 1 -Find indexToInsert
// 2 - Check ifHasOverlapAtIndex
// 3 - Merge if needed at Index
// 4 - Repeat step 2 until it's false
// 5 - return array
// @lc code=start
function insert(intervals: number[][], newInterval: number[]): number[][] {
  function findIndexToInsert(
    intervals: number[][],
    newInterval: number[]
  ): number {
    if (intervals.length === 0) return 0;
    const halfLength = Math.trunc(intervals.length / 2);

    if (intervals.length === 1) {
      if (newInterval[0] < intervals[halfLength][0]) return 0;
      else return 1;
    }

    if (newInterval[0] < intervals[halfLength][0])
      return findIndexToInsert(intervals.slice(0, halfLength), newInterval);
    else
      return (
        halfLength + findIndexToInsert(intervals.slice(halfLength), newInterval)
      );
  }

  function hasOverlapAtIndex(intervals: number[][], index: number): boolean {
    if (index + 1 >= intervals.length) return false;
    if (intervals[index + 1][0] <= intervals[index][1]) return true;
  }

  function mergeIntervalsAtIndex(
    intervals: number[][],
    index: number
  ): number[][] {
    return [
      ...intervals.slice(0, index),
      [
        intervals[index][0],
        Math.max(intervals[index][1], intervals[index + 1][1]),
      ],
      ...intervals.slice(index + 2),
    ];
  }

  if (intervals.length === 0) return [newInterval];
  const indexToInsert = findIndexToInsert(intervals, newInterval);

  let updatedIntervals = [
    ...intervals.slice(0, indexToInsert),
    newInterval,
    ...intervals.slice(indexToInsert),
  ];

  let indexToMerge = Math.max(indexToInsert - 1, 0);
  while (hasOverlapAtIndex(updatedIntervals, indexToMerge) === true) {
    updatedIntervals = mergeIntervalsAtIndex(updatedIntervals, indexToMerge);
  }
  while (hasOverlapAtIndex(updatedIntervals, indexToInsert) === true) {
    updatedIntervals = mergeIntervalsAtIndex(updatedIntervals, indexToInsert);
  }

  return updatedIntervals;
}
// @lc code=end

describe("function insert", () => {
  test("should test base example", () => {
    expect(
      insert(
        [
          [1, 3],
          [6, 9],
        ],
        [2, 5]
      )
    ).toEqual([
      [1, 5],
      [6, 9],
    ]);
  });

  test("if inserts the newInterval at the right index", () => {
    expect(
      insert(
        [
          [1, 2],
          [3, 5],
          [6, 7],
          [8, 10],
          [12, 16],
        ],
        [4, 8]
      )
    ).toEqual([
      [1, 2],
      [3, 10],
      [12, 16],
    ]);
  });

  test("if empty intervals returns newInterval", () => {
    expect(insert([], [4, 8])).toEqual([[4, 8]]);
  });

  test("if empty intervals returns newInterval", () => {
    expect(insert([[1, 5]], [0, 3])).toEqual([[0, 5]]);
  });
});
