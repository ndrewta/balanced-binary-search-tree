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

  function insert(value, node) {
    // Insert value at leaf node
    if (node === undefined) {
      node = root;
    }

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

  function remove(value, node) {
    // Search for value within tree and delete
    if (node === undefined) {
      node = root;
    }

    // If value doesn't exist
    if (
      node.left !== null &&
      node.left.data !== value &&
      node.left.left === null &&
      node.left.right === null
    ) {
      console.log("Number doesn't exist");
      return;
    }

    if (
      node.right !== null &&
      node.right.data !== value &&
      node.right.left === null &&
      node.right.right === null
    ) {
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

  // Sort array objects
  const unsortedArr = Array.from(array);
  mergeSort(unsortedArr);
  const sortedArr = Array.from(new Set(unsortedArr));

  // Build root node
  const root = buildTree(sortedArr);

  return { insert, remove, root };
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
