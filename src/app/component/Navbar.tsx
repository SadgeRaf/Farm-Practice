import Link from 'next/link'
import React from 'react'
import { auth, signIn, signOut } from '../auth'

const Navbar = async () => {
  
  const session = await auth();
  
    return (
    <header className='px-5 py-3 bg-green-500/50 shadow-sm sticky top-0 z-50'>
        <nav className='flex justify-between items-center'>
            <Link href='/'>
               <h1>Khan Agro</h1>
            </Link>

            <div>
              <ul className='flex items-center gap-6'>
                <li><Link href='/products'>Products</Link></li>
                <li><Link href='/manage'>Manage Cart</Link></li>
                <li><Link href='/about'>About Us</Link></li>
                <li><Link href='/extra'>IDK</Link></li>
              </ul>
            </div>

            <div className='flex items-center gap-5'>
               {session && session?.user ? (
                <>
                 <Link href='/startup/create'>
                  <span>Create</span>
                 </Link>

                 <form action={async () => {
                    "use server";
                    
                    await signOut({redirectTo:'/'});
                    }}>
                     <button type='submit'>
                       Logout
                     </button>
                 </form>

                 <Link href={`/user/${session?.id}`}>
                  <span>{session?.user?.name}</span>
                 </Link>
                </>
               ) : (
                <form action={async() => {
                    "use server"

                    await signIn('github', {redirectTo:"/"})
                }}>
                    <button type='submit'>
                       Login
                    </button>
                </form>
               )} 
            </div>
        </nav>
    </header>
  )
}

export default Navbar