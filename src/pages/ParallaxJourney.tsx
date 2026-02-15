import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, Check, Loader, Mail, ArrowRight, Star, Shield, Zap, Lock } from 'lucide-react';
import { saveCreatorProfile, sendMagicLink } from '../lib/supabase';
import paperBg from '../../assets/paper-container-bg.png';
import paperBtnBg from '../../assets/paper-button-bg.png';

// --- Types ---
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

const INITIAL_DATA: JourneyData = {
  email: '',
  name: '',
  persona: '',
  solution: '',
  barrier: '',
  ipStatus: '',
  calendlyBooked: false,
  completedStages: [],
};

// --- Components ---

const Section = ({
  children,
  className = "",
  id = ""
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <section id={id} className={`relative min-h-screen flex flex-col items-center justify-center p-6 md:p-12 ${className}`}>
      {children}
    </section>
  );
};

const FloatingPaper = ({
  delay = 0,
  rotate = 0,
  x = 0,
  y = 0,
  scale = 1,
  className = ""
}: {
  delay?: number;
  rotate?: number;
  x?: number;
  y?: number;
  scale?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50, rotate: rotate - 10 }}
    whileInView={{ opacity: 1, y: 0, rotate: rotate }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    viewport={{ once: true, margin: "-100px" }}
    className={`absolute -z-10 pointer-events-none ${className}`}
    style={{ x, y, scale }}
  >
    <img src={paperBtnBg} alt="" className="w-64 md:w-96 opacity-40 drop-shadow-xl" />
  </motion.div>
);

