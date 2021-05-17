import Controls from './components/Controls';
import Visualiser from './components/Visualiser';
import sortingAlgorithms, { AnimationStep, generateArray } from './sorts/algorithms';
import { useEffect, useState, useRef } from 'react';

const App = () => {

  const [sortArray, setSortArray] = useState(() => generateArray(40));
  const [selectedSortIdx, setSelectedSortIdx] = useState(0);
  const [active, setActive] = useState(false);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    if (active) {
      startSort();
    } else {
      // if (currentAnim.current) clearTimeout(currentAnim.current);
      setSortArray(sortArray.slice());
    }
  }, [active]);

  const startSort = () => {
    const animations = sortingAlgorithms[selectedSortIdx].sort(sortArray.slice());
    const bars = document.getElementsByClassName('visual-bars')[0].children;
    const delay = 1500 / sortArray.length;
    animateSort(animations, 0, bars, delay);
  };

  const animateSort = (anim: AnimationStep[], idx: number, bars: HTMLCollection, delay: number) => {
    const prevBars = anim[idx - 1]?.indicies;
    prevBars?.forEach(bar => bars[bar].classList.replace('bg-red-500', 'bg-teal-500'));

    const currBar1 = bars[anim[idx].indicies[0]] as HTMLElement;
    const currBar2 = bars[anim[idx].indicies[1]] as HTMLElement;

    if (activeRef.current) {
      switch (anim[idx].type) {
        case 'compare':
          currBar1.classList.replace('bg-teal-500', 'bg-red-500');
          currBar2.classList.replace('bg-teal-500', 'bg-red-500');
          break;
        case 'swap':
          currBar1.classList.replace('bg-teal-500', 'bg-red-500');
          currBar2.classList.replace('bg-teal-500', 'bg-red-500');
          [currBar1.style.height, currBar2.style.height] = [currBar2.style.height, currBar1.style.height];
          break;
        case 'end':
          setActive(false);
          setSortArray(anim[idx].array);
          return;
      }

      idx++;
      setTimeout(() => animateSort(anim, idx, bars, delay), delay);

    } else {
      currBar1.classList.replace('bg-red-500', 'bg-teal-500');
      currBar2.classList.replace('bg-red-500', 'bg-teal-500');
    }
  };

  return (
    <div className='h-screen max-w-screen-2xl mx-auto flex flex-col gap-16 md:gap-4'>
      <h1 className='font-sans font-black text-center text-4xl md:text-6xl'>Visual Sorts</h1>
      <div className="flex-grow gap-y-5 md:grid md:grid-cols-10 items-center">
        <Visualiser sortArray={sortArray} />
        <div className='my-8 md:mt-0 md:col-span-4 lg:col-span-3 flex flex-col items-center gap-y-5 mx-4'>
          <Controls
            isRunning={active}
            sortNames={sortingAlgorithms.map(sort => sort.name)}
            arraySize={sortArray.length}
            handleArrayChange={(e) => setSortArray(generateArray(Number(e.target.value)))}
            handleSortClick={() => setActive(true)}
            handleResetClick={() => setActive(false)}
            handleShuffleClick={() => {
              setActive(false);
              setSortArray(generateArray(sortArray.length));
            }}
            selectedSortIdx={selectedSortIdx}
            setSelectedSortIdx={(e) => setSelectedSortIdx(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
