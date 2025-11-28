
import Link from 'next/link';
import React from 'react';
import { auth, signIn, signOut } from '../auth';

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-green-500/50 shadow-sm sticky top-0 z-50">
      <nav className="flex flex-col md:flex-row justify-between items-center md:items-stretch gap-3 md:gap-0">
        
        {/* Logo */}
        <Link
          href="/"
          className="bg-green-500 text-green-700 px-6 py-3 rounded-lg hover:bg-green-600 transition"
        >
          <h1>Khan Agro</h1>
        </Link>

        {/* Menu */}
        <ul className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/manage">Manage Cart</Link></li>
          <li><Link href="/about">About Us</Link></li>
          <li><Link href="/extra">IDK</Link></li>
        </ul>

        {/* Auth Buttons */}
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5">
          {session?.user ? (
            <>
              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}
              >
                <button
                  type="submit"
                  className="bg-green-500 text-green-700 px-6 py-3 rounded-lg hover:bg-green-600 transition"
                >
                  Logout
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                'use server';
                await signIn('github', { redirectTo: '/' });
              }}
            >
              <button
                type="submit"
                className="bg-green-500 text-green-700 px-6 py-3 rounded-lg hover:bg-green-600 transition"
              >
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
