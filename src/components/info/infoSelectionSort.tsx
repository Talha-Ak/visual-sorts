import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { ocean } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('javascript', js);

const code = `const array = [...];

// Loop through array up to array.length - 1
// because last element will already be sorted.
for (let i = 0; i < array.length - 1; i++) {

  // Keep track of index with smallest element.
  let minIndex = i;

  // Compare every index with minIndex.
  // If there is a smaller element, update minIndex.
  for (let j = i + 1; j < array.length; j++) {
    if (array[j] < array[minIndex]) minIndex = j;
  }

  // Swap elements in minIndex and current index (i).
  if (minIndex !== i) {
      temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
  }
}`;

const infoSelectionSort = () => (
  <div className='text-sm'>
    <p>
      Selection sort works by dividing the array into two parts - a sorted part and an unsorted part.
    </p>

    <br />
    
    <p>
      The algorithm then looks through the entire array for the smallest element,
      and places it in the first position of the array.
      It proceeds to then find the next smallest element in the unsorted part of the array,
      and places it in the second position of the array.
    </p>

    <br />

    <p>
      This continues until the second largest element is placed in the second last position.
      The largest element will already be sorted as it will have swapped with the element that was in the last position.
    </p>

    <br />

    <SyntaxHighlighter language='javascript' style={ocean} customStyle={{borderRadius: '0.375rem'}}>
      {code}
    </SyntaxHighlighter>
  </div>
);

export default infoSelectionSort;