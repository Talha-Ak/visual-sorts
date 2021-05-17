import SortListbox from './SortListbox';
import { BiReset, BiRefresh } from 'react-icons/bi';
import { Transition } from '@headlessui/react';
import { Fragment } from 'react';

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
}: Props) => (
  <>
    <div className='w-64'>
      <div className='flex justify-between text-sm font-medium text-gray-500'>
        <span>Array size</span>
        <span>{arraySize}</span>
      </div>
      <input
        type='range'
        min='5'
        max='120'
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
    <div className='w-64 mt-2 mb-8 grid grid-cols-3 gap-x-2 justify-items-center'>
      <button
        onClick={handleShuffleClick}
        type='button'
        className='h-full px-4 py-2 text-sm font-medium text-gray-400 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
      >
        <BiRefresh className="w-5 h-5 mx-auto" aria-hidden="true" />
          Shuffle
      </button>
      <button
        onClick={handleSortClick}
        type='button'
        className='z-0 min-w-0 h-3/4 px-4 py-2.5 self-center text-sm font-medium text-blue-900 bg-blue-100 rounded-md shadow-md transition-transform transform motion-reduce:transition-none duration-75 ease-out active:translate-y-0.5 active:shadow-none hover:bg-blue-200 active:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
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
        <button
          onClick={handleResetClick}
          type='button'
          className='h-full px-4 py-2 text-sm font-medium text-gray-400 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
        >
          <BiReset className="w-5 h-5 mx-auto" aria-hidden="true" />
          Reset
        </button>
      </Transition>
    </div>
  </>
);

export default Controls;