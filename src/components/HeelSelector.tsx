/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { HEEL_TYPES } from '../constants';
import { HeelType } from '../types';

interface HeelSelectorProps {
  selectedHeel: HeelType;
  onSelect: (type: HeelType) => void;
}

export function HeelSelector({ selectedHeel, onSelect }: HeelSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[11px] uppercase tracking-widest font-semibold">Select Heel Type</span>
        <button className="text-[10px] underline tracking-widest opacity-60 uppercase font-bold hover:opacity-100 transition-opacity">
          How it works
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {HEEL_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelect(type.id as HeelType)}
            className={`p-6 border transition-all duration-300 flex flex-col items-center justify-center gap-3 group/item ${
              selectedHeel === type.id 
                ? 'border-black bg-white shadow-md' 
                : 'border-border-light bg-[#F8F7F5] opacity-60 hover:opacity-100'
            }`}
          >
            <div className={`w-10 h-10 flex items-center justify-center transition-transform group-hover/item:scale-110 ${selectedHeel === type.id ? 'opacity-100' : 'opacity-40'}`}>
              {type.id === 'stiletto' && (
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 18h16M4 18l4-12h8l4 12" className="opacity-20" /> {/* Base shoe shape */}
                  <path d="M16 6l4 12" strokeWidth="2" /> {/* Stiletto heel */}
                  <path d="M4 18c4 0 8-2 12-12" strokeWidth="2" /> {/* Sole arch */}
                </svg>
              )}
              {type.id === 'block' && (
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 18h16M4 18l4-12h8l4 12" className="opacity-20" />
                  <path d="M16 6v12h4v-12h-4z" fill="currentColor" /> {/* Block heel */}
                  <path d="M4 18c4 0 8-2 12-12" strokeWidth="2" />
                </svg>
              )}
              {type.id === 'flat' && (
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 18h16M4 18l4-12h8l4 12" className="opacity-20" />
                  <path d="M4 18h16" strokeWidth="2.5" /> {/* Flat sole */}
                  <path d="M4 18c8 0 12-1 16-1" strokeWidth="1" className="opacity-40" />
                </svg>
              )}
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold">
              {type.name}
            </span>
            <div className="text-[9px] opacity-40 uppercase tracking-tighter">
              {type.height}
            </div>
          </button>
        ))}
      </div>

      <div className="bg-white border border-border-light p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 h-full w-1 bg-gold-accent"></div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full border border-gold-accent flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-gold-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-wide uppercase mb-1">Modular Design</p>
            <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-tight">
              Each pair includes all three heel styles. The secure twist-and-lock mechanism ensures 100% stability at any height.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
