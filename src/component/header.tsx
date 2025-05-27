'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '@/db/firebase'; 
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import { FiSearch } from 'react-icons/fi';

interface MenuItemProps {
  icon: string;
  text: string;
  onClick: () => void;
}

const MenuItem = ({ icon, text, onClick }: MenuItemProps) => {
  return (
    <li>
      <motion.button 
        whileHover={{ scale: 1.02, backgroundColor: 'rgba(51, 51, 51, 0.5)' }}
        whileTap={{ scale: 0.98 }}
        className="w-5 flex items-center space-x-4 p-4 rounded-lg text-white hover:bg-[#333333] transition-all duration-200 text-lg"
        onClick={onClick}
      >
        <span className="text-xl">{icon}</span>
        <span>{text}</span>
      </motion.button>
    </li>
  );
};

export const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [user, setUser] = useState<User | null>(null); // State to track user

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup the listener
  }, []); // Empty dependency array to run only on mount and unmount

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.side-panel') && !target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
    setIsMenuOpen(false); // Close the menu
  };



  return (
    <>
      {/* Full-width Header */}
      <header className="fixed top-0 left-0 w-full bg-[#26262F] border-b border-[#333333] p-4 px-8 z-50">
        <div className="flex items-center justify-between w-full mx-auto">
          {/* Left: Logo - MOVIELIST */}
          <h1 className="text-lg font-bold text-blue-500 whitespace-nowrap mr-4">MOVIELIST</h1>
          
          {/* Center: Search Bar - Wider and centered */}
          <div className="min-w-search flex  mx-8">
            <input
              type="text"
              placeholder="Search movies, TV shows..."
              className="w-full px-4 py-2 rounded-full bg-[#1D1D24] text-white placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              
            />
          </div>
          
          {/* Right: Hamburger Menu - White icon */}
          <div className="flex justify-end ml-4">
            <button 
              className="menu-button p-2 rounded-full hover:bg-[#333333] transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={isMenuOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 90 },
                  closed: { rotate: 0 }
                }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-white" // Ensured white color
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </motion.div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Side Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              className="side-panel fixed top-0 right-0 h-full w-80 bg-[#26262F] z-40 border-l border-[#333333] shadow-xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ top: '64px' }} // Matches header height
            >
              <div className="p-6 border-b border-[#333333] flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold mb-4">
                
                </div>
                <div className="text-center">
                  {user ? (
                    <>
                      <p className="text-white font-medium text-lg">{user.displayName || 'User'}</p>
                      <p className="text-gray-400 text-sm mt-1">{user.email}</p>
                    </>
                  ) : (
                    <p className="text-gray-400 text-sm mt-1">Not logged in</p>
                  )}
                </div>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-2">
                <MenuItem
                    icon="🏠"
                    text="Home"
                    onClick={() => handleNavigation('/')}
                  />
                  {/* Conditionally render Library and Profile based on login status */}
                  {user && (
                    <>
                      <MenuItem
                        icon="📚"
                        text="Library"
                        onClick={() => handleNavigation('/library')}
                      />
                      <MenuItem
                        icon="👤"
                        text="Profile"
                        onClick={() => handleNavigation('/profile')}
                      />
                    </>
                  )}

                  {/* Conditionally render Login/Signup or Logout */}
                  {user ? (
                    <MenuItem
                      icon="🚪"
                      text="Logout"
                      onClick={handleLogout} // Logout functionality
                    />
                  ) : (
                    <MenuItem
                      icon="🔑" // Use a key icon for login/signup
                      text="Login/Signup"
                      onClick={() => handleNavigation('/login')} // Navigate to login page
                    />
                  )}
                </ul>
              </nav>
            </motion.div>

            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              style={{ top: '64px' }} // Matches header height
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};