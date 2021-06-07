import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { ocean } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('javascript', js);

const code = `const array = [...];
quickSort(array, 0, array.length - 1);

const quickSort = (array, startIdx, endIdx) => {
  if (startIdx < endIdx) {
    // Divide the array into two halves, sort each half.
    const p = partition(array, startIdx, endIdx);
    quickSort(array, startIdx, p);
    quickSort(array, p + 1, endIdx);
  }
};

const partition = (array, startIdx, endIdx) => {

  // Set pivot to be the middle of the array.
  // This is arbitrary, pivot can be any element.
  let pivotIdx = Math.floor((startIdx + endIdx) / 2);

  // Set the two pointers to be the ends of the array.
  let i = startIdx;
  let j = endIdx;

  while (true) {

    // Loop until element at i is smaller than pivot.
    while (array[i] < array[pivotIdx]) {
      i++;
    }

    // Loop until element at j is greater than pivot.
    while (array[j] > array[pivotIdx]) {
      j--;
    }

    // If pointers crossed over, division completed.
    if (i >= j) {
      return j;
    }

    // Otherwise, swap elements at i and j.
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;

    // Keep track of pivot element idx if swapped.
    if (i === pivotIdx) {
      pivotIdx = j;
    } else if (j === pivotIdx) {
      pivotIdx = i;
    }
  }
};`;

const infoQuickSort = () => (
  <div className='text-sm'>
    <p>
      Quick sort is a divide and conquer algorithm that:
    </p>

    <ol className="list-decimal list-inside ml-4">
      <li>Continually divides the array into two subarrays depending on the element in comparison to a &quot;pivot&quot;.</li>
      <li>Combining the sorted subarrays together to give the entire sorted array.</li>
    </ol>

    <br />

    <p>
      The algorithm starts by choosing a pivot element within the array.
      All elements before the pivot need to be smaller than the pivot element, and elements after the pivot need to be larger.
      Two pointers are then initialised at the beginning and end of the array.
      These pointers move towards the center of the array until the left pointer points to an element greater than the pivot
      and the right pointer points to an element smaller than the pivot.
    </p>

    <br />

    <p>
      If the greater element is before the smaller element (i.e. the elements are on the wrong sides of the pivot) they are swapped.
      This process continues until eventually the pointers cross over each other - where the pivot belongs.
    </p>

    <br />

    <p>
      This sort is then repeated for all the elements before the original pivot and all elements after the original pivot.
    </p>

    <br />

    <SyntaxHighlighter language='javascript' style={ocean} customStyle={{borderRadius: '0.375rem'}}>
      {code}
    </SyntaxHighlighter>
  </div>
);

export default infoQuickSort;