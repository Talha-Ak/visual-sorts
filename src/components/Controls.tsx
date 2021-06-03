import SortListbox from './SortListbox';
import InfoSlideover from './InfoSlideover';
import { BiReset, BiRefresh, BiHelpCircle } from 'react-icons/bi';
import { Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import ControlButton from './ControlButton';

interface Props {
  isRunning: boolean;
  sortNames: string[];
  arraySize: number;
  handleArrayChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSortClick: () => void;
  handleResetClick: () => void;
  handleShuffleClick: () => void;
  selectedSortIdx: number;
  setSelectedSortIdx: React.Dispatch<React.SetStateAction<number>>;
}

const Controls = ({
  isRunning,
  sortNames,
  arraySize,
  handleArrayChange,
  handleSortClick,
  handleShuffleClick,
  handleResetClick,
  selectedSortIdx,
  setSelectedSortIdx
}: Props) => {
  const [sliderOpen, setSliderOpen] = useState(false);

  return (
    <>
      <div className='w-64'>
        <div className='text-sm font-medium text-gray-500 dark:text-gray-400'>
          <span>Array size</span>
          <span className='float-right'>{arraySize}</span>
        </div>
        <input
          type='range'
          min='5'
          max='100'
          disabled={isRunning}
          value={arraySize}
          onChange={handleArrayChange}
          className='w-full rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
        />
      </div>

      <SortListbox
        list={sortNames}
        selectedItem={selectedSortIdx}
        setSelectedItem={setSelectedSortIdx}
        disabled={isRunning}
      />

      <button
        onClick={() => setSliderOpen(true)}
        className='flex items-center text-sm font-semibold text-gray-500 dark:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
      >
        <BiHelpCircle className='inline mr-1 align-bottom' aria-hidden='true' />
        How it works
      </button>
      <InfoSlideover sliderOpen={sliderOpen} setSliderOpen={setSliderOpen} selectedSortIdx={selectedSortIdx}/>

      <div className='w-64 mt-1 grid grid-cols-3 gap-x-4'>
        <ControlButton handleClick={handleShuffleClick}>
          <BiRefresh className='w-5 h-5 mx-auto' aria-hidden='true' />
          Shuffle
        </ControlButton>

        <button
          onClick={handleSortClick}
          type='button'
          className='z-0 min-w-0 h-3/4 px-4 py-2.5 self-center text-sm font-title text-blue-900 dark:text-blue-400 bg-blue-100 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600 active:bg-blue-300 dark:active:bg-gray-500 rounded-md shadow-md transition transform motion-reduce:transition-none duration-150 ease-out active:translate-y-0.5 active:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
        >
          Sort
        </button>

        <Transition
          as={Fragment}
          show={isRunning}
          enter='transition ease-out duration-100'
          enterFrom='transform -translate-x-3 opacity-0' enterTo='transform translate-x-0 opacity-100'
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100' leaveTo='opacity-0'
        >
          <ControlButton handleClick={handleResetClick}>
            <BiReset className="w-5 h-5 mx-auto" aria-hidden="true" />
            Reset
          </ControlButton>
        </Transition>
      </div>
    </>
  );
};

export default Controls;