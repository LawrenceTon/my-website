import React, { useEffect, useState } from 'react';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import paperBtnBg from '../../assets/paper-button-bg.png';

const BountifulJourneyPlaceholder: React.FC = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation on mount
    setShowContent(true);
  }, []);

  return (
    <div className={`relative min-h-screen w-full bg-gradient-to-br from-[#2d1218] via-[#3d1620] to-[#4d1828] pt-40 pb-20 px-6 transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
      {/* Sanctuary Ambient Layers */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Soft glowing aura centers - warming the sanctuary */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#800060]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-[#eeb0b0]/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#800060]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back Button */}
        <button
          onClick={() => window.location.href = '/'}
          className="flex items-center gap-2 text-[#eeb0b0] hover:text-[#ffc0c0] font-bold mb-8 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Home
        </button>

        {/* Title Section with Torn Paper */}
        <div className="relative w-full max-w-3xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <img src={paperBtnBg} className="w-full h-auto object-contain drop-shadow-2xl" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <h1 className="text-5xl font-black text-[#2d0a1c] text-center drop-shadow-sm">
              🏛️ Bountiful Journey
            </h1>
            <p className="text-xl font-bold text-[#800060] text-center mt-2">
              Your path to becoming part of our creative collective
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left: What's Ready */}
          <div 
            className="relative animate-fade-in hover:shadow-2xl transition-all duration-300" 
            style={{ animationDelay: '0.2s' }}
          >
            {/* Sanctuary glow behind card */}
            <div className="absolute inset-0 bg-[#800060]/10 rounded-2xl blur-xl -m-2"></div>
            
            <img src={paperBtnBg} className="absolute inset-0 w-full h-full object-contain relative z-10" />
            <div className="relative z-20 p-8">
              <h3 className="text-2xl font-black text-[#2d0a1c] mb-6 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" /> ✓ What's Ready
              </h3>
              <ul className="space-y-3 text-lg font-bold text-[#2d0a1c]">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 text-xl">✓</span>
                  <span>7-stage funnel architecture</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 text-xl">✓</span>
                  <span>Email verification system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 text-xl">✓</span>
                  <span>Calendly integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 text-xl">✓</span>
                  <span>localStorage persistence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 text-xl">✓</span>
                  <span>Database schema ready</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Setup Required */}
          <div 
            className="relative animate-fade-in hover:shadow-2xl transition-all duration-300" 
            style={{ animationDelay: '0.3s' }}
          >
            {/* Sanctuary glow behind card */}
            <div className="absolute inset-0 bg-[#eeb0b0]/10 rounded-2xl blur-xl -m-2"></div>
            
            <img src={paperBtnBg} className="absolute inset-0 w-full h-full object-contain relative z-10" />
            <div className="relative z-20 p-8">
              <h3 className="text-2xl font-black text-[#800060] mb-6">⚙️ Setup Required</h3>
              <ol className="space-y-3 text-lg font-bold text-[#2d0a1c]">
                <li className="flex items-start gap-3">
                  <span className="bg-[#800060] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm">1</span>
                  <span>Create Supabase project</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-[#800060] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm">2</span>
                  <span>Run database schema</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-[#800060] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm">3</span>
                  <span>Get API credentials</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-[#800060] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm">4</span>
                  <span>Add to Vercel env vars</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-[#800060] text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-sm">5</span>
                  <span>Redeploy</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Instructions Section with Torn Paper */}
        <div 
          className="relative w-full mb-12 animate-fade-in hover:shadow-2xl transition-all duration-300" 
          style={{ animationDelay: '0.4s' }}
        >
          {/* Sanctuary glow */}
          <div className="absolute inset-0 bg-[#800060]/10 rounded-2xl blur-xl -m-2"></div>
          
          <img src={paperBtnBg} className="w-full h-auto object-contain relative z-10 drop-shadow-xl" />
          <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12 z-20">
            <h3 className="text-2xl font-black text-[#2d0a1c] mb-4">📖 How to Activate</h3>
            <p className="text-[#2d0a1c] font-bold mb-4 text-lg">
              Follow <span className="text-[#800060]">BOUNTIFUL_SETUP.md</span> in your repository to:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-[#2d0a1c] font-bold">
              <li>Create a Supabase project</li>
              <li>Set up PostgreSQL database</li>
              <li>Configure email & magic links</li>
              <li>Connect Calendly for scheduling</li>
              <li>Deploy with environment variables</li>
            </ol>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href="https://supabase.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-full sm:w-96 h-40 group hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center justify-center cursor-pointer filter drop-shadow-xl animate-fade-in"
            style={{ animationDelay: '0.5s' }}
          >
            {/* Sanctuary glow on hover */}
            <div className="absolute inset-0 bg-[#800060]/15 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <img src={paperBtnBg} className="absolute inset-0 w-full h-full object-contain relative z-10" />
            <div className="relative z-20 flex items-center justify-center gap-3">
              <span className="text-2xl font-black uppercase text-[#2d0a1c] tracking-wider">Start Setup →</span>
            </div>
          </a>

          <button
            onClick={() => window.location.href = '/'}
            className="relative w-full sm:w-96 h-40 group hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center justify-center cursor-pointer filter drop-shadow-xl animate-fade-in"
            style={{ animationDelay: '0.6s' }}
          >
            {/* Sanctuary glow on hover */}
            <div className="absolute inset-0 bg-[#eeb0b0]/15 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <img src={paperBtnBg} className="absolute inset-0 w-full h-full object-contain relative z-10" />
            <div className="relative z-20 flex items-center justify-center gap-3">
              <span className="text-2xl font-black uppercase text-[#2d0a1c] tracking-wider">Go Home ←</span>
            </div>
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <p className="text-[#eeb0b0] font-bold text-lg">
            💡 The full 7-stage interactive journey is built and ready. Complete the Supabase setup to activate it!
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default BountifulJourneyPlaceholder;
