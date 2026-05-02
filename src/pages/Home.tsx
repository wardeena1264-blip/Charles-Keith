/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { FootScanner } from '../components/FootScanner';
import { PRODUCTS } from '../constants';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, RefreshCw, Heart, Star } from 'lucide-react';

export function Home({ onNavigate }: { onNavigate: (page: string, id?: string) => void }) {
  return (
    <div id="home-page">
      <Hero onNavigate={onNavigate} />

      {/* Categories / Innovations */}
      <section className="py-24 max-w-7xl mx-auto px-10">
        <div className="text-center mb-20">
          <span className="text-[11px] uppercase font-bold tracking-[0.4em] opacity-40 mb-4 block">Our Philosophy</span>
          <h2 className="serif text-5xl font-light mb-4">Crafting the Future of Grace</h2>
          <div className="w-24 h-[1px] bg-gold-accent mx-auto mt-8" />
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            { title: 'Modular Design', desc: 'Transition seamlessly with our patented interchangeable heel system.', icon: <RefreshCw size={24} /> },
            { title: 'Fit Precision', desc: 'Advanced AI foot scanning ensure a perfect fit for ultimate confidence.', icon: <Sparkles size={24} /> },
            { title: 'Pure Comfort', desc: 'Dual-density cushioned insoles and anatomical arch support.', icon: <Heart size={24} /> }
          ].map((item, i) => (
            <div key={i} className="p-12 bg-white border border-border-light text-center group hover:bg-[#1A1A1A] transition-all duration-700">
              <div className="text-gold-accent group-hover:text-white transition-colors flex justify-center mb-8">
                <div className="w-16 h-16 rounded-full border border-gold-accent/20 flex items-center justify-center group-hover:border-white/20">
                  {item.icon}
                </div>
              </div>
              <h3 className="serif text-2xl text-[#1A1A1A] group-hover:text-white transition-colors mb-4 italic">{item.title}</h3>
              <p className="text-gray-500 text-[13px] group-hover:text-white/60 transition-colors leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-32 bg-white border-y border-border-light">
        <div className="max-w-7xl mx-auto px-10">
          <div className="flex justify-between items-end mb-20">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 mb-3 block">Autumn / Winter 2026</span>
              <h2 className="serif text-5xl font-light">The Signature Series</h2>
            </div>
            <button 
              onClick={() => onNavigate('heels')}
              className="text-[11px] font-bold uppercase tracking-[0.2em] border-b-2 border-gold-accent pb-2 hover:opacity-60 transition-all"
            >
              View All Collection
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
            {PRODUCTS.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => onNavigate('detail', product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <FootScanner />

      {/* Social Proof */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-serif font-light mb-16 italic">As Seen On You</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
                  'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80&w=800',
                  'https://images.unsplash.com/photo-1581089778245-3ce67677f718?auto=format&fit=crop&q=80&w=800',
                  'https://images.unsplash.com/photo-1603189343302-e603f7add05a?auto=format&fit=crop&q=80&w=800'
                ].map((src, i) => (
                    <div key={i} className="bg-gray-100 overflow-hidden group">
                        <img 
                            src={src} 
                            className="object-cover transition-transform duration-700 group-hover:scale-110 mx-auto"
                            style={{ width: '243.75px', height: '237.75px' }}
                            referrerPolicy="no-referrer"
                        />
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
