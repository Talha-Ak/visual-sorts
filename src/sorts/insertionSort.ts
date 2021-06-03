import { SortingAlgorithm, AnimationStep, isGreater, swap } from './algorithms';
import infoInsertionSort from '../components/info/infoInsertionSort';

const sort = (array: number[]) => {
  const anim: AnimationStep[] = [];

  let i = 1; // Skip first element
  while (i < array.length) {
    let j = i;
    // Compare previous element with current. If previous is larger, swap.
    while (j > 0 && isGreater(j-1, j, array, anim)) {
      swap(j-1, j, array, anim);
      j--;
    }
    i++;
  }

  anim.push({type: 'end', values: [-1, -1], array});
  return anim;
};

export const insertionSort: SortingAlgorithm = {
  name: 'Insertion Sort',
  sort,
  info: infoInsertionSort,
};