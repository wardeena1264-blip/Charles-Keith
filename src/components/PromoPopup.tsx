import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Sparkles, Gift } from 'lucide-react';

export function PromoPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('hasSeenPromo');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000); // Trigger after 5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const closePromo = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenPromo', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white max-w-2xl w-full relative overflow-hidden flex flex-col md:flex-row shadow-2xl"
          >
            <button 
              onClick={closePromo}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <div className="w-full md:w-1/2 h-64 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800"
                className="w-full h-full object-cover"
                alt="Promo"
              />
            </div>

            <div className="w-full md:w-1/2 p-10 flex flex-col justify-center text-center">
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 bg-gold-accent flex items-center justify-center rounded-full text-white">
                  <Sparkles size={24} />
                </div>
              </div>

              <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-gold-accent mb-2">Welcome Offer</span>
              <h2 className="serif text-3xl mb-4 italic">Take 15% OFF</h2>
              <p className="text-gray-500 font-light text-sm mb-8 leading-relaxed">
                Join our elite list for exclusive early access, style tips, and 15% off your first modular pair.
              </p>

              <div className="relative mb-4">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  placeholder="Your Email Address"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 focus:outline-none focus:border-gold-accent/30 text-sm transition-all"
                />
              </div>

              <button 
                onClick={closePromo}
                className="w-full bg-[#1A1A1A] text-white py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gold-accent transition-colors duration-500 flex items-center justify-center gap-2"
              >
                Get My Discount <ArrowRight size={14} />
              </button>
              
              <button 
                onClick={closePromo}
                className="mt-4 text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
              >
                No thanks, I'll pay full price
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

const ArrowRight = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
);