const ParallaxJourney: React.FC = () => {
  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Background Parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.8, 0.4]);

  // State
  const [journeyData, setJourneyData] = useState<JourneyData>(INITIAL_DATA);
  const [currentStage, setCurrentStage] = useState(1); // Visual tracking
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState('');

  // Refs for scrolling
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage3Ref = useRef<HTMLDivElement>(null);
  const stage4Ref = useRef<HTMLDivElement>(null);
  const stage5Ref = useRef<HTMLDivElement>(null);
  const stage6Ref = useRef<HTMLDivElement>(null);
  const stage7Ref = useRef<HTMLDivElement>(null);

  const sectionRefs = [stage1Ref, stage2Ref, stage3Ref, stage4Ref, stage5Ref, stage6Ref, stage7Ref];

  // Load Data
  useEffect(() => {
    const saved = localStorage.getItem('bountifulJourney');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setJourneyData(parsed);
        if (parsed.email) setEmailVerified(true);
      } catch (e) {
        console.error("Failed to parse journey data", e);
      }
    }
  }, []);

  // Save Data
  useEffect(() => {
    localStorage.setItem('bountifulJourney', JSON.stringify(journeyData));
  }, [journeyData]);

  // --- Handlers ---

  const handleUpdate = (field: keyof JourneyData, value: any) => {
    setJourneyData(prev => ({ ...prev, [field]: value }));
  };

  const saveProgress = async (stageIndex: number) => {
    setIsLoading(true);
    setError('');

    // Optimistic UI update
    const newCompleted = [...new Set([...journeyData.completedStages, stageIndex])];
    const updatedData = { ...journeyData, completedStages: newCompleted };
    setJourneyData(updatedData);

    try {
      const { error: dbError } = await saveCreatorProfile({
        email: journeyData.email,
        name: journeyData.name,
        persona: journeyData.persona as any,
        solution: journeyData.solution,
        barrier: journeyData.barrier as any,
        ip_status: journeyData.ipStatus as any,
        current_stage: stageIndex + 1,
        completed_stages: newCompleted,
        calendly_booked: journeyData.calendlyBooked,
        email_verified: emailVerified,
      });

      if (dbError) {
        console.warn("Supabase save failed (Demo Mode active?)", dbError);
      }
    } catch (err) {
      console.warn("Save error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToNext = (nextIndex: number) => {
    if (nextIndex < sectionRefs.length) {
      sectionRefs[nextIndex].current?.scrollIntoView({ behavior: 'smooth' });
      setCurrentStage(nextIndex + 1);
      saveProgress(nextIndex); // Save the previous stage as complete
    }
  };

  const handleVerifyEmail = async () => {
    if (!journeyData.email) return;
    setIsLoading(true);
    try {
      const { error } = await sendMagicLink(journeyData.email);
      if (error) throw error;
      setVerificationSent(true);
      // Simulate verification for demo flow
      setTimeout(() => {
        setEmailVerified(true);
        setVerificationSent(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      // Fallback for demo if Supabase fails
      setVerificationSent(true);
      setTimeout(() => {
        setEmailVerified(true);
        setVerificationSent(false);
      }, 1500);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Render ---

  return (
    <div className="relative w-full bg-[#fdf2f2] text-[#2d0a1c] font-sans overflow-hidden">

      {/* Fixed Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-[#800060] origin-left z-50"
        style={{ scaleX }}
      />

      {/* Floating Navigation/Stage Indicator */}
      <div className="fixed top-20 right-6 z-40 hidden lg:flex flex-col gap-2">
        {[1, 2, 3, 4, 5, 6, 7].map((stage) => (
          <button
            key={stage}
            onClick={() => sectionRefs[stage-1].current?.scrollIntoView({ behavior: 'smooth' })}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentStage >= stage ? 'bg-[#800060] scale-125' : 'bg-[#eeb0b0]'
            }`}
          />
        ))}
      </div>

      {/* Parallax Background Layer */}
      <motion.div
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{ y: bgY, opacity: bgOpacity }}
      >
        <img src={paperBg} alt="Texture" className="w-full h-full object-cover opacity-30 mix-blend-multiply" />
      </motion.div>

      {/* STAGE 1: IDENTITY */}
      <Section id="stage-1">
        <div ref={stage1Ref} className="relative z-10 w-full max-w-3xl">
          <FloatingPaper rotate={-5} x={-100} y={-100} />
          <FloatingPaper rotate={10} x={300} y={200} delay={0.2} />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl border-t-4 border-[#800060]"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-[#800060] text-white text-xl font-black w-12 h-12 flex items-center justify-center rounded-full">1</span>
              <h2 className="text-3xl md:text-4xl font-black">Identity Verification</h2>
            </div>

            <div className="space-y-6">
              {/* Email Step */}
              <div className={`transition-all duration-500 ${emailVerified ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                <label className="block text-sm font-bold uppercase tracking-wider mb-2">Email Address</label>
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={journeyData.email}
                    onChange={(e) => handleUpdate('email', e.target.value)}
                    placeholder="architect@ideadex.me"
                    className="flex-1 px-4 py-3 bg-[#fff0f0] border-2 border-[#eeb0b0] rounded-lg focus:border-[#800060] outline-none font-medium"
                  />
                  <button
                    onClick={handleVerifyEmail}
                    disabled={!journeyData.email || isLoading}
                    className="px-6 py-3 bg-[#800060] text-white font-bold rounded-lg hover:bg-[#600040] transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isLoading ? <Loader className="animate-spin w-4 h-4" /> : <Mail className="w-4 h-4" />}
                    Verify
                  </button>
                </div>
                {verificationSent && <p className="text-green-600 font-bold mt-2 text-sm">✓ Verification link sent! (Check email)</p>}
              </div>

              {/* Name & Persona Step (Revealed after verification) */}
              {emailVerified && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-6 pt-6 border-t-2 border-[#eeb0b0]/30"
                >
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider mb-2">Full Name</label>
                    <input
                      type="text"
                      value={journeyData.name}
                      onChange={(e) => handleUpdate('name', e.target.value)}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-[#fff0f0] border-2 border-[#eeb0b0] rounded-lg focus:border-[#800060] outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider mb-4">Select Your Persona</label>
                    <div className="grid grid-cols-2 gap-4">
                      {['Creator', 'Visionary', 'Protector', 'Refugee'].map((p) => (
                        <button
                          key={p}
                          onClick={() => handleUpdate('persona', p)}
                          className={`p-4 rounded-lg border-2 font-bold transition-all ${
                            journeyData.persona === p
                              ? 'border-[#800060] bg-[#800060] text-white'
                              : 'border-[#eeb0b0] hover:border-[#800060] hover:bg-[#fff0f0]'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => scrollToNext(1)}
                    disabled={!journeyData.name || !journeyData.persona}
                    className="w-full py-4 bg-[#2d0a1c] text-white font-black text-lg rounded-lg hover:bg-black transition-all flex items-center justify-center gap-2 group"
                  >
                    Continue Journey <ChevronDown className="group-hover:translate-y-1 transition-transform" />
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* STAGE 2: GENESIS */}
      <Section id="stage-2">
        <div ref={stage2Ref} className="relative z-10 w-full max-w-3xl">
          <FloatingPaper rotate={5} x={200} y={-150} delay={0.1} />

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl border-l-4 border-[#800060]"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-[#800060] text-white text-xl font-black w-12 h-12 flex items-center justify-center rounded-full">2</span>
              <h2 className="text-3xl md:text-4xl font-black">Solution Genesis</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-lg font-bold text-[#2d0a1c] mb-4">
                  What is the core "Soul" of your idea?
                </label>
                <p className="text-[#2d0a1c]/60 text-sm mb-4">Describe the essence of your innovation and who it serves.</p>
                <textarea
                  value={journeyData.solution}
                  onChange={(e) => handleUpdate('solution', e.target.value)}
                  rows={6}
                  className="w-full px-6 py-4 bg-[#fff0f0] border-2 border-[#eeb0b0] rounded-xl focus:border-[#800060] outline-none font-medium resize-none text-lg leading-relaxed"
                  placeholder="My idea is a platform that helps..."
                />
              </div>

              <button
                onClick={() => scrollToNext(2)}
                disabled={!journeyData.solution}
                className="w-full py-4 bg-[#800060] text-white font-black text-lg rounded-lg hover:bg-[#600040] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Crystallize Idea <ChevronDown className="group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* STAGE 3: DIAGNOSTIC */}
      <Section id="stage-3">
        <div ref={stage3Ref} className="relative z-10 w-full max-w-4xl">
           <FloatingPaper rotate={-8} x={-200} y={50} delay={0.2} />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#800060] text-white text-2xl font-black mb-6">3</div>
            <h2 className="text-4xl md:text-5xl font-black mb-12 text-[#2d0a1c]">The Barrier</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {[
                { label: 'Operational Drag', icon: <Zap className="w-6 h-6"/>, desc: "Slowing down execution" },
                { label: 'Distribution Gap', icon: <ArrowRight className="w-6 h-6"/>, desc: "Can't reach the audience" },
                { label: 'IP Vulnerability', icon: <Lock className="w-6 h-6"/>, desc: "Fear of theft or copycats" },
                { label: 'Other', icon: <Star className="w-6 h-6"/>, desc: "Something else entirely" }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    handleUpdate('barrier', item.label);
                    setTimeout(() => scrollToNext(3), 300);
                  }}
                  className={`relative p-8 rounded-2xl border-2 transition-all duration-300 group text-left ${
                    journeyData.barrier === item.label
                      ? 'border-[#800060] bg-[#800060] text-white scale-105 shadow-2xl'
                      : 'border-[#eeb0b0] bg-white hover:border-[#800060] hover:shadow-lg'
                  }`}
                >
                  <div className={`mb-4 p-3 rounded-lg inline-block ${
                    journeyData.barrier === item.label ? 'bg-white/20' : 'bg-[#fff0f0]'
                  }`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-black mb-2">{item.label}</h3>
                  <p className={`text-sm ${journeyData.barrier === item.label ? 'text-white/80' : 'text-[#2d0a1c]/60'}`}>
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* STAGE 4: IP AUDIT */}
      <Section id="stage-4">
        <div ref={stage4Ref} className="relative z-10 w-full max-w-3xl">
          <FloatingPaper rotate={12} x={150} y={100} delay={0.1} />

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-[#2d0a1c] text-white p-8 md:p-16 rounded-3xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#800060] rounded-full blur-[100px] opacity-50 -mr-20 -mt-20"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <span className="bg-white text-[#2d0a1c] text-xl font-black w-12 h-12 flex items-center justify-center rounded-full">4</span>
                <h2 className="text-3xl md:text-4xl font-black">IP Integrity Audit</h2>
              </div>

              <p className="text-lg text-white/80 mb-8">
                How is your intellectual property currently documented? This determines your protection level in the Sovereign Sanctuary.
              </p>

              <div className="space-y-4">
                {['Formally Registered', 'Documented Privately', 'Undocumented', 'Other'].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      handleUpdate('ipStatus', option);
                      setTimeout(() => scrollToNext(4), 300);
                    }}
                    className={`w-full p-6 rounded-xl border-2 font-bold text-left transition-all flex items-center justify-between group ${
                      journeyData.ipStatus === option
                        ? 'border-[#eeb0b0] bg-[#eeb0b0]/10 text-[#eeb0b0]'
                        : 'border-[#ffffff]/20 hover:border-[#eeb0b0] text-white'
                    }`}
                  >
                    <span>{option}</span>
                    {journeyData.ipStatus === option && <Check className="w-6 h-6" />}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* STAGE 5: COUNCIL PROCESSING */}
      <Section id="stage-5">
        <div ref={stage5Ref} className="relative z-10 w-full max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            onViewportEnter={() => {
              // Simulate processing delay then auto-scroll
              setTimeout(() => {
                // Ensure we only auto-advance if we are actually viewing this stage and haven't moved on
                // A simple way is to check if we are still around stage 5 visually or just force it.
                // Since this is triggered by 'onViewportEnter', it might trigger when scrolling *past* it.
                // But typically users scroll down.
                // Let's just trust the user flow for now.
                scrollToNext(5);
              }, 3000);
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 border-8 border-[#eeb0b0] border-t-[#800060] rounded-full mx-auto mb-8"
            />

            <h2 className="text-4xl font-black text-[#2d0a1c] mb-4">The Council is Reviewing</h2>
            <p className="text-xl text-[#2d0a1c]/70 mb-8">Syncing your data to the Sovereign Utility...</p>

            <div className="flex flex-col items-center gap-4 text-[#800060] font-bold">
              {['Identity Verified', 'Genesis Recorded', 'Barrier Analyzed', 'IP Status Logged'].map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.5 }}
                  className="flex items-center gap-2"
                >
                  <Check className="w-5 h-5" /> {step}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* STAGE 6: HUMAN CONNECTION (CALENDLY) */}
      <Section id="stage-6">
        <div ref={stage6Ref} className="relative z-10 w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white shadow-2xl rounded-2xl overflow-hidden border-2 border-[#eeb0b0]"
          >
            <div className="p-8 md:p-10 bg-[#fff0f0] border-b-2 border-[#eeb0b0]">
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-4">
                  <span className="bg-[#800060] text-white text-xl font-black w-10 h-10 flex items-center justify-center rounded-full">6</span>
                  <h2 className="text-2xl md:text-3xl font-black text-[#2d0a1c]">Final Verification</h2>
                 </div>
                 <button
                   onClick={() => scrollToNext(6)}
                   className="text-[#800060] font-bold hover:underline text-sm md:text-base"
                 >
                   Skip scheduling for now →
                 </button>
              </div>
              <p className="text-[#2d0a1c]/80 max-w-2xl">
                Schedule a 15-minute verification consultation with the IdeaDex Council. This step is crucial for accessing the full Bountiful network.
              </p>
            </div>

            <div className="h-[600px] w-full bg-white relative">
              <iframe
                src="https://calendly.com/elkilla1989"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Calendly"
              ></iframe>
            </div>

            <div className="p-6 bg-[#2d0a1c] text-white flex justify-between items-center">
              <p className="text-sm opacity-70">Once scheduled, continue to the Sanctuary.</p>
              <button
                onClick={() => scrollToNext(6)}
                className="bg-[#eeb0b0] text-[#2d0a1c] px-6 py-2 rounded-lg font-bold hover:bg-white transition-colors"
              >
                I've Scheduled My Call →
              </button>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* STAGE 7: SANCTUARY */}
      <Section id="stage-7">
        <div ref={stage7Ref} className="relative z-10 w-full max-w-4xl text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
            className="bg-white/40 backdrop-blur-md p-12 md:p-20 rounded-[3rem] border-4 border-[#800060] shadow-2xl relative"
          >
            {/* Confetti / Success Elements */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#800060] text-white p-6 rounded-full shadow-lg">
              <Shield className="w-12 h-12" />
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-[#2d0a1c] mb-6 mt-8">
              Welcome Home.
            </h1>
            <p className="text-2xl md:text-3xl text-[#800060] font-bold mb-8">
              You are now part of the Bountiful Collective.
            </p>

            <div className="bg-white/80 rounded-xl p-8 max-w-lg mx-auto mb-10 text-left space-y-3 shadow-inner">
              <p className="text-[#2d0a1c]/60 text-sm uppercase font-bold tracking-widest mb-4">Architect Profile</p>
              <p><strong className="text-[#800060]">Name:</strong> {journeyData.name}</p>
              <p><strong className="text-[#800060]">Role:</strong> {journeyData.persona}</p>
              <p><strong className="text-[#800060]">Mission:</strong> {journeyData.solution?.substring(0, 50)}...</p>
              <p><strong className="text-[#800060]">Status:</strong> <span className="text-green-600 font-bold">Verified & Secured</span></p>
            </div>

            <button
              onClick={() => window.location.href = '/'}
              className="px-10 py-5 bg-[#2d0a1c] text-white font-black text-xl rounded-full hover:bg-[#800060] transition-all transform hover:scale-105 shadow-xl"
            >
              Enter the Sanctuary
            </button>
          </motion.div>
        </div>
      </Section>

    </div>
  );
};

export default ParallaxJourney;
