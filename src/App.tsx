import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="lg:hidden w-10" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Chat Assistant
              </h1>
            </div>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </header>

          <main className="flex-1 overflow-hidden">
            <Routes>
              <Route path="/" element={<ChatWindow />} />
              <Route path="/chat/:sessionId" element={<ChatWindow />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
