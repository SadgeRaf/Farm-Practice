"use client";

import Link from "next/link";
import { signIn, signOut } from "../auth";
import { useState } from "react";

const MobileMenuButton = ({ session }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-green-600/60 backdrop-blur-lg p-5 md:hidden flex flex-col gap-4 text-lg shadow-lg">
          <Link href="/products" onClick={() => setOpen(false)}>Products</Link>
          <Link href="/manage" onClick={() => setOpen(false)}>Manage Cart</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About Us</Link>
          <Link href="/extra" onClick={() => setOpen(false)}>IDK</Link>

          <div className="border-t border-white/20 pt-4">
            {session?.user ? (
              <>
                <Link href="/startup/create" onClick={() => setOpen(false)}>Create</Link>

                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <button type="submit" className="mt-3">Logout</button>
                </form>

                <Link
                  href={`/user/${session?.id}`}
                  onClick={() => setOpen(false)}
                  className="mt-2 block"
                >
                  {session?.user?.name}
                </Link>
              </>
            ) : (
              <form
                action={async () => {
                  "use server";
                  await signIn("github", { redirectTo: "/" });
                }}
              >
                <button type="submit">Login</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenuButton;
