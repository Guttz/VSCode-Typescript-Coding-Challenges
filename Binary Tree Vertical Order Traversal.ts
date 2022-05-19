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

// THIS DFS won't work
/*  function verticalOrder(root: TreeNode | null): number[][] {
  const output: number[][] = []
  
  function addLevel(node: TreeNode | null, pathSum: number) {
      if(!node) return
      if(!output[pathSum]) output[pathSum] = []
      console.log(node.val, node.left?.val, node.right?.val)
      output[pathSum].push(node.val)
      addLevel(node.left, pathSum - 1)
      addLevel(node.right, pathSum + 1)
  }
  
  addLevel(root, 100)
  
  return output.filter((v) => !!v)
}; */

function verticalOrder(root: TreeNode | null): number[][] {
  interface NodeWithPath {
    node: TreeNode;
    path: number;
  }

  let queue: NodeWithPath[] = [{ node: root, path: 0 }];

  const output: number[][] = [];
  while (queue.length !== 0) {
    let node: NodeWithPath;
    [node, ...queue] = queue;

    if (!output[node.path + 100]) output[node.path + 100] = [];
    output[node.path + 100].push(node.node.val);

    if (!node.node.left)
      queue.push({ node: node.node.left, path: node.path - 1 });
    if (!node.node.right)
      queue.push({ node: node.node.right, path: node.path + 1 });
  }

  return output.filter((n) => !!n);
}
