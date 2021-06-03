import { bubbleSort } from './bubbleSort';
import { insertionSort } from './insertionSort';
import { selectionSort } from './selectionSort';
import { mergeSort } from './mergeSort';
import { quickSort } from './quickSort';
import { heapSort } from './heapsort';

export interface SortingAlgorithm {
  name: string;
  sort: (array: number[]) => AnimationStep[];
  info: () => JSX.Element;
}

export type AnimationStep = AnimationChange | AnimationEnd;

interface AnimationBase {
  type: string;
  values: [number, number];
}
interface AnimationChange extends AnimationBase {
  type: 'compare' | 'swap' | 'overwrite';
}

interface AnimationEnd extends AnimationBase {
  type: 'end';
  array: number[];
}

export const isGreater = (idx1: number, idx2: number, array: number[], animArray: AnimationStep[]) => {
  animArray.push({type: 'compare', values: [idx1, idx2]});
  return array[idx1] > array[idx2];
};

export const isSmaller = (idx1: number, idx2: number, array: number[], animArray: AnimationStep[]) => {
  animArray.push({type: 'compare', values: [idx1, idx2]});
  return array[idx1] < array[idx2];
};

export const isLeq = (idx1: number, idx2: number, array: number[], animArray: AnimationStep[]) => {
  animArray.push({type: 'compare', values: [idx1, idx2]});
  return array[idx1] <= array[idx2];
};

export const swap = (idx1: number, idx2: number, array: number[], animArray: AnimationStep[]) => {
  [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
  animArray.push({type: 'swap', values: [idx1, idx2]});
};

export const generateArray = (size: number): number[] => {
  const array = Array.from(Array(size).keys());

  // Durstenfeld shuffle algorithm: https://stackoverflow.com/a/12646864
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const algorithms = [bubbleSort, heapSort, insertionSort, mergeSort, quickSort, selectionSort];

export default algorithms;