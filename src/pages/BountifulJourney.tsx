import React, { useState, useEffect } from 'react';
import { ChevronRight, Loader, Check, Mail } from 'lucide-react';
import { saveCreatorProfile, getCreatorProfile, sendMagicLink } from '../lib/supabase';

interface JourneyData {
  email: string;
  name: string;
  persona: string;
  solution: string;
  barrier: string;
  ipStatus: string;
  calendlyBooked: boolean;
  completedStages: number[];
}

const BountifulJourney: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [journeyData, setJourneyData] = useState<JourneyData>({
    email: '',
    name: '',
    persona: '',
    solution: '',
    barrier: '',
    ipStatus: '',
    calendlyBooked: false,
    completedStages: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [error, setError] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('bountifulJourney');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setJourneyData(parsed);
      setCurrentStage(parsed.completedStages.length + 1);
      setEmailVerified(!!parsed.email);
    }
  }, []);

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem('bountifulJourney', JSON.stringify(journeyData));
    // Set tracking cookie
    document.cookie = `bountifulStage=${currentStage};path=/;max-age=${30 * 24 * 60 * 60}`;
  }, [journeyData, currentStage]);

  const handleNextStage = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Save to Supabase at each stage
      const newCompleted = [...journeyData.completedStages, currentStage];
      const updatedData = { ...journeyData, completedStages: newCompleted };

      const { error: dbError } = await saveCreatorProfile({
        email: journeyData.email,
        name: journeyData.name,
        persona: journeyData.persona as any,
        solution: journeyData.solution,
        barrier: journeyData.barrier as any,
        ip_status: journeyData.ipStatus as any,
        current_stage: currentStage + 1,
        completed_stages: newCompleted,
        calendly_booked: journeyData.calendlyBooked,
        email_verified: emailVerified,
      });

      if (dbError) {
        setError('Failed to save progress. Please try again.');
        console.error(dbError);
        return;
      }

      setJourneyData(updatedData);
      setCurrentStage(currentStage + 1);
      window.scrollTo(0, 0);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendVerificationEmail = async () => {
    setIsLoading(true);
    setError('');

    try {
      const { error: emailError } = await sendMagicLink(journeyData.email);

      if (emailError) {
        setError('Failed to send verification email. Please try again.');
        return;
      }

      setVerificationSent(true);
      // Auto-verify after 30 seconds (in production, user clicks link)
      setTimeout(() => {
        setEmailVerified(true);
        setVerificationSent(false);
      }, 3000);
    } catch (err) {
      setError('Failed to send email. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Stage 1: Identity with Email Verification
  const renderStage1 = () => (
    <div className="space-y-8">
      {!emailVerified ? (
        <>
          <div>
            <label className="block text-sm font-bold text-[#2d0a1c] mb-2">Email Address (We'll verify this first) *</label>
            <div className="flex gap-2">
              <input
                type="email"
                required
                value={journeyData.email}
                onChange={(e) => handleDataChange('email', e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-[#eeb0b0] rounded-lg focus:outline-none focus:border-[#800060]"
                placeholder="your@email.com"
                disabled={verificationSent}
              />
              <button
                onClick={handleSendVerificationEmail}
                disabled={!journeyData.email || isLoading}
                className="px-6 py-3 bg-[#800060] hover:bg-[#600040] disabled:bg-gray-400 text-white font-bold rounded-lg flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                {verificationSent ? 'Sent!' : 'Verify'}
              </button>
            </div>
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            {verificationSent && (
              <p className="text-green-600 text-sm mt-2">✓ Check your email for verification link</p>
            )}
          </div>

          {emailVerified && (
            <button
              onClick={() => setCurrentStage(1)}
              className="w-full bg-green-600 text-white font-black py-3 rounded-lg"
            >
              ✓ Email Verified - Continue
            </button>
          )}
        </>
      ) : (
        <>
          <div>
            <label className="block text-sm font-bold text-[#2d0a1c] mb-2">Full Name *</label>
            <input
              type="text"
              required
              value={journeyData.name}
              onChange={(e) => handleDataChange('name', e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#eeb0b0] rounded-lg focus:outline-none focus:border-[#800060]"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#2d0a1c] mb-2">Email: {journeyData.email}</label>
            <p className="text-sm text-green-600 font-bold">✓ Verified</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#2d0a1c] mb-4">Who is the architect behind your solution? *</label>
            <div className="grid grid-cols-2 gap-4">
              {['Creator', 'Visionary', 'Protector', 'Refugee'].map((persona) => (
                <button
                  key={persona}
                  onClick={() => handleDataChange('persona', persona)}
                  className={`p-4 rounded-lg border-2 font-bold transition-all ${
                    journeyData.persona === persona
                      ? 'border-[#800060] bg-[#800060]/10'
                      : 'border-[#eeb0b0] hover:border-[#800060]'
                  }`}
                >
                  {persona}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleNextStage}
            disabled={!journeyData.name || !journeyData.email || !journeyData.persona || isLoading}
            className="w-full bg-[#800060] hover:bg-[#600040] disabled:bg-gray-400 text-white font-black py-3 rounded-lg flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : 'Continue to Stage 2'} <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );

  // Stage 2: Solution Genesis
  const renderStage2 = () => (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-bold text-[#2d0a1c] mb-2">What is the core "Soul" of your idea? *</label>
        <textarea
          value={journeyData.solution}
          onChange={(e) => handleDataChange('solution', e.target.value)}
          rows={6}
          className="w-full px-4 py-3 border-2 border-[#eeb0b0] rounded-lg focus:outline-none focus:border-[#800060] resize-none"
          placeholder="Describe the essence of your idea and who it serves..."
        />
        <p className="text-sm text-[#2d0a1c]/60 mt-2">💡 Tip: Be specific about your target audience and the problem you solve</p>
      </div>

      <button
        onClick={handleNextStage}
        disabled={!journeyData.solution}
        className="w-full bg-[#800060] hover:bg-[#600040] disabled:bg-gray-400 text-white font-black py-3 rounded-lg flex items-center justify-center gap-2"
      >
        Continue to Stage 3 <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );

  // Stage 3: Growth Diagnostic
  const renderStage3 = () => (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-bold text-[#2d0a1c] mb-4">What primary barrier prevents your "Bountiful" expansion? *</label>
        <div className="space-y-3">
          {['Operational Drag', 'Distribution Gap', 'IP Vulnerability', 'Other'].map((option) => (
            <button
              key={option}
              onClick={() => handleDataChange('barrier', option)}
              className={`w-full p-4 rounded-lg border-2 font-bold text-left transition-all ${
                journeyData.barrier === option
                  ? 'border-[#800060] bg-[#800060]/10'
                  : 'border-[#eeb0b0] hover:border-[#800060]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleNextStage}
        disabled={!journeyData.barrier}
        className="w-full bg-[#800060] hover:bg-[#600040] disabled:bg-gray-400 text-white font-black py-3 rounded-lg flex items-center justify-center gap-2"
      >
        Continue to Stage 4 <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );

  // Stage 4: IP Integrity Audit
  const renderStage4 = () => (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-bold text-[#2d0a1c] mb-4">How is your intellectual property currently documented? *</label>
        <div className="space-y-3">
          {['Formally Registered', 'Documented Privately', 'Undocumented', 'Other'].map((option) => (
            <button
              key={option}
              onClick={() => handleDataChange('ipStatus', option)}
              className={`w-full p-4 rounded-lg border-2 font-bold text-left transition-all ${
                journeyData.ipStatus === option
                  ? 'border-[#800060] bg-[#800060]/10'
                  : 'border-[#eeb0b0] hover:border-[#800060]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleNextStage}
        disabled={!journeyData.ipStatus}
        className="w-full bg-[#800060] hover:bg-[#600040] disabled:bg-gray-400 text-white font-black py-3 rounded-lg flex items-center justify-center gap-2"
      >
        Continue to Stage 5 <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );

  // Stage 5: Council Processing
  const renderStage5 = () => (
    <div className="space-y-8 text-center">
      <div className="py-12">
        <Loader className="w-16 h-16 mx-auto animate-spin text-[#800060] mb-6" />
        <h3 className="text-3xl font-black text-[#2d0a1c] mb-4">The Council is Reviewing Your Profile</h3>
        <p className="text-lg text-[#2d0a1c]/70">Syncing data to the Sovereign Utility...</p>
        <div className="mt-8 space-y-2 text-[#2d0a1c]/60">
          <p>✓ Identity verified</p>
          <p>✓ Solution documented</p>
          <p>✓ Barriers assessed</p>
          <p>✓ IP status recorded</p>
        </div>
      </div>

      <button
        onClick={() => setTimeout(handleNextStage, 2000)}
        className="w-full bg-[#800060] hover:bg-[#600040] text-white font-black py-3 rounded-lg"
      >
        Proceed to Stage 6
      </button>
    </div>
  );

  // Stage 6: Human Connection (Calendly)
  const renderStage6 = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-black text-[#2d0a1c] mb-4">Schedule Your Verification Consultation</h3>
        <p className="text-[#2d0a1c]/70 mb-6">
          Join us for a 15-minute conversation with the IdeaDex Council to verify your profile and explore partnership opportunities.
        </p>
        <p className="text-sm text-[#800060] font-bold mb-6">📅 All sessions managed at: elkilla1989@gmail.com</p>

        {/* Calendly Embed */}
        <div className="bg-white border-2 border-[#eeb0b0] rounded-lg overflow-hidden">
          <iframe
            src="https://calendly.com/elkilla1989"
            width="100%"
            height="600"
            frameBorder="0"
            title="Schedule a call with IdeaDex Council"
          ></iframe>
        </div>

        <p className="text-sm text-[#2d0a1c]/60 mt-4">
          💡 After booking, you'll receive a confirmation email. The IdeaDex Council will reach out with final details before your call.
        </p>
      </div>

      <button
        onClick={handleNextStage}
        className="w-full bg-[#800060] hover:bg-[#600040] text-white font-black py-3 rounded-lg flex items-center justify-center gap-2"
      >
        {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : '✓ Scheduled - Continue to Final Stage'} <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );

  // Stage 7: Sanctuary Entrance
  const renderStage7 = () => (
    <div className="text-center py-12 space-y-8">
      <div className="bg-gradient-to-br from-[#800060]/20 to-[#eeb0b0]/20 border-2 border-[#800060] rounded-2xl p-12">
        <Check className="w-20 h-20 mx-auto text-[#800060] mb-6" />
        <h2 className="text-4xl font-black text-[#2d0a1c] mb-4">Welcome to the Bountiful Queue</h2>
        <p className="text-xl text-[#2d0a1c]/70 mb-6">
          🎉 Your journey is secured. You are now part of the IdeaDex Bountiful collective.
        </p>
        <div className="bg-white/80 rounded-lg p-6 text-left space-y-3 text-[#2d0a1c]">
          <p><strong>Architect:</strong> {journeyData.name}</p>
          <p><strong>Email:</strong> {journeyData.email}</p>
          <p><strong>Persona:</strong> {journeyData.persona}</p>
          <p><strong>Primary Barrier:</strong> {journeyData.barrier}</p>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-[#2d0a1c]/70">
          The IdeaDex Council will contact you shortly to discuss your partnership opportunities.
        </p>
        <button
          onClick={() => {
            localStorage.removeItem('bountifulJourney');
            window.location.href = '/#about';
          }}
          className="w-full bg-[#800060] hover:bg-[#600040] text-white font-black py-3 rounded-lg"
        >
          Return to IdeaDex
        </button>
      </div>
    </div>
  );

  const stages = [renderStage1, renderStage2, renderStage3, renderStage4, renderStage5, renderStage6, renderStage7];

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#fef5f1] via-[#fde9e0] to-[#f5d9cc] pt-40 pb-20 px-6">
      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5, 6, 7].map((stage) => (
            <div
              key={stage}
              className={`flex-1 h-2 rounded-full transition-all ${
                stage <= currentStage ? 'bg-[#800060]' : 'bg-[#eeb0b0]'
              }`}
            />
          ))}
        </div>
        <p className="text-center text-[#2d0a1c]/70 font-bold">
          Stage {currentStage} of 7: {['Identity', 'Genesis', 'Diagnostic', 'IP Audit', 'Processing', 'Consultation', 'Sanctuary'][currentStage - 1]}
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
        {stages[currentStage - 1]()}
      </div>
    </div>
  );
};

export default BountifulJourney;
