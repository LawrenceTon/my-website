import React from 'react';
import { Pin, Rocket, Menu } from 'lucide-react';
import logo from './assets/logo.png';
import paperBg from './assets/paper-container-bg.png';
import paperBtnBg from './assets/paper-button-bg.png';
import userAvatar from './assets/user-avatar.png';

function App() {
  return (
    <div className="relative min-h-screen w-full font-sans text-[#2d0a1c] overflow-x-hidden">
      
      {/* Background Layer */}
      <div className="map-anim-layer"></div>

      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-[#eeb0b0]/95 backdrop-blur-sm shadow-md transition-all">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex justify-between items-center">
          
          <div className="flex items-center gap-4">
            {/* LOGO MADE BIGGER (h-24) */}
            <img src={logo} alt="IdeaDex Logo" className="h-24 w-auto object-contain drop-shadow-md" />
            <div className="font-extrabold text-4xl tracking-tight text-[#2d0a1c]">IdeaDex</div>
          </div>

          <ul className="hidden md:flex space-x-10 font-bold text-xl tracking-wide items-center">
            {['HOME', 'ABOUT', 'PRODUCT', 'GALLERY', 'CONTACT'].map(item => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="hover:text-[#800060] hover:scale-110 transition-all inline-block cursor-pointer">
                  {item}
                </a>
              </li>
            ))}
          </ul>
          
          <Menu className="md:hidden w-10 h-10" />
        </div>
      </nav>

      {/* Main Stage */}
      {/* Side-by-side enabled on Large screens (lg:flex-row) */}
      <main className="flex flex-col lg:flex-row items-center justify-center min-h-screen pt-36 pb-16 px-6 gap-12">
        
        {/* CENTER: Main Torn Paper Content */}
        {/* flex-1 allows this to shrink slightly on smaller laptops so buttons don't wrap */}
        <div className="relative flex-1 max-w-5xl min-w-0 float-anim">
            <img 
              src={paperBg} 
              alt="Background" 
              className="absolute inset-0 w-full h-full object-fill drop-shadow-2xl z-0 scale-[1.03]" 
            />
            
            <div className="relative z-10 p-8 md:py-20 md:px-16 flex flex-col md:flex-row items-center">
                
                {/* Phone Avatar - REDUCED TO HALF SIZE */}
                {/* Now w-24 (96px) instead of w-44 */}
                <div className="flex-shrink-0 mb-6 md:mb-0 relative z-20">
                    <div className="w-24 h-40 md:w-28 md:h-48 bg-black rounded-[1.5rem] border-[3px] border-gray-800 shadow-xl overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                        <img src={userAvatar} alt="User Avatar" className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="flex-1 text-center md:text-left md:pl-10 relative z-10">
                    <h1 className="text-6xl md:text-7xl font-black mb-4 leading-none text-[#2d0a1c] tracking-tight drop-shadow-sm">
                        IdeaDex
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 opacity-90 text-[#800060]">
                        Virtual Services / Business Model
                    </h2>
                    
                    <div className="border-l-[6px] border-[#d98e3a] pl-6 text-left bg-[#fff0f0]/40 p-6 rounded-r-2xl backdrop-blur-sm shadow-inner">
                      <p className="text-base md:text-lg leading-relaxed font-bold text-[#2d0a1c]/90">
                        "At IdeaDex, we believe ideas should never be trapped in the minds of their creators. 
                        Our platform ensures that every innovative thought finds its way to the world while keeping 
                        the creator's ownership intact."
                      </p>
                    </div>
                </div>

            </div>
        </div>

        {/* RIGHT: Buttons Stack */}
        {/* flex-shrink-0 keeps them BIG even if screen is tight */}
        <div className="flex flex-col gap-10 z-20 mt-8 lg:mt-0 items-center flex-shrink-0">
            
            {/* Button 1: Start Here */}
            {/* BIGGER BUTTON (w-96) with SMALLER TEXT (text-xl) */}
            <button className="relative w-96 h-40 float-anim-delayed group hover:scale-105 transition-transform flex items-center justify-center cursor-pointer filter drop-shadow-xl">
                <img src={paperBtnBg} className="absolute inset-0 w-full h-full object-contain" />
                <div className="relative z-10 flex items-center justify-center gap-3 pr-4 pb-2 w-full">
                    <span className="text-xl font-black uppercase text-[#2d0a1c] tracking-wider">Start Here</span>
                    <Pin className="w-6 h-6 fill-[#800060] text-[#800060]" />
                </div>
            </button>

            {/* Button 2: Fast Execution */}
            {/* BIGGER BUTTON (w-96) */}
            <button className="relative w-96 h-40 float-anim group hover:scale-105 transition-transform flex items-center justify-center cursor-pointer filter drop-shadow-xl">
                <img src={paperBtnBg} className="absolute inset-0 w-full h-full object-contain" />
                <div className="relative z-10 flex items-center gap-4 pr-6 pb-4 ml-8">
                    <Rocket className="w-6 h-6 text-[#800060] flex-shrink-0" />
                    <span className="text-xl font-black uppercase text-left leading-none text-[#2d0a1c] tracking-wider">
                        Fast<br/>Execution
                    </span>
                </div>
            </button>

        </div>

      </main>
    </div>
  );
}

export default App;