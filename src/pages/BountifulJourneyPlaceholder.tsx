import React from 'react';

const BountifulJourneyPlaceholder: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#fef5f1] via-[#fde9e0] to-[#f5d9cc] pt-40 pb-20 px-6">
      <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-center">
        <h1 className="text-4xl font-black text-[#2d0a1c] mb-4">🏛️ Bountiful Journey</h1>
        <p className="text-lg text-[#2d0a1c]/70 mb-8">
          Welcome to the IdeaDex Bountiful Journey - Your path to becoming part of our creative collective.
        </p>
        
        <div className="bg-[#eeb0b0]/20 border-2 border-[#eeb0b0] rounded-lg p-8 mb-8 text-left">
          <h2 className="text-2xl font-bold text-[#800060] mb-4">⚙️ Setup Required</h2>
          <p className="text-[#2d0a1c] mb-4">
            To activate the 7-stage journey, please complete the Supabase setup:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-[#2d0a1c]/80">
            <li>Create a Supabase project at <a href="https://supabase.com" className="text-[#800060] font-bold hover:underline" target="_blank" rel="noopener noreferrer">supabase.com</a></li>
            <li>Run the database schema from BOUNTIFUL_SETUP.md</li>
            <li>Get your Supabase credentials (Project URL & API Key)</li>
            <li>Add to Vercel environment variables</li>
            <li>Deploy to activate the journey</li>
          </ol>
        </div>

        <div className="bg-green-100 border-2 border-green-500 rounded-lg p-6 text-left mb-8">
          <p className="text-green-800 font-bold mb-2">✓ What's ready:</p>
          <ul className="list-disc list-inside text-green-700 space-y-1">
            <li>7-stage funnel architecture</li>
            <li>Email verification with magic links</li>
            <li>Calendly integration (elkilla1989@gmail.com)</li>
            <li>localStorage persistence</li>
            <li>Supabase database schema</li>
          </ul>
        </div>

        <button
          onClick={() => window.location.href = '/'}
          className="bg-[#800060] hover:bg-[#600040] text-white font-black py-3 px-8 rounded-lg"
        >
          Return to Homepage
        </button>
      </div>
    </div>
  );
};

export default BountifulJourneyPlaceholder;
