import ControlButton from './ControlButton';
import NightModeToggle from './NightModeToggle';
import { FaGithub } from 'react-icons/fa';
import { HiSun, HiMoon } from 'react-icons/hi';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

  useEffect(() => {
    localStorage.setItem('isDarkTheme', isDarkMode.toString());
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <>
      <ControlButton handleClick={() => window.location.href = 'https://github.com/Talha-Ak/visual-sorts'}>
        View on
        <FaGithub className='ml-1.5 mb-1 inline' />
      </ControlButton>
      <div className='flex items-center justify-center space-x-1.5'>
        <HiSun className='inline w-5 h-5' />
        <NightModeToggle isNightMode={isDarkMode} handleToggle={setIsDarkMode} />
        <HiMoon className='inline w-5 h-5' />
      </div>
    </>
  );
};

export default Footer;