"use client";

import Link from 'next/link';
import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <header className="px-5 py-3 bg-white/50 shadow-sm sticky top-0 z-50">
      <nav className="flex flex-col md:flex-row justify-between items-center md:items-stretch gap-3 md:gap-0">
        
        {/* Logo */}
        <Link
          href="/"
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition font-bold"
        >
          <h1>Khan Agro</h1>
        </Link>

        {/* Menu */}
        <ul className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
          <li>
            <Link 
              href="/products" 
              className="text-gray-700 hover:text-green-600 transition"
            >
              Products
            </Link>
          </li>
          <li>
            <Link 
              href="/manage" 
              className="text-gray-700 hover:text-green-600 transition"
            >
              Manage Cart
            </Link>
          </li>
          <li>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-green-600 transition"
            >
              About Us
            </Link>
          </li>
        </ul>

        {/* Auth Buttons */}
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5">
          {status === "authenticated" ? (
            <>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-medium">
                  {session?.user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-700 font-medium">
                  {session?.user?.name}
                </span>
              </div>
            </>
          ) : status === "loading" ? (
            <div className="px-6 py-2 text-gray-500">Loading...</div>
          ) : (
            <button
              onClick={() => signIn()}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;