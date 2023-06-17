import infoMergeSort from "../components/info/infoMergeSort.tsx";
import { AnimationStep, isLeq, SortingAlgorithm } from "./algorithms";

const sort = (array: number[]) => {
  const anim: AnimationStep[] = [];
  runMergeSort(array, array.slice(), 0, array.length - 1, anim);
  anim.push({type: 'end', values: [-1, -1], array});
  return anim;
};

const runMergeSort = (array: number[], clonedArray: number[],
  beginIdx: number, endIdx: number, anim: AnimationStep[]) => {

  if (beginIdx === endIdx) return;  // Base case - if subarray is length 1, return.
  const midIdx = Math.floor((beginIdx + endIdx) / 2);
  runMergeSort(clonedArray, array, beginIdx, midIdx, anim);
  runMergeSort(clonedArray, array, midIdx + 1, endIdx, anim);
  merge(array, clonedArray, beginIdx, midIdx, endIdx, anim);
  return array;
};

const merge = (array: number[], clonedArray: number[],
  beginIdx: number, midIdx: number, endIdx: number, anim: AnimationStep[]) => {

  let i = beginIdx;
  let k = beginIdx;
  let j = midIdx + 1;

  // Compare the first element of each subarray, and pop the smallest element.
  // Increment from the array that was saved, and repeat until one array is empty.
  while (i <= midIdx && j <= endIdx) {
      if (isLeq(i, j, clonedArray, anim)) {
      anim.push({type: 'overwrite', values: [k, clonedArray[i]]});
      array[k++] = clonedArray[i++];
    } else {
      anim.push({type: 'overwrite', values: [k, clonedArray[j]]});
      array[k++] = clonedArray[j++];
    }
  }

  // Go through the arrays and add all the elements left over.
  while (i <= midIdx) {
    anim.push({type: 'overwrite', values: [k, clonedArray[i]]});
    array[k++] = clonedArray[i++];
  }
  while (j <= endIdx) {
    anim.push({type: 'overwrite', values: [k, clonedArray[j]]});
    array[k++] = clonedArray[j++];
  }
};

export const mergeSort: SortingAlgorithm = {
  name: 'Merge Sort',
  sort,
  info: infoMergeSort,
};
