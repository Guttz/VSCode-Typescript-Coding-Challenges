/*
 * @lc app=leetcode id=987 lang=typescript
 *
 * [987] Vertical Order Traversal of a Binary Tree
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function verticalTraversal(root: TreeNode | null): number[][] {
  interface NodeWithPath {
    node: TreeNode;
    path: number;
    totalPath: number;
  }
  if (!root) return [];
  let queue: NodeWithPath[] = [{ node: root, path: 0, totalPath: 0 }];

  const output: number[][][] = [];
  while (queue.length !== 0) {
    let node: NodeWithPath;
    [node, ...queue] = queue;

    if (!output[node.path + 1000]) output[node.path + 1000] = [];
    if (!output[node.path + 1000][node.totalPath])
      output[node.path + 1000][node.totalPath] = [];

    output[node.path + 1000][node.totalPath].push(node.node.val);

    if (!!node.node.left)
      queue.push({
        node: node.node.left,
        path: node.path - 1,
        totalPath: node.totalPath + 1,
      });
    if (!!node.node.right)
      queue.push({
        node: node.node.right,
        path: node.path + 1,
        totalPath: node.totalPath + 1,
      });
  }
  /* 
  const finalOutput2: number[][] = [];
  output
    .filter((n) => !!n)
    .forEach((column) => {
      const arr = [];
      column.forEach((columnRow) => {
        columnRow.sort((a, b) => a - b);
        columnRow.forEach((n) => arr.push(n));
      });

      finalOutput.push(arr);
    }); */

  return output
    .filter((n) => !!n)
    .map((column) => {
      return column.reduce((arr, columnRow) => {
        return [...arr, ...columnRow.sort((a, b) => a - b)];
      }, []);
    }, []);
}

// @lc code=end
