import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { ocean } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('javascript', js);

const code = `const array = [...];

// First parameter is the actual array to be sorted.
// Second parameter is a array copy for working.
mergeSort(array, array.slice(), 0, array.length - 1);

const mergeSort =
  (array, clonedArray, beginIdx, endIdx) => {

  // Base case - if subarray is length 1, return.
  if (beginIdx === endIdx) return;

  // Split array in half, run merge sort on halves.
  const midIdx = Math.floor((beginIdx + endIdx) / 2);

  mergeSort(clonedArray, array, beginIdx, midIdx);
  mergeSort(clonedArray, array, midIdx + 1, endIdx);
  merge(array, clonedArray, beginIdx, midIdx, endIdx);

  return array;
};

const merge =
  (array, clonedArray, beginIdx, midIdx, endIdx) => {

  // The index of the main array element to compare.
  let i = beginIdx;

  // The index of the cloned array element to compare.
  let j = midIdx + 1;

  // The index of the main array to insert into.
  let k = beginIdx;


  // Compare & add the smaller first element.
  // Increment index from the subarray that was smaller,
  // and repeat until one array is empty.
  while (i <= midIdx && j <= endIdx) {
      if (clonedArray[i] <= clonedArray[j]) {
      array[k++] = clonedArray[i++];
    } else {
      array[k++] = clonedArray[j++];
    }
  }

  // Go through subarrays and add left over elements.
  while (i <= midIdx) {
    array[k++] = clonedArray[i++];
  }
  while (j <= endIdx) {
    array[k++] = clonedArray[j++];
  }
};`;

const infoMergeSort = () => (
  <div className='text-sm'>
    <p>
    Merge sort is a divide and conquer algorithm that:
    </p>
    <ol className='list-inside list-decimal ml-4'>
      <li>Divides the array into subarrays, each containing one element.</li>
      <li>Continually merge subarrays together to produce sorted subarrays, until there is one subarray left (the sorted array).</li>
    </ol>

    <br />

    <p>
      The dividing is done simply by halving the array each time, using recursion to merge sort the halves.
      This is done until all subarrays contain one element (an array of one element is sorted).
    </p>

    <br />

    <p>
      The merging is done by comparing the first element of the two subarrays to be merged.
      The smaller element of the two is moved to the beginning of the main sorting array,
      and the subarray with the smaller first element moves to the second element.

      The comparison is run again until one of the subarrays are empty.
      At that point, the remaining subarray is appended to the sorting array.
    </p>

    <br />

    <p>
      The merge step is repeated for all subarray pairs until the final two subarrays are merged, leaving the sorted array.
    </p>

    <br />

    <SyntaxHighlighter language='javascript' style={ocean} customStyle={{borderRadius: '0.375rem'}}>
      {code}
    </SyntaxHighlighter>
  </div>
);

export default infoMergeSort;