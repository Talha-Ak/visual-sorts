import infoQuickSort from '../components/info/infoQuickSort.tsx';
import { AnimationStep, isGreater, isSmaller, SortingAlgorithm, swap } from './algorithms';

const sort = (array: number[]) => {
  const anim: AnimationStep[] = [];
  runQuickSort(array, 0, array.length - 1, anim);
  anim.push({type: 'end', values: [-1, -1], array: array});
  return anim;
};

const runQuickSort = (array: number[], startIdx: number, endIdx: number, anim: AnimationStep[]) => {
  if (startIdx < endIdx) {
    const p = partition(array, startIdx, endIdx, anim);
    runQuickSort(array, startIdx, p, anim);
    runQuickSort(array, p + 1, endIdx, anim);
  }
};

const partition = (array: number[], startIdx: number, endIdx: number, anim: AnimationStep[]) => {
  // Set pivot to be the middle of the array
  let pivotIdx = Math.floor((startIdx + endIdx) / 2);
  let i = startIdx - 1;
  let j = endIdx + 1;

  for (;;) {
    // Inc/dec i and j until they pass the value of pivot
    do {
      i++;
    } while (isSmaller(i, pivotIdx, array, anim));
    do {
      j--;
    } while (isGreater(j, pivotIdx, array, anim));
    if (i >= j) {
      return j;
    }
    swap(i, j, array, anim);

    // Update value of pivot if moved
    if (i === pivotIdx) {
      pivotIdx = j;
    } else if (j === pivotIdx) {
      pivotIdx = i;
    }
  }
};

export const quickSort: SortingAlgorithm = {
  name: 'Quick Sort',
  sort,
  info: infoQuickSort,
};
