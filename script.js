/* eslint-disable no-plusplus */
/* eslint-disable no-console */

const nodeFactory = (data) => {
  const left = null;
  const right = null;
  return { data, left, right };
};

const treeFactory = (array) => {
  // Merge function
  function merge(arr, low, mid, high) {
    let i = 0;
    let j = 0;
    let k = low;
    const m = arr.slice(low, mid + 1);
    const n = arr.slice(mid + 1, high + 1);

    while (i < m.length && j < n.length) {
      if (m[i] < n[j]) {
        arr[k++] = m[i++];
      } else {
        arr[k++] = n[j++];
      }
    }

    for (; i < m.length; i++) {
      arr[k++] = m[i];
    }
    for (; j < n.length; j++) {
      arr[k++] = n[j];
    }
  }

  function mergeSort(arr, low, high) {
    // Merge sort algorithm
    if (low === undefined) {
      low = 0;
    }
    if (high === undefined) {
      high = arr.length - 1;
    }

    if (low < high) {
      const mid = Math.floor((low + high) / 2);
      mergeSort(arr, low, mid);
      mergeSort(arr, mid + 1, high);
      merge(arr, low, mid, high);
    }
  }

  function buildTree(arr, start, end) {
    // Recursive call left and right side of middle node
    if (start === undefined) {
      start = 0;
    }
    if (end === undefined) {
      end = arr.length - 1;
    }

    if (start > end) {
      return null;
    }
    const mid = Math.floor((start + end) / 2);
    const node = nodeFactory(arr[mid]);
    node.left = buildTree(arr, start, mid - 1);
    node.right = buildTree(arr, mid + 1, end);

    return node;
  }

  function insert(value, node = this.root) {
    // Insert value at leaf node
    if (node.left === null && value < node.data) {
      node.left = nodeFactory(value);
      return;
    }

    if (node.right === null && value > node.data) {
      node.right = nodeFactory(value);
      return;
    }

    if (value === node.data) {
      return;
    }

    if (value < node.data) {
      insert(value, node.left);
    } else {
      insert(value, node.right);
    }
  }

  function remove(value, node = this.root) {
    // Search for value within tree and delete
    if (value === root.data) {
      console.log("Can't remove root node");
      return;
    }

    // If value doesn't exist
    if (node.data !== value && node.left === null && node.right === null) {
      console.log("Number doesn't exist");
      return;
    }

    // Case 1: Verify if leaf node then delete
    if (
      node.left !== null &&
      node.left.data === value &&
      node.left.left === null &&
      node.left.right === null
    ) {
      node.left = null;
      return;
    }

    if (
      node.right !== null &&
      node.right.data === value &&
      node.right.left === null &&
      node.right.right === null
    ) {
      node.right = null;
      return;
    }

    // Case 2: Delete node with single child
    if (node.left !== null && node.left.data === value) {
      if (node.left.left && node.left.right === null) {
        node.left = node.left.left;
        return;
      }
      if (node.left.right && node.left.left === null) {
        node.left = node.left.right;
        return;
      }
    }

    if (node.right != null && node.right.data === value) {
      if (node.right.left && node.right.right === null) {
        node.right = node.right.left;
        return;
      }
      if (node.right.right && node.right.left === null) {
        node.right = node.right.right;
        return;
      }
    }

    // Case 3: Delete node with both children
    if (node.left.data === value) {
      // Check if childs are leaf nodes
      if (
        node.left.left &&
        node.left.right &&
        !(
          node.left.left.left ||
          node.left.left.right ||
          node.left.right.left ||
          node.left.right.right
        )
      ) {
        const leftGrandChild = node.left.left;
        node.left.data = leftGrandChild.data;
        node.left.left = null;
        return;
      }
      // Check if right child has both grandchildren
      if (
        node.left.left &&
        node.left.right &&
        node.left.right.left &&
        node.left.right.right
      ) {
        const rightChild = node.left.right;
        const rightLeftGrandChild = node.left.right.left;
        node.left.data = rightLeftGrandChild.data;
        rightChild.left = null;
        return;
      }
      // Check if right child has only right grandchild
      if (node.left.left && node.left.right && node.left.right.left === null) {
        const rightChild = node.left.right;
        const rightRightGrandChild = node.left.right.right;
        node.left.data = rightChild.data;
        rightChild.data = rightRightGrandChild.data;
        rightChild.right = null;
        return;
      }
    }

    if (node.right.data === value) {
      // Check if childs are leaf nodes
      if (
        node.right.left &&
        node.right.right &&
        !(
          node.right.left.left ||
          node.right.left.right ||
          node.right.right.left ||
          node.right.right.right
        )
      ) {
        const leftGrandChild = node.right.left;
        node.right.data = leftGrandChild.data;
        node.right.left = null;
        return;
      }
      // Check if right child has both grandchildren
      if (
        node.right.left &&
        node.right.right &&
        node.right.right.left &&
        node.right.right.right
      ) {
        const rightChild = node.right.right;
        const rightLeftGrandChild = node.right.right.left;
        node.right.data = rightLeftGrandChild.data;
        rightChild.left = null;
        return;
      }
      // Check if right child has only right grandchild
      if (
        node.right.left &&
        node.right.right &&
        node.right.right.left === null
      ) {
        const rightChild = node.right.right;
        const rightRightGrandChild = node.right.right.right;
        node.right.data = rightChild.data;
        rightChild.data = rightRightGrandChild.data;
        rightChild.right = null;
        return;
      }
    }

    if (value < node.data) {
      remove(value, node.left);
    } else {
      remove(value, node.right);
    }
  }

  function find(value, node = this.root) {
    // Search tree for value and return node

    // If value doesn't exist
    if (node === null) {
      console.log("Number doesn't exist");
      return;
    }

    // Return node
    if (node.data === value) {
      return node;
    }

    if (value < node.data) {
      return find(value, node.left);
    } else {
      return find(value, node.right);
    }
  }

  function levelOrder(func, tree = this.root) {
    // Breadth first traversal iteration version
    const queue = [];
    const traversedQueue = [];
    queue.push(tree);
    while (!queue.length <= 0) {
      const current = queue.shift();

      // Pass value onto function if available
      if (func) {
        func(current);
      } else {
        traversedQueue.push(current.data);
      }

      // Add child to queue
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }

    // Return array if no function was provided.
    if (traversedQueue.length > 0) {
      return traversedQueue;
    }
  }

  function levelOrderRecursion(
    func,
    tree = this.root,
    queue = [],
    traversedQueue = [],
    depth = 0
  ) {
    // Breadth first traversal recursion version

    // Push root to queue
    if (depth === 0) {
      queue.push(tree);
    }

    // Exit when queue is empty
    if (queue.length <= 0) {
      // Return array if no function was provided.
      if (traversedQueue.length > 0) {
        return traversedQueue;
      }
      return;
    }

    const current = queue.shift();
    if (func) {
      func(current);
    } else {
      traversedQueue.push(current.data);
    }

    // Add child to queue
    if (current.left !== null) {
      queue.push(current.left);
    }
    if (current.right !== null) {
      queue.push(current.right);
    }

    return levelOrderRecursion(func, tree, queue, traversedQueue, depth + 1);
  }

  function preOrder(func, node = this.root, traversedArray = []) {
    // Preorder depth first search

    // Exit when queue is empty
    if (node === null) {
      return;
    }

    if (func) {
      func(node);
    } else {
      traversedArray.push(node.data);
    }

    preOrder(func, node.left, traversedArray);
    preOrder(func, node.right, traversedArray);

    // Return array if no function was provided.
    if (traversedArray.length > 0) {
      return traversedArray;
    }
  }

  function inOrder(func, node = this.root, traversedArray = []) {
    // Inorder depth first search

    // Exit when queue is empty
    if (node === null) {
      return;
    }

    inOrder(func, node.left, traversedArray);

    if (func) {
      func(node);
    } else {
      traversedArray.push(node.data);
    }

    inOrder(func, node.right, traversedArray);

    // Return array if no function was provided.
    if (traversedArray.length > 0) {
      return traversedArray;
    }
  }

  function postOrder(func, node = this.root, traversedArray = []) {
    // Postorder depth first search

    // Exit when queue is empty
    if (node === null) {
      return;
    }

    postOrder(func, node.left, traversedArray);
    postOrder(func, node.right, traversedArray);

    if (func) {
      func(node);
    } else {
      traversedArray.push(node.data);
    }

    // Return array if no function was provided.
    if (traversedArray.length > 0) {
      return traversedArray;
    }
  }

  function findHeight(node, height = -1) {
    // Find height of node

    if (typeof node === "number") {
      node = find(node, this.root);
    }

    if (node === undefined) {
      return;
    }

    if (node === null) {
      return height;
    }

    // Return highest value
    return Math.max(
      findHeight(node.left, height + 1),
      findHeight(node.right, height + 1)
    );
  }

  function findDepth(node, tree = this.root, depth = 0) {
    // Find depth of node

    if (typeof node === "number") {
      node = find(node, tree);
    }

    if (node === undefined) {
      return;
    }

    if (node.data === tree.data) {
      return depth;
    }

    if (node.data < tree.data) {
      return findDepth(node, tree.left, depth + 1);
    }
    if (node.data > tree.data) {
      return findDepth(node, tree.right, depth + 1);
    }
  }

  function isBalanced(node = this.root) {
    // Check child height discrepancy of every node; no more than 1

    if (node === null) {
      return true;
    }

    const a = findHeight(node.left) + 1;
    const b = findHeight(node.right) + 1;

    if (Math.abs(a - b) > 1) {
      return false;
    }

    if (isBalanced(node.left) && isBalanced(node.right)) {
      return true;
    }

    return false;
  }

  function rebalance() {
    // Rebalance tree

    const unbalancedArr = levelOrderRecursion(undefined, this.root);
    mergeSort(unbalancedArr);
    const sortedArr = Array.from(new Set(unbalancedArr));
    this.root = buildTree(sortedArr);
  }

  // Sort array objects
  const unsortedArr = Array.from(array);
  mergeSort(unsortedArr);
  const sortedArr = Array.from(new Set(unsortedArr));

  // Build root node
  let root = buildTree(sortedArr);

  return {
    insert,
    remove,
    find,
    levelOrder,
    levelOrderRecursion,
    preOrder,
    inOrder,
    postOrder,
    findHeight,
    findDepth,
    isBalanced,
    rebalance,
    root,
  };
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const arr1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = treeFactory(arr1);

prettyPrint(tree.root);
