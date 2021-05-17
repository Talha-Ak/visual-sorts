import Controls from './components/Controls';
import NightModeToggle from './components/NightModeToggle';
import Visualiser from './components/Visualiser';
import sortingAlgorithms, { AnimationStep, generateArray } from './sorts/algorithms';
import { FaGithub } from 'react-icons/fa';
import { HiSun, HiMoon } from 'react-icons/hi';
import { useEffect, useState, useRef } from 'react';
import ControlButton from 'components/ControlButton';

const App = () => {

  const [sortArray, setSortArray] = useState(() => generateArray(40));
  const [selectedSortIdx, setSelectedSortIdx] = useState(0);
  const [active, setActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));
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

  useEffect(() => {
    localStorage.setItem('isDarkTheme', isDarkMode.toString());
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const startSort = () => {
    const animations = sortingAlgorithms[selectedSortIdx].sort(sortArray.slice());
    const bars = document.getElementsByClassName('visual-bars')[0].children;
    const delay = 1500 / sortArray.length;
    animateSort(animations, 0, bars, delay);
  };

  const animateSort = (anim: AnimationStep[], idx: number, bars: HTMLCollection, delay: number) => {
    const prevBars = anim[idx - 1]?.indicies;
    prevBars?.forEach(bar => {
      bars[bar].classList.remove('bg-red-500', 'dark:bg-red-700');
      bars[bar].classList.add('bg-teal-500', 'dark:bg-teal-600');
    });

    const currBar1 = bars[anim[idx].indicies[0]] as HTMLElement;
    const currBar2 = bars[anim[idx].indicies[1]] as HTMLElement;

    if (activeRef.current) {
      switch (anim[idx].type) {
        case 'compare':
          [currBar1, currBar2].forEach(bar => {
            bar.classList.remove('bg-teal-500', 'dark:bg-teal-600');
            bar.classList.add('bg-red-500', 'dark:bg-red-700');
          });
          break;
        case 'swap':
          [currBar1, currBar2].forEach(bar => {
            bar.classList.remove('bg-teal-500', 'dark:bg-teal-600');
            bar.classList.add('bg-red-500', 'dark:bg-red-700');
          });
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
      [currBar1, currBar2].forEach(bar => {
        bar.classList.remove('bg-red-500', 'dark:bg-red-700');
        bar.classList.add('bg-teal-500', 'dark:bg-teal-600');
      });
    }
  };

  return (
    <div className='h-screen max-w-screen-2xl mx-auto flex flex-col gap-8 md:gap-0'>
      <h1 className='mt-4 font-sans font-black text-center text-4xl md:text-6xl dark:text-trueGray-200 transition-colors duration-150'>Visual Sorts</h1>
      <div className='flex-grow gap-y-5 md:grid md:grid-cols-10 items-center'>
        <Visualiser sortArray={sortArray} />
        <div className='my-8 md:m-0 md:col-span-4 lg:col-span-3 flex flex-col items-center gap-y-5 mx-4'>
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
        <div className='p-4 flex items-center justify-evenly text-gray-500 dark:text-gray-400'>
          <ControlButton handleClick={() => window.location.href = 'https://github.com/Talha-Ak/visual-sorts'}>
            View on
            <FaGithub className='ml-1.5 mb-1 inline'/>
          </ControlButton>
          <div className='flex items-center justify-center space-x-1.5'>
            <HiSun className='inline w-5 h-5' />
            <NightModeToggle isNightMode={isDarkMode} handleToggle={setIsDarkMode}/>
            <HiMoon className='inline w-5 h-5' />
          </div>
        </div>
    </div>
  );
};

export default App;