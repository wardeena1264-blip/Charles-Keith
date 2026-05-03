/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { FootScanner } from '../components/FootScanner';
import { PRODUCTS, REVIEWS, HEEL_KITS } from '../constants';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, RefreshCw, Heart, Star, Quote, Settings2 } from 'lucide-react';

export function Home({ onNavigate }: { onNavigate: (page: string, id?: string) => void }) {
  return (
    <div id="home-page">
      <Hero onNavigate={onNavigate} />

      {/* Categories / Innovations */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12 md:mb-20">
          <span className="text-[11px] uppercase font-bold tracking-[0.3em] md:tracking-[0.4em] opacity-40 mb-4 block">Our Philosophy</span>
          <h2 className="serif text-3xl md:text-5xl font-light mb-4">Crafting the Future of Grace</h2>
          <div className="w-20 md:w-24 h-[1px] bg-gold-accent mx-auto mt-6 md:mt-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
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

      {/* Technology Video Section */}
      <section className="py-16 md:py-24 bg-[#F8F7F5]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 md:space-y-8"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] text-gold-accent font-bold">Innovation</span>
              <h2 className="text-3xl md:text-5xl font-serif italic leading-tight">Technology in Motion</h2>
              <p className="text-gray-500 font-light leading-relaxed text-base md:text-lg">
                Witness the revolution in footwear. Our patented Switch-Heel technology allows you to transform your look and height in seconds, without compromising on style or structural integrity.
              </p>
              <ul className="space-y-4">
                {[
                  'Secure locking mechanism',
                  'Instant height transition',
                  'Aerospace-grade materials',
                  'Doctor-designed support'
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-[11px] uppercase tracking-widest font-bold text-gray-700">
                    <div className="w-1.5 h-1.5 bg-gold-accent rounded-full" />
                    {text}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => onNavigate('heels')}
                className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] font-bold group"
              >
                Explore the Tech
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-lg overflow-hidden shadow-2xl border border-white/50"
            >
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
              >
                <source src="https://pashionfootwear.com/cdn/shop/videos/c/vp/695632ba8bee4d2792821a4e96090a2f/695632ba8bee4d2792821a4e96090a2f.HD-1080p-2.5Mbps-78202830.mp4?v=0" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-black/5 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 md:py-32 bg-white border-y border-border-light">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12 md:mb-20">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 mb-3 block">Autumn / Winter 2026</span>
              <h2 className="serif text-3xl md:text-5xl font-light underline-offset-8">The Signature Series</h2>
            </div>
            <button 
              onClick={() => onNavigate('heels')}
              className="text-[11px] font-bold uppercase tracking-[0.2em] border-b-2 border-gold-accent pb-2 hover:opacity-60 transition-all"
            >
              View All Collection
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
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

      {/* Heel Kits Upsell Section */}
      <section className="py-16 bg-[#FBFBFB] overflow-hidden border-y border-border-light">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-10">
            <span className="text-[9px] uppercase font-bold tracking-[0.4em] text-gold-accent mb-3 block">Elevate Your Pair</span>
            <h2 className="serif text-3xl font-light mb-4 leading-tight text-[#1A1A1A]">
              Customize with <span className="italic">Heel Kits</span>
            </h2>
            <p className="text-gray-400 font-light leading-relaxed text-sm max-w-sm mx-auto">
              Switch between stilettos, blocks, and flats in seconds with our interchangeable kits. One pair, endless versions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
             {HEEL_KITS.slice(0, 3).map((item) => (
               <motion.div 
                 key={item.id} 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="group cursor-pointer bg-white p-4 border border-border-light hover:border-gold-accent transition-all duration-300"
                 onClick={() => onNavigate('detail', item.id)}
               >
                  <div className="aspect-square overflow-hidden bg-gray-50 mb-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                    />
                  </div>
                  <div>
                    <p className="text-[8px] text-gold-accent font-bold uppercase tracking-[0.2em] mb-1">{item.heelType}</p>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] group-hover:text-gold-accent transition-colors mb-1 truncate">{item.name}</h4>
                    <p className="text-[10px] text-gray-400 font-medium tracking-wider">RM{item.price}.00</p>
                  </div>
               </motion.div>
             ))}
          </div>

          <div className="flex justify-center">
            <button 
              onClick={() => onNavigate('heel-kits')}
              className="bg-[#1A1A1A] text-white px-10 py-4 text-[9px] font-bold uppercase tracking-[0.3em] hover:bg-gold-accent transition-all duration-300 shadow-md"
            >
              View All Kits
            </button>
          </div>
        </div>
      </section>
      
      {/* Customer Reviews */}
      <section className="py-20 md:py-24 bg-[#F8F7F5]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12 md:mb-20">
            <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-gold-accent mb-4 block">Testimonials</span>
            <h2 className="serif text-3xl md:text-4xl font-light italic text-[#1A1A1A]">What Our Customers Are Saying</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {REVIEWS.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 border border-border-light relative group hover:shadow-xl transition-all duration-500"
              >
                <Quote 
                  size={40} 
                  className="absolute top-6 right-6 text-gold-accent opacity-10 group-hover:opacity-20 transition-opacity" 
                />
                
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={12} className="fill-gold-accent text-gold-accent" />
                  ))}
                </div>

                <p className="text-gray-600 font-light italic leading-relaxed mb-8 text-[15px]">
                  "{review.content}"
                </p>

                <div className="flex items-center gap-4">
                  <img 
                    src={review.avatar} 
                    alt={review.author}
                    className="w-12 h-12 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all"
                  />
                  <div>
                    <h4 className="text-[12px] font-bold uppercase tracking-widest text-[#1A1A1A]">{review.author}</h4>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-serif font-light mb-16 italic">Featured Heels</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  'https://pashionfootwear.com/cdn/shop/files/margot_coal_heel.webp?v=1756954790&width=1365',
                  'https://pashionfootwear.com/cdn/shop/files/Shop_By_Style_31.png?v=1772164591&width=1080',
                  'https://p16-oec-general-useast5.ttcdn-us.com/tos-useast5-i-omjb5zjo8w-tx/184a474b8a35429c978277c0090a51d7~tplv-fhlh96nyum-crop-webp:1350:1800.webp?dr=12190&t=555f072d&ps=933b5bde&shp=8dbd94bf&shcp=948674b7&idc=useast5&from=2378011839',
                  'https://www.reddress.com/cdn/shop/files/10-3-24293982.jpg?v=1728323358'
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
