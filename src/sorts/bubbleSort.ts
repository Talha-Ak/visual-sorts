import infoBubbleSort from '../components/info/infoBubbleSort.tsx';
import {SortingAlgorithm, AnimationStep, isGreater, swap } from './algorithms';

const sort = (array: number[]) => {
  const anim: AnimationStep[] = [];

  let swapped = true;
  let searchSize = array.length;

  while (swapped) {
    swapped = false;

    // Start at 1 since i-1 is used to compare.
    //array.length - 1 because last position will be naturally sorted.
    for (let i = 1; i < searchSize; i++) {
      if (isGreater(i-1, i, array, anim)) {
        swap(i-1, i, array, anim);
        swapped = true;
      }
    }
    searchSize--;
  }

  anim.push({type: 'end', values: [-1, -1], array: array});
  return anim;
};

export const bubbleSort: SortingAlgorithm = {
  name: 'Bubble Sort',
  sort,
  info: infoBubbleSort,
};
