import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { ocean } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('javascript', js);

const code = `const array = [...];
let swapped = true;
let searchSize = array.length;

// Loop until swapping stops.
while (swapped) {
  swapped = false;

  // Loop through the array.
  // [i - 1] and [i] used to compare element pairs,
  // so set i = 1 (not 0)
  for (let i = 1; i < searchSize; i++) {
    if (array[i-1] > array[i]) {
      // Swap elements
      temp = array[i - 1];
      array[i - 1] = array[i];
      array[i] = temp;

      // Mark swapped as true, continue looping
      swapped = true;
    }
  }

  // Largest element is sorted, exclude last index
  // by reducing searchSize.
  searchSize--;
}`;

const infoBubbleSort = () => (
  <div className='text-sm'>
    <p>
      Bubble sort works by simply swapping adjacent elements if they are in the wrong order.
    </p>

    <br />

    <p>
      The algorithm loops through the entire array, checking if each pair of elements are in the right order.
      If not, the pair of elements are swapped. This continues until the end of the array is reached, where the largest
      element <b>bubbles</b> up to the top.
    </p>

    <br />

    <p>
      This process is repeated again, excluding the last index (as it is already sorted now).
      Once the algorithm loops over the array without swapping elements, the algorithm terminates and the sort is complete.
    </p>

    <br />

    <SyntaxHighlighter language='javascript' style={ocean} customStyle={{borderRadius: '0.375rem'}}>
      {code}
    </SyntaxHighlighter>
  </div>
);

export default infoBubbleSort;