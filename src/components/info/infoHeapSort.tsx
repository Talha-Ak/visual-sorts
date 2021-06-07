import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { ocean } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('javascript', js);

const code = `const array = [...];

// Create the heap.
buildHeap(array);

let end = array.length - 1;

while (end > 0) {
  // Swap the root node of the heap with the last node.
  temp = array[0];
  array[0] = array[end];
  array[end] = temp;

  // Reduce the size of the heap.
  end--;

  // Restore heap property.
  siftDown(array, 0, end);
}

const buildHeap = (array) => {
  // Get the parent of the last element in the array.
  let node = getNodeParent(array.length - 1);

  // Put all elements in correct location in heap.
  while (node >= 0) {
    siftDown(array, node, array.length - 1);
    node--;
  }
};

const siftDown = (array, node, end) => {

  // Loop if the current node has a child.
  while (getNodeLeftChild(node) <= end) {
    const leftChild = getNodeLeftChild(node);
    let nodeToSwap = node;

    // If child is greater than current "parent",
    // mark the left child as node to swap with.
    // (Parent node should be greater than children.)
    if (array[nodeToSwap] < array[leftChild]) {
      nodeToSwap = leftChild;
    }

    // If there is a right child also present,
    // and right child is greater than the parent
    // or left child, mark the right child instead.
    const rightChild = getNodeRightChild(node);
    if (
      rightChild <= end
      && array[nodeToSwap] < array[rightChild]
    ) {
      nodeToSwap = rightChild;
    }

    // If no children were marked,
    // current node already in corrent position.
    if (nodeToSwap === node) return;
    
    // Swap the child and parent around.
    temp = array[nodeToSwap];
    array[nodeToSwap] = array[node];
    array[node] = temp;

    // Nodes were swapped around, update the variable 
    // so it points to the correct element being sifted.
    node = nodeToSwap;
  }
};

// Helper functions to get indexes of heap nodes.
const getNodeParent = (i) => Math.floor((i - 1) / 2);
const getNodeLeftChild = (i) => 2 * i + 1;
const getNodeRightChild = (i) => 2 * i + 2;`;

const infoHeapSort = () => (
  <div className='text-sm'>
    <p>
      Heap sort works by dividing the array into two parts - a sorted part and an unsorted part.
    </p>

    <br />
    
    <p>
      The algortihm itself works in two stages.
    </p>

    <p>
      In the first stage, a <a className='underline' href='https://en.wikipedia.org/wiki/Heap_(data_structure)'>binary max-heap</a> is created from the unsorted region.
      This is done by mapping the root node of the heap to index 0, and then for all nodes:
    </p>

    <ol className="list-inside list-disc ml-4">
      <li>The parent of a node is mapped to <i>floor((i-1) / 2)</i></li>
      <li>The left child of a node is mapped to <i>2i + 1</i></li>
      <li>The right child of a node is mapped to <i>2i + 2</i></li>
    </ol>

    <br />

    <p>
      In the second stage, the sorted part is populated by continually removing the root node from the heap and into the sorted part of the array.
      This causes the heap property to be violated, and so the heap condition is restored (by sifting the swapped-in element at the root downwards) before removing the root node again.
    </p>

    <br />

    <p>
      Once all elements from the heap have been removed, the array is sorted.
    </p>

    <br />

    <SyntaxHighlighter language='javascript' style={ocean} customStyle={{borderRadius: '0.375rem'}}>
      {code}
    </SyntaxHighlighter>
  </div>
);

export default infoHeapSort;