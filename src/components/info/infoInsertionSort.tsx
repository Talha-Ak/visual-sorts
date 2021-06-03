import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { ocean } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('javascript', js);

const code = `const array = [...];
let i = 1; // Skip first element

// Loop through the entire array...
while (i < array.length) {
    let j = i;
    // Compare previous (sorted) element with current.
    // If previous is larger, swap.
    while (j > 0 && array[j + 1] > array[j]) {
      temp = array[j + 1];
      array[j + 1] = array[j];
      array[j] = temp;

      // Compare again with the next sorted element.
      j--;
    }

    // If previous is smaller, element is sorted.
    // Go to the next unsorted element.
    i++;
}`;

const infoInsertionSort = () => (
  <div className='text-sm'>
    <p>
      Insertion sort works by dividing the array into two parts - a sorted part and an unsorted part.
    </p>

    <p>
      An element in the unsorted part is compared with the elements in the sorted part until the correct position is found,
      where it is then <b>insert</b>ed.
    </p>

    <br />

    <p>Initially, the sorted part starts with a single element (a single element is already sorted).</p>

    <p>
      The first element in the unsorted part is compared with the largest element in the sorted part of the array
      (i.e. the previous element).
    </p>

    <br />

    <ul className='list-disc list-inside ml-4'>
      <li>If that element is larger, both elements swap positions.</li>
      <li>If the element is smaller, the first element is sorted.</li>
    </ul>

    <br />

    <p>
      This process continues until the end of the array is reached.
    </p>

    <br />

    <SyntaxHighlighter language='javascript' style={ocean} customStyle={{borderRadius: '0.375rem'}}>
      {code}
    </SyntaxHighlighter>
  </div>
);

export default infoInsertionSort;