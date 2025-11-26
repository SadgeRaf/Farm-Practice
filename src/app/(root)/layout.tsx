import React from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'

const layout = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <main>
        <Navbar></Navbar>
        
        {children}

        <Footer></Footer>
    </main>
  )
}

export default layout