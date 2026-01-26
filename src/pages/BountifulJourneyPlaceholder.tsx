import React from 'react';
import { ChevronLeft, CheckCircle } from 'lucide-react';

const BountifulJourneyPlaceholder: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#fef5f1] via-[#fde9e0] to-[#f5d9cc] pt-40 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header with back button */}
        <div className="mb-8">
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 text-[#800060] hover:text-[#600040] font-bold mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Home
          </button>
        </div>

        <div className="bg-white/90 backdrop-blur-sm p-12 rounded-2xl shadow-xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black text-[#2d0a1c] mb-4">🏛️ Bountiful Journey</h1>
            <p className="text-lg text-[#2d0a1c]/70">
              Welcome to the IdeaDex Bountiful Journey - Your path to becoming part of our creative collective.
            </p>
          </div>

          {/* Setup Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* What's Ready */}
            <div className="bg-green-100 border-2 border-green-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6" /> What's Ready
              </h3>
              <ul className="space-y-2 text-green-700">
                <li>✓ 7-stage funnel architecture</li>
                <li>✓ Email verification system</li>
                <li>✓ Calendly integration</li>
                <li>✓ localStorage persistence</li>
                <li>✓ Database schema created</li>
              </ul>
            </div>

            {/* Setup Required */}
            <div className="bg-[#eeb0b0]/20 border-2 border-[#eeb0b0] rounded-lg p-6">
              <h3 className="text-xl font-bold text-[#800060] mb-4">⚙️ Setup Required</h3>
              <ol className="space-y-2 text-[#2d0a1c]/80 text-sm">
                <li><strong>1.</strong> Create Supabase project</li>
                <li><strong>2.</strong> Run database schema</li>
                <li><strong>3.</strong> Get API credentials</li>
                <li><strong>4.</strong> Add to Vercel env vars</li>
                <li><strong>5.</strong> Redeploy</li>
              </ol>
            </div>
          </div>

          {/* Detailed Instructions */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-8">
            <h3 className="text-lg font-bold text-blue-900 mb-3">📖 How to Activate the Journey</h3>
            <p className="text-blue-800 mb-4">
              Follow the detailed setup guide in <code className="bg-blue-100 px-2 py-1 rounded">BOUNTIFUL_SETUP.md</code> in your GitHub repository to:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-blue-800 ml-2">
              <li>Create a Supabase project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">supabase.com</a></li>
              <li>Set up your PostgreSQL database with our schema</li>
              <li>Configure email verification and magic links</li>
              <li>Connect Calendly for scheduling</li>
              <li>Deploy with environment variables set</li>
            </ol>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://supabase.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#800060] hover:bg-[#600040] text-white font-black py-4 px-8 rounded-lg text-center transition-colors"
            >
              Start Supabase Setup →
            </a>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-4 px-8 rounded-lg transition-colors"
            >
              Return to Home
            </button>
          </div>

          {/* Info Box */}
          <div className="mt-12 p-6 bg-[#2d0a1c]/5 rounded-lg border border-[#2d0a1c]/10">
            <p className="text-sm text-[#2d0a1c]/70">
              <strong>💡 Tip:</strong> The full 7-stage journey is built and ready - it just needs Supabase credentials to store creator profiles, verify emails, and track Calendly bookings. Once you complete the setup in BOUNTIFUL_SETUP.md, this placeholder will automatically activate the full interactive experience!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BountifulJourneyPlaceholder;
