import { Switch } from '@headlessui/react';

interface Props {
  handleToggle: (checked: boolean) => void;
  isNightMode: boolean;
  isDisabled: boolean;
}

const NightModeToggle = ({handleToggle, isNightMode, isDisabled}: Props) => {

  return (
      <Switch
        disabled={isDisabled}
        checked={isNightMode}
        onChange={handleToggle}
        className={`${isNightMode ? 'bg-teal-900' : 'bg-teal-500'}
          inline-flex flex-shrink-0 h-[30.5px] w-[58px] border-2 border-transparent rounded-full cursor-pointer disabled:bg-gray-400 dark:disabled:bg-trueGray-600 disabled:cursor-not-allowed transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${isNightMode ? 'translate-x-7' : 'translate-x-0'}
            pointer-events-none inline-block h-[26px] w-[26px] rounded-full bg-white dark:bg-trueGray-200 shadow-lg transform ring-0 transition ease-in-out duration-200`}
        />
      </Switch>
  );
};

export default NightModeToggle;
