const nodeFactory = (data) => {
  let left;
  let right;
  return { data, left, right };
};

const treeFactory = (array) => {
  // Merge sort function
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

  // Sort array objects
  const unsortedArr = Array.from(array);
  mergeSort(unsortedArr);
  const sortedArr = Array.from(new Set(unsortedArr));

  // Recusive call left and right side of middle node
  function buildTree(arr, start, end) {
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

  const root = buildTree(sortedArr);

  return root;
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
prettyPrint(tree);
