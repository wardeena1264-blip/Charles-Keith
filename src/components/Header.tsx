/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShoppingBag, Search, Menu, User, Home } from 'lucide-react';
import { useStore } from '../context';
import { motion } from 'motion/react';

interface HeaderProps {
  onNavigate?: (page: string, id?: string) => void;
  currentPage?: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const { cart, setIsCartOpen } = useStore();

  return (
    <header id="site-header" className="fixed top-0 left-0 right-0 z-50 glass-panel h-16 border-b border-border-light">
      <div className="max-w-7xl mx-auto px-10 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-semibold text-gray-800">
            <button 
              onClick={() => onNavigate?.('home')}
              className={`hover:text-gold-accent transition-colors cursor-pointer flex items-center gap-1.5 ${currentPage === 'home' ? 'text-black' : ''}`}
            >
              <Home size={14} strokeWidth={2.5} />
              <span className="hidden sm:inline">Home</span>
            </button>
            <a href="#" className="hover:text-gold-accent transition-colors">New</a>
            <button 
              onClick={() => onNavigate?.('heels')}
              className={`hover:text-gold-accent transition-colors cursor-pointer ${currentPage === 'heels' ? 'border-b border-black text-black' : ''}`}
            >
              Heels
            </button>
          </div>

          <div className="flex-shrink-0 text-center">
            <h1 
              id="brand-logo" 
              onClick={() => onNavigate?.('home')}
              className="text-2xl font-serif tracking-[0.4em] uppercase font-light -mr-4 text-[#1A1A1A] cursor-pointer hover:opacity-70 transition-opacity"
            >
              Charles & Keith
            </h1>
          </div>

          <div className="flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-semibold">
            <button id="search-btn" className="text-gray-800 hover:text-gold-accent transition-colors">
              Search
            </button>
            <button 
              id="cart-btn" 
              onClick={() => setIsCartOpen(true)}
              className="text-gray-800 hover:text-gold-accent transition-colors relative flex items-center gap-2"
            >
              Cart <span className="opacity-40">({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-[10px] hidden sm:flex">
              CK
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
