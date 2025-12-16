"use client";

import localFont from 'next/font/local';
import { useState } from 'react';
import { redeemGift } from './actions'; // Import the action

const headlineFont = localFont({ 
  src: './fonts/BF_HEADLINE.ttf',
  variable: '--font-bf-head'
});

const subFont = localFont({ 
  src: './fonts/BF_SUB_HEADLINE.ttf',
  variable: '--font-bf-sub'
});

export default function Home() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // New state for success message

  // We wrap the server action to handle the state update on the client
  async function clientAction(formData: FormData) {
    await redeemGift(formData);
    setIsSubmitted(true);
  }

  return (
    <main className={`relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden bg-black ${headlineFont.variable} ${subFont.variable}`}>
      
      {/* ... (Loading Screen and Video code stays the same) ... */}
      <div 
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="text-center space-y-4 animate-pulse">
          <div className="w-16 h-16 border-4 border-[#eb4e27]/30 border-t-[#eb4e27] rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-3xl md:text-5xl text-white tracking-widest uppercase font-[family-name:var(--font-bf-head)]">
            Loading...
          </h2>
        </div>
      </div>

      <video
        autoPlay loop muted playsInline
        onCanPlay={() => setIsVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* --- MAIN CONTENT --- */}
      <div className={`relative z-20 max-w-2xl w-full text-center space-y-8 transition-all duration-1000 delay-500 ${
         isVideoLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        
        <h1 className="text-6xl md:text-8xl text-white uppercase drop-shadow-lg font-[family-name:var(--font-bf-head)]">
          {isSubmitted ? 'MISSION ACCOMPLISHED' : 'ARE YOU READY?'}
        </h1>

        <div className="bg-black/80 border-2 border-[#eb4e27] p-8 rounded-sm shadow-2xl backdrop-blur-sm relative overflow-hidden">
          
          {isSubmitted ? (
             // SUCCESS STATE
             <div className="animate-pulse">
                <p className="text-2xl text-[#eb4e27] uppercase font-[family-name:var(--font-bf-head)] mb-4">
                  Request Received
                </p>
                <p className="text-white font-[family-name:var(--font-bf-sub)] text-lg">
                  Stand by for gift deployment via Steam.
                </p>
             </div>
          ) : (
            // FORM STATE
            <>
              <p className="text-xl md:text-2xl text-white mb-8 uppercase tracking-wide font-[family-name:var(--font-bf-sub)]">
                Please enter your steam username <br/> to redeem your gift
              </p>

              <form action={clientAction} className="flex flex-col gap-5">
                <input 
                  type="text" 
                  name="username" // REQUIRED: This connects to the Server Action
                  required
                  placeholder="STEAM USERNAME" 
                  className="bg-black/50 border border-gray-600 text-white text-xl p-4 text-center placeholder:text-gray-500 focus:outline-none focus:border-[#eb4e27] focus:ring-1 focus:ring-[#eb4e27] uppercase tracking-wider font-[family-name:var(--font-bf-sub)] transition-colors"
                />
                
                <button 
                  type="submit"
                  className="bg-[#eb4e27] hover:bg-[#c93d1b] text-white text-2xl py-4 px-8 uppercase tracking-widest transition-all hover:scale-[1.02] shadow-lg font-[family-name:var(--font-bf-head)] skew-x-[-10deg]"
                >
                  <span className="block skew-x-[10deg]">Redeem Now</span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}