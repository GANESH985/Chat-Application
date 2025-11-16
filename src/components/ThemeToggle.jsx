import { Sun, Moon } from 'lucide-react';

function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon size={20} className="text-gray-700 dark:text-gray-300" />
      ) : (
        <Sun size={20} className="text-gray-700 dark:text-gray-300" />
      )}
    </button>
  );
}

export default ThemeToggle;
