import sortingAlgorithms from '../sorts/algorithms';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { HiX } from 'react-icons/hi';

interface Props {
  sliderOpen: boolean;
  setSliderOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSortIdx: number;
}

const InfoSlideover = ({ sliderOpen, setSliderOpen, selectedSortIdx }: Props) => {

  return (
    <Transition.Root show={sliderOpen} as={Fragment}>
      <Dialog as="div" static className="fixed inset-0 overflow-hidden" open={sliderOpen} onClose={setSliderOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 dark:bg-neutral-900 bg-opacity-75 dark:bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-out duration-500 sm:duration-600"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-600"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative w-screen max-w-lg">
                <div className="h-full flex flex-col py-6 bg-white dark:bg-neutral-800 shadow-xl overflow-y-auto">
                  <div className="inline-flex justify-between px-4 sm:px-6">
                    <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-neutral-200">
                      {sortingAlgorithms[selectedSortIdx].name}
                    </Dialog.Title>
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                        <button
                          className="rounded-md text-gray-400 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                          onClick={() => setSliderOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <HiX className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </Transition.Child>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6 text-gray-900 dark:text-neutral-200">
                    {sortingAlgorithms[selectedSortIdx].info()}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default InfoSlideover;
