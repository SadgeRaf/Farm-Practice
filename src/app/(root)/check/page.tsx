import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Link
        href="/"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
      >
        Login in first!
      </Link>
    </div>
  );
};

export default Page;
