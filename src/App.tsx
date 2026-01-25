import React from 'react';
import logo from './assets/logo.png';
import paperBg from './assets/paper-container-bg.png';
import paperBtnBg from './assets/paper-button-bg.png';
import userAvatar from './assets/user-avatar.png';
import { Play, Rocket, Menu } from 'lucide-react';

function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans text-brand-dark bg-transparent">
      
      {/* HEADER */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6">
        <img src={logo} alt="IdeaDex Logo" className="h-16 w-auto object-contain" />
        
        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 font-bold tracking-wide">
          {['HOME', 'SERVICES', 'BEACONS', 'ABOUT'].map((item) => (
            <a key={item} href="#" className="hover:text-brand-purple transition-colors">{item}</a>
          ))}
        </div>
        <Menu className="md:hidden w-8 h-8" />
      </nav>

      {/* MAIN STAGE */}
      <main className="relative z-10 flex items-center justify-center min-h-[80vh] px-4 w-full">
        
        {/* CENTER: The Pink Paper Container */}
        <div className="relative w-full max-w-5xl aspect-[4/3] md:aspect-[16/9]">
            
            {/* 1. BACKGROUND LAYER: The Paper Image */}
            <img 
              src={paperBg} 
              alt="Paper Background" 
              className="absolute inset-0 w-full h-full object-fill z-0 drop-shadow-2xl" 
            />
            
            {/* 2. TITLE: IdeaDex Virtual Services at top-left */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 z-30">
              <h2 className="text-brand-dark font-bold text-base md:text-lg tracking-wider">
                IdeaDex Virtual Services
              </h2>
            </div>
            
            {/* 3. CONTENT LAYER: Sits ON TOP (z-10) of the paper */}
            <div className="absolute inset-0 z-10 w-full h-full flex flex-col md:flex-row p-12 md:p-20">
                
                {/* Left Side: TEXT */}
                <div className="flex-1 text-left space-y-4 pt-4">
                     <div className="inline-block bg-brand-dark text-white px-3 py-1 text-xs md:text-sm font-bold uppercase tracking-wider">
                        Virtual Agency
                     </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-brand-dark">
                        IdeaDex<br/>
                        Virtual<br/>
                        Services.
                    </h1>
                    <p className="text-sm md:text-lg font-medium opacity-90 max-w-md leading-relaxed mt-4">
                        Your Ideas. Our Execution.<br/>
                        The Digital Dex.
                    </p>
                </div>

                {/* Right Side: PHONE (Aligned to bottom right) */}
                <div className="flex-1 flex items-end justify-end">
                    {/* Phone Container */}
                    <div className="relative w-24 h-48 md:w-32 md:h-64 max-h-[250px] bg-black rounded-[2rem] border-[4px] border-gray-800 shadow-xl overflow-hidden">
                        <img src={userAvatar} alt="User" className="w-full h-full object-cover" />
                    </div>
                </div>

            </div>
        </div>

        {/* RIGHT SIDEBAR: Floating Buttons */}
        <div className="fixed right-6 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
            {/* Start Here */}
            <button className="relative w-48 h-24 hover:scale-105 transition-transform flex items-center justify-center">
                <img src={paperBtnBg} className="absolute inset-0 w-full h-full object-contain" />
                <div className="relative z-10 flex items-center gap-2 pr-2 pb-1">
                    <span className="text-lg font-black uppercase">Start Here</span>
                    <Play className="w-4 h-4 fill-current" />
                </div>
            </button>

            {/* Fast Execution */}
            <button className="relative w-48 h-24 hover:scale-105 transition-transform flex items-center justify-center">
                <img src={paperBtnBg} className="absolute inset-0 w-full h-full object-contain" />
                <div className="relative z-10 flex items-center gap-2 pr-2 pb-1">
                    <span className="text-lg font-black uppercase text-right leading-none">Fast<br/>Execution</span>
                    <Rocket className="w-4 h-4" />
                </div>
            </button>
        </div>

      </main>
    </div>
  );
}

export default App;
