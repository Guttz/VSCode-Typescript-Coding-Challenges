/*
 * @lc app=leetcode id=103 lang=typescript
 *
 * [103] Binary Tree Zigzag Level Order Traversal
 */

// @lc code=start
//*
//* Definition for a binary tree node.
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// const outputArray
//fun addLevel(node, level)
//if(node == null) return

// output[level].push(value)
// addLevel(node.left, level + 1)
// addLevel(node.right, level + 1)

// after that
// for output.len
// when i % 2 !== 0 reverse
// i += i + 2
function zigzagLevelOrder(root: TreeNode | null): number[][] {
  let output: number[][] = [];
  function addLevel(node: TreeNode | null, level) {
    if (node == null) return;

    if (!output[level]) output[level] = [];
    output[level].push(node.val);
    addLevel(node.left, level + 1);
    addLevel(node.right, level + 1);
  }

  function zigzagOutput(regularLevelOrder: number[][]) {
    for (let i = 1; i < regularLevelOrder.length; i += 2) {
      regularLevelOrder[i] = regularLevelOrder[i].reverse();
    }
    return regularLevelOrder;
  }

  addLevel(root, 0);
  output = zigzagOutput(output);

  return output;
}

// @lc code=end
