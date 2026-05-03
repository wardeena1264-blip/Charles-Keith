/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, User, Home, Gift, LogOut, ChevronDown, ClipboardList, Sparkles } from 'lucide-react';
import { useStore } from '../context';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { SearchModal } from './SearchModal';

interface HeaderProps {
  onNavigate?: (page: string, id?: string) => void;
  currentPage?: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const { cart, setIsCartOpen } = useStore();
  const { user, profile, signOut } = useAuth();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleAccountClick = () => {
    if (user) {
      setIsAccountOpen(!isAccountOpen);
    } else {
      onNavigate?.('auth');
    }
  };

  const menuLinks = [
    { label: 'Home', id: 'home', icon: <Home size={18} /> },
    { label: 'Shop All', id: 'catalog', icon: <ShoppingBag size={18} /> },
    { label: 'Heels', id: 'heels', icon: <ChevronDown size={18} className="-rotate-90" /> },
    { label: 'Heel Kits', id: 'heel-kits', icon: <Gift size={18} /> },
    { label: 'Promotions', id: 'promotions', icon: <Sparkles size={18} /> },
  ];

  return (
    <>
    <header id="site-header" className="fixed top-0 left-0 right-0 z-50 glass-panel h-16 border-b border-border-light font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-10 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 text-gray-800 hover:text-gold-accent transition-colors"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>

          <div className="flex items-center gap-4 md:gap-8 text-[10px] md:text-[11px] uppercase tracking-[0.1em] md:tracking-[0.2em] font-semibold text-gray-800 hidden lg:flex">
            <button 
              onClick={() => onNavigate?.('home')}
              className={`hover:text-gold-accent transition-colors cursor-pointer flex items-center gap-1.5 ${currentPage === 'home' ? 'text-black' : ''}`}
            >
              <Home size={14} strokeWidth={2.5} />
              <span className="hidden lg:inline">Home</span>
            </button>
            <button 
              onClick={() => onNavigate?.('catalog')}
              className={`hover:text-gold-accent transition-colors cursor-pointer hidden sm:block ${currentPage === 'catalog' ? 'border-b border-black text-black' : ''}`}
            >
              Shop All
            </button>
            <button 
              onClick={() => onNavigate?.('heels')}
              className={`hover:text-gold-accent transition-colors cursor-pointer hidden md:block ${currentPage === 'heels' ? 'border-b border-black text-black' : ''}`}
            >
              Heels
            </button>
            <button 
              onClick={() => onNavigate?.('heel-kits')}
              className={`hover:text-gold-accent transition-colors cursor-pointer hidden lg:block ${currentPage === 'heel-kits' ? 'border-b border-black text-black' : ''}`}
            >
              Heel Kits
            </button>
          </div>

          <h1 
            id="brand-logo" 
            onClick={() => onNavigate?.('home')}
            className="text-lg md:text-2xl font-serif tracking-[0.2em] md:tracking-[0.4em] uppercase font-light text-[#1A1A1A] cursor-pointer hover:opacity-70 transition-opacity absolute left-1/2 -translate-x-1/2 -mr-[0.2em] md:-mr-[0.4em] lg:static lg:translate-x-0 lg:mr-0 w-max whitespace-nowrap"
          >
            Charles & Keith
          </h1>

          <div className="flex items-center gap-4 md:gap-8 text-[10px] md:text-[11px] uppercase tracking-[0.1em] md:tracking-[0.2em] font-semibold">
            <button 
              id="search-btn" 
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-800 hover:text-gold-accent transition-colors hidden lg:block"
            >
              Search
            </button>
            <button 
              id="cart-btn" 
              onClick={() => setIsCartOpen(true)}
              className="text-gray-800 hover:text-gold-accent transition-colors relative flex items-center gap-1.5 hidden lg:flex"
            >
              Cart <span className="opacity-40">({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
            </button>
            <button 
              onClick={() => onNavigate?.('promotions')}
              className={`hover:text-gold-accent transition-colors cursor-pointer flex items-center gap-1.5 hidden md:flex ${currentPage === 'promotions' ? 'text-black' : ''}`}
            >
              <Gift size={14} strokeWidth={2.5} />
              <span className="hidden sm:inline">Promotions</span>
            </button>
            
            <div className="relative">
              <button 
                onClick={handleAccountClick}
                className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white text-[10px] cursor-pointer hover:bg-gray-900 transition-colors relative"
              >
                {user ? (
                  profile?.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()
                ) : (
                  <User size={16} />
                )}
                {user && <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>}
              </button>

              <AnimatePresence>
                {isAccountOpen && user && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-64 bg-white shadow-2xl border border-gray-100 py-4 z-50 rounded-2xl"
                  >
                    <div className="px-6 py-4 border-b border-gray-50">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Authenticated as</p>
                      <p className="text-[12px] font-bold truncate">{profile?.displayName || user.email}</p>
                    </div>
                    <div className="py-2">
                       <button 
                         onClick={() => { onNavigate?.('account'); setIsAccountOpen(false); }}
                         className="w-full flex items-center gap-4 px-6 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors"
                       >
                         <ClipboardList size={16} /> My Dashboard
                       </button>
                       <button 
                         onClick={() => { onNavigate?.('account'); setIsAccountOpen(false); }}
                         className="w-full flex items-center gap-4 px-6 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors"
                       >
                         <ShoppingBag size={16} /> Order History
                       </button>
                    </div>
                    <div className="pt-2 border-t border-gray-50">
                       <button 
                         onClick={async () => { await signOut(); onNavigate?.('home'); setIsAccountOpen(false); }}
                         className="w-full flex items-center gap-4 px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-colors"
                       >
                         <LogOut size={16} /> Sign Out
                       </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>

      {/* Mobile Navigation Pane */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            
            {/* Menu Pane */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white z-[70] shadow-2xl flex flex-col pt-20"
            >
              <div className="px-8 mb-10">
                <h2 className="text-2xl font-serif uppercase tracking-[0.2em] mb-2">Navigation</h2>
                <div className="w-12 h-0.5 bg-gold-accent" />
              </div>

              <nav className="flex-1 px-4 overflow-y-auto">
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setIsSearchOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-6 px-6 py-5 rounded-2xl transition-all text-gray-800 hover:bg-gray-50 mb-2"
                  >
                    <div className="text-gold-accent">
                      <Search size={18} />
                    </div>
                    <span className="text-[13px] font-bold uppercase tracking-[0.2em]">
                      Search
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setIsCartOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-6 px-6 py-5 rounded-2xl transition-all text-gray-800 hover:bg-gray-50 mb-6"
                  >
                    <div className="text-gold-accent">
                      <ShoppingBag size={18} />
                    </div>
                    <div className="flex justify-between items-center flex-1">
                      <span className="text-[13px] font-bold uppercase tracking-[0.2em]">
                        View Cart
                      </span>
                      <span className="text-[10px] font-bold bg-gold-accent/10 text-gold-accent px-3 py-1 rounded-full uppercase tracking-widest">
                        {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
                      </span>
                    </div>
                  </button>

                  <div className="h-[1px] bg-gray-50 mx-6 mb-6" />

                  {menuLinks.map((link) => (
                    <motion.button
                      key={link.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={() => {
                        onNavigate?.(link.id as any);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-6 px-6 py-5 rounded-2xl transition-all ${
                        currentPage === link.id 
                          ? 'bg-black text-white shadow-xl' 
                          : 'text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      <div className={currentPage === link.id ? 'text-white' : 'text-gold-accent'}>
                        {link.icon}
                      </div>
                      <span className="text-[13px] font-bold uppercase tracking-[0.2em]">
                        {link.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </nav>

              <div className="p-8 border-t border-gray-50 mt-auto">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white text-xs">
                    {user ? (profile?.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()) : <User size={20} />}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest">
                      {user ? profile?.displayName || 'My Profile' : 'Guest User'}
                    </p>
                    <p className="text-[9px] uppercase tracking-widest text-gray-400 mt-0.5">
                      {user ? 'C&K Member' : 'Sign in for rewards'}
                    </p>
                  </div>
                </div>
                {!user ? (
                  <button 
                    onClick={() => { onNavigate?.('auth'); setIsMobileMenuOpen(false); }}
                    className="w-full bg-black text-white py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em]"
                  >
                    Login / Sign Up
                  </button>
                ) : (
                  <button 
                    onClick={() => { onNavigate?.('account'); setIsMobileMenuOpen(false); }}
                    className="w-full border border-black py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em]"
                  >
                    View Account
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onNavigate={onNavigate || (() => {})} 
      />
    </>
  );
}
