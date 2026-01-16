"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { isSimplyAuthenticated, simpleLogout } from '../cookie-auth';

const Navbar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [simpleAuth, setSimpleAuth] = useState(false);

  useEffect(() => {
    // Check simple auth on mount
    setSimpleAuth(isSimplyAuthenticated());
    
    // Set up interval to check for auth changes
    const intervalId = setInterval(() => {
      const currentAuth = isSimplyAuthenticated();
      if (currentAuth !== simpleAuth) {
        setSimpleAuth(currentAuth);
      }
    }, 1000); // Check every second
    
    return () => clearInterval(intervalId);
  }, [simpleAuth]); // Add simpleAuth to dependencies

  // Also check when the route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setSimpleAuth(isSimplyAuthenticated());
    };
    
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const handleSimpleLogout = () => {
    simpleLogout();
    setSimpleAuth(false);
    router.push('/');
    router.refresh();
  };

  const handleGitHubLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  const isLoggedIn = simpleAuth || status === 'authenticated';

  return (
    <header className="px-5 py-3 bg-white/50 shadow-sm sticky top-0 z-50">
      <nav className="flex flex-col md:flex-row justify-between items-center md:items-stretch gap-3 md:gap-0">
        
        <Link
          href="/"
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition font-bold"
        >
          <h1>Khan Agro</h1>
        </Link>

        <ul className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/manage">Manage Cart</Link></li>
          <li><Link href="/about">About Us</Link></li>
        </ul>

        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5">
          {isLoggedIn ? (
            <>
              {simpleAuth ? (
                <button
                  onClick={handleSimpleLogout}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Logout Admin
                </button>
              ) : (
                <button
                  onClick={handleGitHubLogout}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Logout GitHub
                </button>
              )}

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-medium">
                  {simpleAuth ? 'A' : session?.user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-700 font-medium">
                  {simpleAuth ? 'Admin' : session?.user?.name}
                </span>
              </div>
            </>
          ) : status === 'loading' ? (
            <div className="px-6 py-2 text-gray-500">Loading...</div>
          ) : (
            <Link
              href="/check"
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;