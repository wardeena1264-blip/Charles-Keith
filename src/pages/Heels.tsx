/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';

interface HeelsProps {
  onNavigate: (page: string, id?: string) => void;
}

export function Heels({ onNavigate }: HeelsProps) {
  return (
    <div id="heels-page" className="pt-20 pb-24">
      {/* Category Header Hero */}
      <section className="relative min-h-[50vh] flex items-start overflow-hidden bg-white mb-20 pt-0">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://framerusercontent.com/images/UhwKweoUPKdqwFzDWgq297LFTRI.jpg?width=1600&height=900"
            className="w-full h-full object-cover scale-105 opacity-40"
            alt="The High Heels Collection"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 w-full py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[1px] bg-gold-accent" />
              <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-gold-accent">Collection</span>
            </div>
            <h1 className="serif text-4xl md:text-7xl mb-8 leading-tight text-[#1A1A1A]">Elevated <br/><span className="italic">Sophistication</span></h1>
            <p className="text-gray-500 font-light leading-relaxed mb-10 text-base md:text-xl">
              Discover the perfect fusion of timeless elegance and modern versatility. Our collection features innovative interchangeable heel technology for unmatched comfort and style.
            </p>
            <div className="flex items-center gap-6">
               <button 
                onClick={() => document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#1A1A1A] text-white px-10 md:px-12 py-4 md:py-5 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-gold-accent transition-all duration-500 flex items-center gap-4 shadow-2xl"
               >
                 Shop The Series <ArrowRight size={14} />
               </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="px-4 md:px-10 mb-12 border-y border-border-light py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest font-bold text-gray-500">
          <div className="flex gap-6 md:gap-8 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
            <span className="text-black whitespace-nowrap">All Styles</span>
            <span className="hover:text-black cursor-pointer whitespace-nowrap">Stiletto</span>
            <span className="hover:text-black cursor-pointer whitespace-nowrap">Block</span>
            <span className="hover:text-black cursor-pointer whitespace-nowrap">Sandal</span>
          </div>
          <div className="w-full sm:w-auto text-right">
            <span className="cursor-pointer">Sort By: Featured</span>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section id="product-grid" className="px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {PRODUCTS.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard 
                  product={product} 
                  onClick={() => onNavigate('detail', product.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <div className="mt-20 text-center">
        <button className="px-12 py-4 border border-black text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black hover:text-white transition-all">
          Load More
        </button>
      </div>
    </div>
  );
}
