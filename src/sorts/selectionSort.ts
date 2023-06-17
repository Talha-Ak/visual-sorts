import infoSelectionSort from '../components/info/infoSelectionSort.tsx';
import {SortingAlgorithm, AnimationStep, isSmaller, swap } from './algorithms';

const sort = (array: number[]) => {
  const anim: AnimationStep[] = [];

  // Can do array.length - 1 because last element will already be sorted.
  for (let i = 0; i < array.length - 1; i++) { 
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (isSmaller(j, minIndex, array, anim)) minIndex = j;
    }
    if (minIndex !== i) {
      swap(i, minIndex, array, anim);
    }
  }

  anim.push({type: 'end', values: [-1, -1], array});
  return anim;
};

export const selectionSort: SortingAlgorithm = {
  name: 'Selection Sort',
  sort,
  info: infoSelectionSort,
};
