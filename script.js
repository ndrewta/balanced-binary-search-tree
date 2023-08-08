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

const tree = treeFactory([1, 7, 4, 23, 8, 9, 4, 3, 5, 76, 67, 6345, 18, 324]);
prettyPrint(tree.root);
tree.insert(24);
tree.insert(25);
tree.insert(425);
tree.insert(421);
prettyPrint(tree.root);
