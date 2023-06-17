import { useEffect, useState, useRef } from 'react';
import sortingAlgorithms, { AnimationStep, generateArray } from './sorts/algorithms';
import Controls from './components/Controls.tsx';
import Footer from './components/Footer.tsx';
import Visualiser from './components/Visualiser.tsx';

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
      setSortArray(sortArray.slice());
    }
  }, [active]);

  const startSort = () => {
    const animations = sortingAlgorithms[selectedSortIdx].sort(sortArray.slice());
    const bars = document.getElementsByClassName('visual-bars')[0].children;
    const delay = (3000 / (sortArray.length)) - 10;
    animateSort(animations, 0, bars, delay);
  };

  const animateSort = (anim: AnimationStep[], idx: number, bars: HTMLCollection, delay: number) => {
    const prevAnim = anim[idx - 1];
    const prevBars = [];
    if (prevAnim?.type === 'overwrite') {
      prevBars.push(prevAnim.values[0]);
    } else if (prevAnim) {
      prevBars.push(...prevAnim?.values);
    }
    prevBars?.forEach(bar => {
      bars[bar].classList.remove('bg-red-500', 'dark:bg-red-700', 'bg-blue-500', 'dark:bg-blue-700');
      bars[bar].classList.add('bg-teal-500', 'dark:bg-teal-600');
    });

    const currentStep = anim[idx];

    const [value1, value2] = currentStep.values;

    if (activeRef.current) {

      switch (currentStep.type) {
        case 'compare':
          [bars[value1], bars[value2]].forEach(bar => {
            bar.classList.remove('bg-teal-500', 'dark:bg-teal-600');
            bar.classList.add('bg-red-500', 'dark:bg-red-700');
          });
          break;

        case 'swap': {
          const currBar1 = bars[value1] as HTMLElement;
          const currBar2 = bars[value2] as HTMLElement;
          [currBar1, currBar2].forEach(bar => {
            bar.classList.remove('bg-teal-500', 'dark:bg-teal-600');
            bar.classList.add('bg-blue-500', 'dark:bg-blue-700');
          });
          [currBar1.style.height, currBar2.style.height] = [currBar2.style.height, currBar1.style.height];
          break;
        }

        case 'overwrite': {
          const currBar = bars[value1] as HTMLElement;
          currBar.classList.remove('bg-teal-500', 'dark:bg-teal-600');
          currBar.classList.add('bg-blue-500', 'dark:bg-blue-700');
          currBar.style.height = `${(value2 + 1) / sortArray.length * 100}%`;
          break;
        }

        case 'end':
          setActive(false);
          setSortArray(currentStep.array);
          return;
      }

      idx++;
      setTimeout(() => animateSort(anim, idx, bars, delay), delay);

    } else {
      const shuffledBars = Array.from(document.getElementsByClassName('visual-bars')[0].children);
      shuffledBars.forEach(bar => {
        bar.classList.remove('bg-red-500', 'dark:bg-red-700');
        bar.classList.add('bg-teal-500', 'dark:bg-teal-600');
      });
    }
  };

  return (
    <>
    <div className='absolute inset-x-0 top-0 h-48 z-[-1] slant-bottom bg-teal-50 dark:bg-neutral-800 transition-colors duration-150' />
    <div className='absolute inset-x-0 bottom-0 h-32 z-[-1] slant-top bg-blue-50 dark:bg-gray-800 transition-colors duration-150' />
    <div className='min-h-screen max-w-screen-2xl mx-auto flex flex-col gap-12'>
      <h1 className='flex-shrink-0 mt-4 font-title font-black text-center text-4xl md:text-6xl dark:text-neutral-200 transition-colors duration-150'>Visual Sorts</h1>
      <div className='flex-1 gap-y-5 md:grid md:grid-cols-10 items-center content-center'>
        <Visualiser sortArray={sortArray} />
        <div className='mt-8 md:m-0 md:col-span-4 lg:col-span-3 flex flex-col items-center gap-y-5 mx-4'>
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
      <div className='flex-shrink-0 p-4 flex items-center justify-evenly text-gray-500 dark:text-gray-400'>
        <Footer />
      </div>
    </div>
    </>
  );
};

export default App;
