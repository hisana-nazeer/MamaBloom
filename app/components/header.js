'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, handleLogout } = useAuth();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex justify-between items-center bg-pink-50 border-b border-pink-300 px-8 py-5 shadow-md mb-10">
      <h1 className="text-3xl font-extrabold text-pink-700 tracking-wide select-none">
        🌸 Mom's Memory Keeper
      </h1>

      <div className="relative" ref={dropdownRef}>
        {/* Profile Button */}
        <button
          onClick={toggleDropdown}
          aria-label="User menu"
          className="w-12 h-12 rounded-full bg-pink-300 flex items-center justify-center text-pink-700 font-bold text-lg shadow-md hover:bg-pink-400 transition"
        >
          {user?.email?.charAt(0).toUpperCase() || 'U'}
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-3 w-52 bg-white rounded-lg shadow-lg border border-pink-200 z-50">
            <div className="px-5 py-3 border-b border-pink-200 text-pink-700 font-semibold truncate">
              {user?.email || 'User'}
            </div>
            <ul className="py-2 text-pink-600 text-sm">
              <li className="px-5 py-2 hover:bg-pink-100 cursor-pointer">Profile</li>
              <li className="px-5 py-2 hover:bg-pink-100 cursor-pointer">Settings</li>
              <li
                onClick={handleLogout}
                className="px-5 py-2 hover:bg-red-100 text-red-500 cursor-pointer border-t border-pink-200"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
