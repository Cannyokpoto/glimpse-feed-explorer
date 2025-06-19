'use client';
import { useTheme } from '@/ThemeProvider/ThemeProvider';
import { LuMoon } from "react-icons/lu";
import { GoSun } from "react-icons/go";



export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();


  return (
    <button
      onClick={toggleTheme}
      className="rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-800 transition h-40px w-40px flex items-center justify-center dark:hover:text-white bg-crossBlue dark:text-white text-white"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <GoSun className='text-25px' /> : <LuMoon className='text-25px' />}
    </button>
  );
}
