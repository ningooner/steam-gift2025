import { Black_Ops_One } from 'next/font/google';

// 1. Load the Military Font
const militaryFont = Black_Ops_One({ 
  weight: '400', 
  subsets: ['latin'] 
});

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      
      {/* 2. Background Image */}
      {/* We use a div here to handle the background image with styling */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.png')" }}
      />
      
      {/* 3. Dark Overlay */}
      {/* This makes sure the text is readable regardless of the image colors */}
      <div className="absolute inset-0 z-10 bg-black/60" />

      {/* 4. Content Container */}
      <div className={`relative z-20 max-w-2xl w-full text-center space-y-8 ${militaryFont.className}`}>
        
        <h1 className="text-5xl md:text-7xl text-green-500 uppercase tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          Mission: Gift
        </h1>

        <div className="bg-gray-900/80 border-2 border-green-600 p-8 rounded-lg shadow-2xl backdrop-blur-sm">
          <p className="text-3xl text-white mb-2 tracking-wide">
            Hello Felipe!
          </p>
          <p className="text-xl text-gray-300 mb-8 uppercase">
            Please enter your steam account name below to redeem your gift!
          </p>

          <form className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="STEAM USERNAME..." 
              className="bg-black border border-green-700 text-green-400 text-xl p-4 text-center placeholder:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 uppercase tracking-wider"
            />
            
            <button 
              type="submit"
              className="bg-green-700 hover:bg-green-600 text-white text-xl py-4 px-8 uppercase tracking-widest transition-all hover:scale-105 shadow-lg border-b-4 border-green-900 active:border-b-0 active:translate-y-1"
            >
              Redeem Now
            </button>
          </form>
        </div>
      </div>

    </main>
  );
}