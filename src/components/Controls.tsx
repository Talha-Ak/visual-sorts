import SortListbox from './SortListbox';
import { BiReset } from 'react-icons/bi';
import { Transition } from '@headlessui/react';

interface Props {
  isRunning: boolean;
  sortNames: string[];
  arraySize: number;
  handleArraySizeChange: React.ChangeEventHandler<HTMLInputElement>;
  handleSortClick: () => void;
  handleResetClick: () => void;
  selectedSortIdx: number;
  setSelectedSortIdx: React.Dispatch<React.SetStateAction<number>>;
}

const Controls = ({
  isRunning,
  sortNames,
  arraySize,
  handleArraySizeChange,
  handleSortClick,
  handleResetClick,
  selectedSortIdx,
  setSelectedSortIdx
}: Props) => (
  <>
    <div className='w-56'>
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
        onChange={handleArraySizeChange}
        className='w-full rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
      />
    </div>

    <SortListbox
      list={sortNames}
      selectedItem={selectedSortIdx}
      setSelectedItem={setSelectedSortIdx}
      disabled={isRunning}
    />
    <div className='w-full mt-2 mb-4 grid grid-cols-5 justify-items-center'>
      <button
        onClick={handleSortClick}
        type='button'
        className='col-start-3 z-0 w-min px-4 py-2.5 text-sm font-medium text-blue-900 bg-blue-100 rounded-md shadow-md transition-transform transform motion-reduce:transition-none duration-75 ease-out active:translate-y-0.5 active:shadow-none hover:bg-blue-200 active:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
      >
        Sort
    </button>
      <Transition
        show={isRunning}
        enter='transition ease-out duration-100'
        enterFrom='transform -translate-x-3 opacity-0' enterTo='transform translate-x-0 opacity-100'
        leave='transition ease-in duration-75'
        leaveFrom='opacity-100' leaveTo='opacity-0'
      >
        <button
          onClick={handleResetClick}
          type='button'
          className='col-start-4 h-full justify-self-start ml-1 p-2 text-sm font-medium text-gray-400 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
        >
          <BiReset className="inline align-text-bottom mr-1 w-5 h-5 m-0" aria-hidden="true" />
          Reset
        </button>
      </Transition>
    </div>
  </>
);

export default Controls;