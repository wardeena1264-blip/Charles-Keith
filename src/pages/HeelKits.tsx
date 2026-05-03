import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HEEL_KITS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, Settings2, Sparkles } from 'lucide-react';

export function HeelKits({ onNavigate }: { onNavigate: (page: string, id?: string) => void }) {
  const [activeFilter, setActiveFilter] = useState('All Kits');

  const filteredKits = activeFilter === 'All Kits' 
    ? HEEL_KITS 
    : HEEL_KITS.filter(kit => kit.heelType === activeFilter.toLowerCase());

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-start overflow-hidden bg-white pt-0">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://framerusercontent.com/images/UhwKweoUPKdqwFzDWgq297LFTRI.jpg?width=1600&height=900"
            className="w-full h-full object-cover scale-105 opacity-40"
            alt="Heel Kits"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-10 w-full py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-gold-accent" />
              <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-gold-accent">Modular Accessories</span>
            </div>
            <h1 className="serif text-5xl md:text-7xl mb-8 leading-tight text-[#1A1A1A]">Switch Your <br/><span className="italic">Style Anytime</span></h1>
            <p className="text-gray-500 font-light leading-relaxed mb-10 text-lg md:text-xl">
              The ultimate freedom of choice. Our interchangeable heel kits allow you to transform your shoes in seconds, adapting to any occasion from boardroom to ballroom.
            </p>
            <div className="flex items-center gap-6">
               <button 
                onClick={() => document.getElementById('collection-grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#1A1A1A] text-white px-10 md:px-12 py-4 md:py-5 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-gold-accent transition-all duration-500 flex items-center gap-4 shadow-2xl"
               >
                 Explore Collection <ArrowRight size={14} />
               </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section id="collection-grid" className="py-24 max-w-7xl mx-auto px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-gold-accent mb-4 block">The Collection</span>
            <h2 className="serif text-4xl font-light italic text-[#1A1A1A]">Refined Engineering</h2>
          </div>
          
          <div className="flex items-center gap-8 border-b border-border-light pb-4">
             {['All Kits', 'Stiletto', 'Block', 'Flat'].map((f) => (
               <button 
                key={f} 
                onClick={() => setActiveFilter(f)}
                className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all relative py-2 ${
                  activeFilter === f ? 'text-black' : 'text-gray-300 hover:text-black'
                }`}
               >
                 {f}
                 {activeFilter === f && (
                   <motion.div 
                    layoutId="activeFilter"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-accent"
                   />
                 )}
               </button>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-20 gap-x-12">
          <AnimatePresence mode="popLayout">
            {filteredKits.map((kit) => (
              <motion.div
                key={kit.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard 
                  product={kit} 
                  onClick={() => onNavigate('detail', kit.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-24 bg-[#F8F7F5]">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <video 
                src="https://videos.gotolstoy.com/public/b95639d2-4e70-4421-aaba-1877bc7ed608/8ed15d7e-f2c1-42f5-85e3-da9e448fe630/8ed15d7e-f2c1-42f5-85e3-da9e448fe630_640.mp4#t=0.01"
                className="w-full aspect-[4/5] object-cover opacity-100"
                autoPlay 
                loop 
                muted 
                playsInline
              />
              <div className="absolute -top-10 -left-10 bg-white p-12 shadow-2xl border border-border-light hidden lg:block">
                <div className="flex flex-col gap-6">
                   <div className="flex items-center gap-4">
                     <Settings2 size={24} className="text-gold-accent" />
                     <div>
                       <h4 className="text-[11px] font-bold uppercase tracking-widest leading-none">Universal Fit</h4>
                       <p className="text-[9px] text-gray-400 mt-1 uppercase tracking-wider">Compatible with all modular series</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-4">
                     <Sparkles size={24} className="text-gold-accent" />
                     <div>
                       <h4 className="text-[11px] font-bold uppercase tracking-widest leading-none">Aviation Grade</h4>
                       <p className="text-[9px] text-gray-400 mt-1 uppercase tracking-wider">Reinforced titanium locking system</p>
                     </div>
                   </div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-gold-accent mb-6 block">The Mechanism</span>
              <h2 className="serif text-5xl font-light mb-10 leading-tight">Advanced <br/> Modular <span className="italic">Physics</span></h2>
              <p className="text-gray-500 font-light leading-relaxed mb-8">
                Each heel kit is a masterpiece of precision engineering. Featuring our patented easy-lock mechanism, you can swap heights in under 10 seconds without any tools.
              </p>
              <div className="space-y-6">
                {[
                  { title: 'Durability', desc: 'Tested for over 1,000,000 steps without loss of tension.' },
                  { title: 'Balance', desc: 'Center of gravity optimized for each height option.' },
                  { title: 'Security', desc: 'Double-locking points for zero-wobble confidence.' }
                ].map((item) => (
                  <div key={item.title} className="group">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-black mb-2 flex items-center gap-3">
                      <span className="w-4 h-[1px] bg-gold-accent" />
                      {item.title}
                    </h4>
                    <p className="text-[13px] font-light text-gray-400 leading-relaxed ml-7">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
