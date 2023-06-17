import infoHeapSort from "../components/info/infoHeapSort.tsx";
import { AnimationStep, swap, isSmaller, SortingAlgorithm } from "./algorithms.ts";

const sort = (array: number[]) => {
  const anim: AnimationStep[] = [];

  buildHeap(array, anim);
  let end = array.length - 1;

  while (end > 0) {
    swap(0, end, array, anim);
    end--;
    siftDown(array, 0, end, anim);
  }

  anim.push({type: 'end', values: [-1, -1], array});
  return anim;
};

const buildHeap = (array: number[], anim: AnimationStep[]) => {
  // Get the parent of the last node
  let node = getNodeParent(array.length - 1);

  while (node >= 0) {
    siftDown(array, node, array.length - 1, anim);
    node--;
  }
};

const siftDown = (array: number[], node: number, end: number, anim: AnimationStep[]) => {

  while (getNodeLeftChild(node) <= end) {
    const child = getNodeLeftChild(node);
    let nodeToSwap = node;

    if (isSmaller(nodeToSwap, child, array, anim)) nodeToSwap = child;
    if (child + 1 <= end && isSmaller(nodeToSwap, child + 1, array, anim)) nodeToSwap = child + 1;
    if (nodeToSwap === node) return;
    
    swap(nodeToSwap, node, array, anim);
    node = nodeToSwap;
  }
};

const getNodeParent = (i: number) => Math.floor((i - 1) / 2);
const getNodeLeftChild = (i: number) => 2 * i + 1;
// const getNodeRightChild = i => 2 * i + 2;

export const heapSort: SortingAlgorithm = {
  name: 'Heap Sort',
  sort,
  info: infoHeapSort,
};
