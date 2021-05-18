import React, { PropsWithChildren } from 'react';

interface Props {
  handleClick: () => void;
}

const ControlButton = React.forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(({handleClick, children}, ref) => (
    <button
      ref={ref}
      onClick={handleClick}
      type='button'
      className='h-full px-4 py-2 text-sm font-title text-gray-400 bg-gray-50 dark:bg-trueGray-800 hover:bg-gray-100 dark:hover:bg-trueGray-700 active:bg-gray-200 dark:active:bg-trueGray-600 transition-colors duration-150 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
    >
      {children}
    </button>
));

ControlButton.displayName = 'ControlButton';

export default ControlButton;

