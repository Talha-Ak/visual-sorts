import { bubbleSort } from './bubbleSort';
import { insertionSort } from './insertionSort';
import { selectionSort } from './selectionSort';

export interface SortingAlgorithm {
  name: string;
  sort: (array: number[]) => AnimationStep[];
}

export interface AnimationStep {
  type: 'compare' | 'swap' | 'end';
  indicies: [number, number];
  array: number[];
}

export const isGreater = (idx1: number, idx2: number, array: number[], animArray: AnimationStep[]) => {
  animArray.push({type: 'compare', indicies: [idx1, idx2], array});
  return array[idx1] > array[idx2];
};

export const isSmaller = (idx1: number, idx2: number, array: number[], animArray: AnimationStep[]) => {
  animArray.push({type: 'compare', indicies: [idx1, idx2], array});
  return array[idx1] < array[idx2];
};

export const swap = (idx1: number, idx2: number, array: number[], animArray: AnimationStep[]) => {
  [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
  animArray.push({type: 'swap', indicies: [idx1, idx2], array});
};

export const generateArray = (size: number): number[] => {
  console.log('generating array');
  
  const array = Array.from(Array(size).keys());

  // Durstenfeld shuffle algorithm: https://stackoverflow.com/a/12646864
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const algorithms = [insertionSort, selectionSort, bubbleSort];

export default algorithms;