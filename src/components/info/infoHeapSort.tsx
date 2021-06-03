import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import { ocean } from 'react-syntax-highlighter/dist/esm/styles/hljs';

SyntaxHighlighter.registerLanguage('javascript', js);

const code = `To be completed`;

const infoHeapSort = () => (
  <div className='text-sm'>
    <p>
    <a className='underline' href='https://en.wikipedia.org/wiki/Heapsort'>https://en.wikipedia.org/wiki/Heapsort</a>
    </p>

    <br />

    <SyntaxHighlighter language='javascript' style={ocean} customStyle={{borderRadius: '0.375rem'}}>
      {code}
    </SyntaxHighlighter>
  </div>
);

export default infoHeapSort;