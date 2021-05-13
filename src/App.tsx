import Controls from './components/Controls';
import Visualiser from './components/Visualiser';
import sortingAlgorithms, { generateArray } from './sorts/algorithms';
import { useEffect, useState, useRef } from 'react';

const App = () => {

  const [sortArray, setSortArray] = useState(() => generateArray(40));
  const [selectedSortIdx, setSelectedSortIdx] = useState(0);
  const [active, setActive] = useState(false);
  const currentAnim = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (active) {
      startSort();
    } else {
      if (currentAnim.current) clearTimeout(currentAnim.current);
      setSortArray(sortArray.slice());
    }
  }, [active]);

  const startSort = () => {
    const animations = sortingAlgorithms[selectedSortIdx].sort(sortArray.slice());
    const bars = document.getElementsByClassName('visual-bars')[0].children;
    const delay = 2000 / sortArray.length;
    animations.forEach((anim, i) => {
      i++;
      const bar1 = bars[anim.indicies[0]];
      const bar2 = bars[anim.indicies[1]];

      currentAnim.current = setTimeout(() => {
        switch (anim.type) {
          case 'compare':
            bar1.classList.replace('bg-teal-500', 'bg-red-500');
            bar2.classList.replace('bg-teal-500', 'bg-red-500');
            console.log(bar1);
            setTimeout(() => {
            bar1.classList.replace('bg-red-500', 'bg-teal-500');
            bar2.classList.replace('bg-red-500', 'bg-teal-500');
          }, delay - 10);
            break;
          case 'swap':
            [(bar1 as HTMLElement).style.height, (bar2 as HTMLElement).style.height] = 
            [(bar2 as HTMLElement).style.height, (bar1 as HTMLElement).style.height];
            break;
          case 'end':
            setActive(false);
            setSortArray(anim.array);
        }
      }, i * delay);
    });
  };

  return (
    <div className='h-screen max-w-screen-2xl mx-auto flex flex-col gap-16 md:gap-4'>
      <h1 className='font-sans font-black text-center text-4xl md:text-6xl'>Visual Sorts</h1>
      <div className="flex-grow gap-y-5 md:grid md:grid-cols-10 items-center">
        <Visualiser sortArray={sortArray} />
        <div className='mt-8 md:mt-0 md:col-span-3 flex flex-col items-center gap-y-5 mx-4'>
          <Controls
            isRunning={active}
            sortNames={sortingAlgorithms.map(sort => sort.name)}
            arraySize={sortArray.length}
            handleArraySizeChange={(e) => setSortArray(generateArray(Number(e.target.value)))}
            handleSortClick={() => setActive(true)}
            handleResetClick={() => setActive(false)}
            selectedSortIdx={selectedSortIdx}
            setSelectedSortIdx={(e) => {
              setSelectedSortIdx(e);
              if (selectedSortIdx !== e.valueOf()) setSortArray(generateArray(sortArray.length));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
