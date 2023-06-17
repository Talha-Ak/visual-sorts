import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { HiCheck, HiSelector } from 'react-icons/hi';

interface Props {
  list: string[];
  selectedItem: number;
  setSelectedItem: React.Dispatch<React.SetStateAction<number>>;
  disabled: boolean;
}

const SortListbox = ({list, selectedItem, setSelectedItem, disabled}: Props) => {

  return (
    <div className="w-64">
      <Listbox value={selectedItem} onChange={setSelectedItem} disabled={disabled}>
          <>
            <Listbox.Label className="text-sm font-medium text-gray-500 dark:text-gray-400">Algorithm</Listbox.Label>
            <div className="relative">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left sm:text-sm bg-white dark:bg-neutral-800 disabled:bg-gray-100 dark:disabled:bg-neutral-600 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-150 rounded-md shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-default">
                <span className="block truncate dark:text-gray-400">{list[selectedItem]}</span>
                <span className="absolute inset-y-0 right-0 flex items-center p-2 pointer-events-none">
                  <HiSelector
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 translate-y-0"
                leaveTo="transform opacity-0 translate-y-1.5 md:-translate-y-1.5"
              >
                <Listbox.Options static className="absolute bottom-full md:bottom-auto z-10 w-full py-1 my-1 overflow-auto text-base bg-white dark:bg-neutral-800 rounded-md shadow-lg max-h-64 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {list.map((name, nameIdx) => (
                    <Listbox.Option
                      key={nameIdx}
                      className={({ active }) =>
                        `${active ? 'text-blue-900 dark:text-blue-300 bg-blue-100 dark:bg-gray-700' : 'text-gray-900 dark:text-gray-400'}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                      }
                      value={nameIdx}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`${selected ? 'font-medium' : 'font-normal'
                              } block truncate`}
                          >
                            {name}
                          </span>
                          {selected ? (
                            <span
                              className={`${active ? 'text-blue-600' : 'text-blue-600'}
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                            >
                              <HiCheck className="w-5 h-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
      </Listbox>
    </div>
  );
};

export default SortListbox;
