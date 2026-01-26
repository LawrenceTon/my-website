import React, { useState } from 'react';
import { Pin, Rocket, Menu, Play } from 'lucide-react';
import logo from './assets/logo.png';
import paperBg from './assets/paper-container-bg.png';
import paperBtnBg from './assets/paper-button-bg.png';
import userAvatar from './assets/user-avatar.png';
import ideadexVid from './assets/IdeaDex-Vid.mp4';
import BountifulJourney from './src/pages/BountifulJourney';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'journey'>('home');
  const [showVideo, setShowVideo] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://formspree.io/f/xdagkjaj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  // Route detection
  React.useEffect(() => {
    if (window.location.pathname.includes('/journey/bountiful')) {
      setCurrentPage('journey');
    }
  }, []);

  if (currentPage === 'journey') {
    return <BountifulJourney />;
  }

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
            
            {/* Button 1: Start Here - Bountiful Journey Trigger */}
            {/* BIGGER BUTTON (w-96) with SMALLER TEXT (text-xl) */}
            <button 
              onClick={() => window.location.href = '/journey/bountiful'}
              className="relative w-96 h-40 float-anim-delayed group hover:scale-105 transition-transform flex items-center justify-center cursor-pointer filter drop-shadow-xl"
            >
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

      {/* About Section */}
      <section id="about" className="relative min-h-screen w-full pt-40 pb-20 px-6 flex items-center justify-center bg-gradient-to-b from-[#fff0f0] to-[#ffe6e6] scroll-mt-32">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl md:text-8xl font-black mb-16 text-center text-[#2d0a1c] tracking-tight">About IdeaDex</h2>
          
          {/* Video Container */}
          <div className="relative">
            {!showVideo ? (
              // Thumbnail/Cover
              <div 
                onClick={() => setShowVideo(true)}
                className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden cursor-pointer group shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="bg-[#800060]/90 hover:bg-[#800060] rounded-full p-6 transform transition-transform group-hover:scale-110">
                    <Play className="w-12 h-12 text-white fill-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8 z-20">
                  <p className="text-white text-2xl font-bold">Watch Our Story</p>
                  <p className="text-[#eeb0b0] text-lg">Discover how IdeaDex transforms ideas into reality</p>
                </div>
              </div>
            ) : (
              // Video Player
              <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                <video
                  src={ideadexVid}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
                <button
                  onClick={() => setShowVideo(false)}
                  className="absolute top-4 right-4 bg-[#800060] hover:bg-[#600040] text-white px-6 py-2 rounded-full font-bold z-30 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>

          {/* About Content */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
              <h3 className="text-3xl font-bold mb-4 text-[#800060]">Our Mission</h3>
              <p className="text-lg text-[#2d0a1c]/80 leading-relaxed">
                At IdeaDex, we believe that brilliant ideas should never be confined to someone's mind. Our mission is to create a seamless platform where visionaries, entrepreneurs, and creators can capture, develop, and monetize their ideas while maintaining complete ownership and control.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
              <h3 className="text-3xl font-bold mb-4 text-[#800060]">Why Choose Us</h3>
              <ul className="text-lg text-[#2d0a1c]/80 leading-relaxed space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#800060] font-bold text-xl">✓</span>
                  <span>Secure idea documentation and timestamping</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#800060] font-bold text-xl">✓</span>
                  <span>Full ownership and control over your ideas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#800060] font-bold text-xl">✓</span>
                  <span>Connect with investors and collaborators</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative min-h-screen w-full pt-40 pb-20 px-6 flex items-center justify-center bg-gradient-to-b from-[#ffe6e6] to-[#ffd9d9]">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-6xl md:text-8xl font-black mb-4 text-center text-[#2d0a1c] tracking-tight">Get In Touch</h2>
          <p className="text-xl text-center text-[#2d0a1c]/70 mb-16">Have questions or ideas? We'd love to hear from you!</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="flex flex-col gap-8">
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-[#800060]">Contact Info</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-[#2d0a1c]/60 uppercase tracking-wide font-bold mb-2">Email</p>
                    <a href="mailto:lawrence@ideadex.me" className="text-lg text-[#800060] hover:text-[#600040] font-bold break-all">
                      lawrence@ideadex.me
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-[#2d0a1c]/60 uppercase tracking-wide font-bold mb-2">Website</p>
                    <p className="text-lg text-[#2d0a1c] font-bold">ideadex.me</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#2d0a1c]/60 uppercase tracking-wide font-bold mb-2">Response Time</p>
                    <p className="text-lg text-[#2d0a1c]">Usually within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-[#800060]">Send us a Message</h3>
              
              {submitted ? (
                <div className="bg-green-100 border-l-4 border-green-500 p-6 rounded">
                  <p className="text-green-700 font-bold text-lg">✓ Message sent successfully!</p>
                  <p className="text-green-600">We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-[#2d0a1c] mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-[#eeb0b0] rounded-lg focus:outline-none focus:border-[#800060] transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#2d0a1c] mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-[#eeb0b0] rounded-lg focus:outline-none focus:border-[#800060] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#2d0a1c] mb-2">Message</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-[#eeb0b0] rounded-lg focus:outline-none focus:border-[#800060] transition-colors resize-none"
                      placeholder="Tell us about your idea or question..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#800060] hover:bg-[#600040] text-white font-black py-3 rounded-lg transition-colors uppercase tracking-wide"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;