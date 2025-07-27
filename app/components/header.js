"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react"; // Icons for menu toggle

export default function Header() {
  const { user, handleLogout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-pink-600">
        Mamabloom
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-4 items-center">
        <Link href="/notes" className="text-pink-500 hover:text-pink-700 font-medium">
          Journal
        </Link>
        <Link href="/chat" className="text-pink-500 hover:text-pink-700 font-medium">
          Chat
        </Link>
        {user ? (
          <>
            <span className="text-gray-600 font-medium">{user.email}</span>
            <button
              onClick={handleLogout}
              className="ml-2 bg-pink-500 hover:bg-pink-700 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="text-pink-500 hover:text-pink-700 font-medium">
            Login
          </Link>
        )}
      </nav>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-pink-600"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden flex flex-col items-start px-6 py-4 space-y-3 z-40">
          <Link
            href="/notes"
            onClick={() => setMenuOpen(false)}
            className="text-pink-500 hover:text-pink-700 font-medium"
          >
            Journal
          </Link>
          <Link
            href="/chat"
            onClick={() => setMenuOpen(false)}
            className="text-pink-500 hover:text-pink-700 font-medium"
          >
            Chat
          </Link>
          {user ? (
            <>
              <span className="text-gray-600 font-medium">{user.email}</span>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-pink-500 hover:bg-pink-700 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="text-pink-500 hover:text-pink-700 font-medium"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
