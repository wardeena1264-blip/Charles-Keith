/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';

interface HeroProps {
  onNavigate?: (page: string, id?: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="hero" className="relative h-screen flex items-center overflow-hidden">
      {/* Background with placeholder since gen failed */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1581084324492-c8076f130f86?auto=format&fit=crop&q=80&w=1920" 
          alt="Luxury Heels Editorial"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-2xl text-white"
        >
          <div className="mb-8 md:mb-12">
            <span className="text-[10px] md:text-[11px] font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase opacity-80">Autumn / Winter 2026 Collection</span>
          </div>

          <h2 className="text-4xl md:text-8xl serif font-light mb-8 leading-[1.1] text-white">
            Elevate Every <br /> <span className="italic">Perspective</span>
          </h2>
          <p className="text-lg text-white/90 mb-10 max-w-lg font-light leading-relaxed">
            Experience the Signature Collection: Revolutionary modular heels featuring our patented interchangeable system for unparalleled luxury.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              id="shop-now-cta" 
              onClick={() => onNavigate?.('heels')}
              className="w-full sm:w-auto group flex items-center justify-between gap-12 bg-white text-black px-12 py-5 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gold-accent hover:text-white transition-all duration-500 shadow-2xl"
            >
              Shop Collection
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={16} />
            </button>
            <div className="w-full sm:w-auto flex items-center justify-center gap-4 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20">
               <span className="text-white text-[10px] font-bold uppercase tracking-widest text-center leading-tight">
                Buy 1 Get 20% Off <br/> Second Pair
               </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Info & Countdown */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-12 right-12 hidden lg:flex flex-col gap-6 items-center"
      >
        <CountdownTimer />
        <div className="glass-panel border-white/20 p-8 max-w-[280px] shadow-2xl">
          <div className="text-[10px] text-white uppercase tracking-[0.3em] font-bold mb-3 opacity-60">Revolutionary</div>
          <div className="text-white serif italic text-2xl mb-4 leading-tight">Interchangeable <br/>Heel System</div>
          <div className="w-16 h-[1.5px] bg-gold-accent mb-4" />
          <p className="text-white/80 text-[11px] leading-relaxed font-light tracking-wide">
            One body, three souls. Switch from stiletto to block in seconds with absolute stability.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
