/*
 * @lc app=leetcode id=92 lang=typescript
 *
 * [92] Reverse Linked List II
 */

// @lc code=start

//Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseBetween(
  head: ListNode | null,
  left: number,
  right: number
): ListNode | null {
  if (head.next == null) return head;

  let leftNode: ListNode | null = null;
  let prevLeftNode: ListNode | null = null;

  let prevNode: ListNode | null = null;
  let currNode: ListNode | null = null;
  let nextNode: ListNode | null = head;

  let startedReversing = false;
  while (nextNode.val !== right && nextNode.next != null) {
    currNode = nextNode;
    nextNode = currNode.next;

    if (currNode)
      if (currNode.val === left) {
        leftNode = currNode;
        prevLeftNode = prevNode;
      }

    if ((leftNode != null && prevNode === leftNode) || startedReversing) {
      startedReversing = true;
      currNode.next = prevNode;
    }

    prevNode = currNode;
  }

  prevNode = currNode;
  currNode = nextNode;
  nextNode = currNode.next;

  if (prevNode === leftNode || startedReversing) {
    leftNode.next = currNode.next;
    if (prevLeftNode) prevLeftNode.next = currNode;
    currNode.next = prevNode;
  }

  return head;
}
// @lc code=end
const arr = [3, 5];
//[1, 2, 3, 4, 5]

let auxArr: { [key: number]: ListNode } = {};
arr.forEach((elem, index) => {
  auxArr[index] = new ListNode(elem);
});
arr.forEach((elem, index) => {
  auxArr[index].next = auxArr[index + 1];
});

console.log("aa");
reverseBetween(auxArr[0], 1, 1);

describe("function reverseBetween", () => {
  test("should work for basic use cases", () => {
    expect(reverseBetween(auxArr[1], 2, 4));
  });
});
