"use client";

import localFont from 'next/font/local';
import { useState } from 'react';
import { redeemGift } from './actions';

// --- CONFIGURATION ---
const SECRET_PASSCODE = "INEEDAMEDIC"; // <--- Updated Password
// ---------------------

const headlineFont = localFont({ 
  src: './fonts/BF_HEADLINE.ttf',
  variable: '--font-bf-head'
});

const subFont = localFont({ 
  src: './fonts/BF_SUB_HEADLINE.ttf',
  variable: '--font-bf-sub'
});

export default function Home() {
  const [stage, setStage] = useState(0);
  const [errorShake, setErrorShake] = useState(false);

  const handleSecurityCheck = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const code = formData.get('passcode') as string;

    // Normalize: Uppercase + Remove ALL spaces
    // This allows him to type "I NEED A MEDIC" or "INEEDAMEDIC"
    const normalizedCode = code.toUpperCase().replace(/\s/g, '');

    if (normalizedCode === SECRET_PASSCODE) {
      setStage(2); 
    } else {
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500);
    }
  };

  async function clientAction(formData: FormData) {
    await redeemGift(formData);
    setStage(3);
  }

  return (
    <main className={`relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden bg-black ${headlineFont.variable} ${subFont.variable}`}>
      
      {/* Video Background */}
      <video
        autoPlay loop muted playsInline
        onCanPlay={() => setStage(prev => prev === 0 ? 1 : prev)}
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-10 bg-black/40" />

      {/* Content */}
      <div className="relative z-20 max-w-2xl w-full text-center space-y-8">
        
        {/* STAGE 0: LOADING */}
        {stage === 0 && (
           <div className="text-center space-y-4 animate-pulse">
             <div className="w-16 h-16 border-4 border-[#eb4e27]/30 border-t-[#eb4e27] rounded-full animate-spin mx-auto mb-6"></div>
             <h2 className="text-3xl text-white tracking-widest uppercase font-[family-name:var(--font-bf-head)]">
               INITIALIZING...
             </h2>
           </div>
        )}

        {/* STAGE 1: SECURITY CHECK */}
        {stage === 1 && (
          <div className="animate-in fade-in zoom-in duration-500">
             <h1 className="text-5xl md:text-7xl text-[#eb4e27] uppercase drop-shadow-lg font-[family-name:var(--font-bf-head)] mb-2">
               ACCESS DENIED
             </h1>
             <p className="text-white text-xl mb-8 font-[family-name:var(--font-bf-sub)] tracking-widest">
               SECURITY CLEARANCE REQUIRED
             </p>

             <div className="bg-black/80 border-2 border-[#eb4e27] p-8 rounded-sm backdrop-blur-sm">
                <p className="text-gray-400 mb-6 font-[family-name:var(--font-bf-sub)] uppercase">
                  SOLVE THE CROSSWORD TO DECRYPT THE PASSPHRASE
                </p>

                <form onSubmit={handleSecurityCheck} className="flex flex-col gap-5">
                  <input 
                    type="text" 
                    name="passcode"
                    autoComplete="off"
                    placeholder="ENTER PASSPHRASE" 
                    className={`bg-black/50 border border-gray-600 text-white text-xl p-4 text-center placeholder:text-gray-600 focus:outline-none focus:border-[#eb4e27] focus:ring-1 focus:ring-[#eb4e27] uppercase tracking-[0.2em] font-[family-name:var(--font-bf-sub)] transition-all ${errorShake ? 'border-red-600 animate-shake' : ''}`}
                  />
                  <button 
                    type="submit"
                    className="bg-gray-800 hover:bg-gray-700 text-white text-xl py-3 px-8 uppercase tracking-widest transition-all font-[family-name:var(--font-bf-head)] border border-gray-600"
                  >
                    AUTHENTICATE
                  </button>
                </form>
             </div>
          </div>
        )}

        {/* STAGE 2: STEAM FORM */}
        {stage === 2 && (
           <div className="animate-in slide-in-from-bottom-10 fade-in duration-700">
             <h1 className="text-5xl md:text-7xl text-white uppercase drop-shadow-lg font-[family-name:var(--font-bf-head)] text-green-500">
               ACCESS GRANTED
             </h1>
             
             <div className="bg-black/80 border-2 border-green-500 p-8 rounded-sm shadow-[0_0_30px_rgba(34,197,94,0.2)] backdrop-blur-sm mt-8">
               <p className="text-2xl text-white mb-8 uppercase tracking-wide font-[family-name:var(--font-bf-sub)]">
                 Welcome, Commander. <br/> Enter Steam ID for supply drop.
               </p>

               <form action={clientAction} className="flex flex-col gap-5">
                 <input 
                   type="text" 
                   name="username" 
                   required
                   placeholder="STEAM USERNAME" 
                   className="bg-black/50 border border-green-800 text-green-400 text-xl p-4 text-center placeholder:text-green-900/50 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 uppercase tracking-wider font-[family-name:var(--font-bf-sub)]"
                 />
                 
                 <button 
                   type="submit"
                   className="bg-green-700 hover:bg-green-600 text-white text-2xl py-4 px-8 uppercase tracking-widest transition-all hover:scale-[1.02] shadow-lg font-[family-name:var(--font-bf-head)] skew-x-[-10deg]"
                 >
                   <span className="block skew-x-[10deg]">Redeem Gift</span>
                 </button>
               </form>
             </div>
           </div>
        )}

        {/* STAGE 3: SUCCESS */}
        {stage === 3 && (
           <div className="animate-pulse">
              <h1 className="text-5xl md:text-7xl text-[#eb4e27] uppercase drop-shadow-lg font-[family-name:var(--font-bf-head)]">
                MISSION ACCOMPLISHED
              </h1>
              <p className="text-2xl text-white mt-8 uppercase font-[family-name:var(--font-bf-sub)]">
                Stand by for deployment.
              </p>
           </div>
        )}

      </div>
      
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </main>
  );
}