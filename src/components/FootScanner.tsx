/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Ruler } from 'lucide-react';
import { useStore } from '../context';
import { AIScannerModal } from './AIScannerModal';

export function FootScanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userScanData } = useStore();

  return (
    <div id="ai-foot-scanner" className="py-24 bg-white border-y border-border-light overflow-hidden">
      <AIScannerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <div className="max-w-7xl mx-auto px-10">
        <div className="grid lg:grid-cols-2 items-center gap-20">
          <div className="max-w-xl">
            <div className="mb-2 text-[11px] uppercase tracking-[0.3em] opacity-40 font-bold">Premium Technology</div>
            <h2 className="serif text-5xl mb-6 font-light leading-tight text-[#1A1A1A]">Revolutionary <br/>AI Foot Scanner</h2>
            <p className="text-gray-600 mb-8 leading-relaxed font-light">
              Experience the future of personalized luxury. Our advanced AI scanning technology analyzes your foot geometry with millimeter precision to recommend your perfect Charles & Keith size.
            </p>
            
            <div className="bg-white border-l-4 border-gold-accent p-6 mb-10 shadow-sm">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 rounded-full border border-gold-accent flex items-center justify-center">
                  <Ruler size={18} className="text-gold-accent" />
                </div>
                <div>
                  <div className="text-[12px] font-bold tracking-wide">Fit Accuracy 98%</div>
                  <div className="text-[10px] opacity-60 uppercase tracking-widest font-black">Millimeter Precision</div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto bg-black text-white px-12 py-5 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-gold-accent transition-all shadow-xl"
            >
              {userScanData ? 'Scan Again' : 'Launch AI Scanner'}
            </button>
          </div>

          <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center">
            <div className="absolute inset-0 border border-gold-accent/10 rounded-full animate-pulse" />
            <div className="w-full h-full bg-[#F8F7F5] rounded-3xl flex items-center justify-center overflow-hidden relative border border-border-light">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:20px_20px]" />
              <img 
                src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600" 
                alt="Foot Scanning Visualization"
                className="w-[80%] aspect-[4/5] object-cover grayscale opacity-20"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-gold-accent shadow-[0_0_15px_rgba(197,160,89,0.8)] -translate-y-1/2 animate-[scan_3s_infinite]" />
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: 20%; }
          50% { top: 80%; }
          100% { top: 20%; }
        }
      `}} />
    </div>
  );
}
