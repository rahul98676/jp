
"use client"

import DotGrid from '../components/DotGrid';
import {
    ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  // useAuth,
} from '@clerk/nextjs'



import Link from 'next/link';




export default function Home() {
 
  return (
      <ClerkProvider>
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      {/* DotGrid as background/animation layer */}
      <DotGrid
        dotSize={5}
        gap={15}
        baseColor="#393055"
        activeColor="#5227FF"
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
        style={{ width: '100%', height: '100%' }}
        />

      {/* Transparent Navbar */}
      <nav className="absolute top-[30%] bg-white/10 left-1/2 transform -translate-x-1/2 w-[60%] flex justify-between items-center px-8 py-4 border border-white/20 rounded-full z-10">
        {/* Logo */}
        <div className="text-2xl font-bold text-[#5227FF] tracking-wider">
          印度,
        </div>

        {/* Navigation Links */}
        <div className="flex gap-8">
          <div
            
            className="bg-white/10 text-white no-underline text-base font-medium px-4 py-2 rounded-lg  hover:bg-white/20 hover:text-[#5227FF] transition-all duration-200"
            >
             
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button >   
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
    {/* </ClerkProvider> */}
          </div>
          <a
            href="#docs"
            className="bg-white/10 text-white no-underline text-base font-medium px-4 py-2 rounded-lg  hover:bg-white/20 hover:text-[#5227FF] transition-all duration-200"
            >
            Docs
          </a>
        </div>
      </nav>

      {/* Content overlayed on top */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          zIndex: 1,
          textAlign: 'center',
        }}
        >
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', marginTop:'26vh'}}>Welcome</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
         sign in or sign up and start learning japanese good luck
        </p>


        <div className="flex justify-center gap-8 mt-10">
          <button className="bg-[#5227FF] text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:bg-[#3a1bb3] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5227FF]/50" >
            
          
            <Link href="/about" className="no-underline text-white">start</Link>
            

          </button>
          <button
            className="bg-white/10 text-white px-8 py-3 rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 hover:text-[#5227FF] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#5227FF]/30"
            >
            Docs
          </button>
        






{/* <link rel="stylesheet" href="about" /> */}




          
        </div>
      </div>
    </div>
          </ClerkProvider>
  );
}

