/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PRODUCTS, HEEL_TYPES } from '../constants';
import { HeelSelector } from '../components/HeelSelector';
import { HeelType } from '../types';
import { useStore } from '../context';
import { Check, Shield, Truck, RefreshCw, Star, Heart, Camera, Play } from 'lucide-react';

import { AIScannerModal } from '../components/AIScannerModal';

export function ProductDetail({ productId }: { productId: string }) {
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const [selectedHeel, setSelectedHeel] = useState<HeelType>('stiletto');
  const [selectedSize, setSelectedSize] = useState<number>(38);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const { addToCart, userScanData } = useStore();

  const activeColor = product.colors[selectedColorIndex];
  const activeImage = activeColor.images ? activeColor.images[selectedImageIndex] : activeColor.image;

  const handleHeelSelect = (heel: HeelType) => {
    setSelectedHeel(heel);
    if (activeColor.images) {
      const index = HEEL_TYPES.findIndex(h => h.id === heel);
      if (index !== -1) {
        // User requested: Stiletto(img2), Block(img3), Flat(img4)
        // Which translates to indexes: 1, 2, 3
        setSelectedImageIndex(index + 1);
      }
    }
  };

  const handleThumbnailClick = (i: number) => {
    setSelectedImageIndex(i);
    // Reverse mapping for heel selection
    // If user clicks thumbnail 1-3, update the heel selector
    if (activeColor.images && i >= 1 && i <= 3) {
      const heelId = HEEL_TYPES[i - 1]?.id as HeelType;
      if (heelId) setSelectedHeel(heelId);
    }
  };

  return (
    <div id="product-detail-page" className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-10">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Visuals */}
          <div className="space-y-8">
            <motion.div 
              layoutId={`product-img-${product.id}`}
              className="aspect-[4/5] bg-[#EBE9E6] overflow-hidden relative flex items-center justify-center border border-border-light group"
            >
              <div className="absolute top-10 left-10 z-10">
                <span className="bg-black text-white text-[10px] uppercase tracking-[0.3em] px-3 py-1 font-bold">Signature Series</span>
              </div>
              {activeImage.toLowerCase().endsWith('.mp4') || activeImage.includes('.mp4') ? (
                <video 
                  key={activeImage}
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-contain p-6"
                >
                  <source src={activeImage} type="video/mp4" />
                </video>
              ) : (
                <motion.img 
                  key={`${activeColor.name}-${selectedImageIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={activeImage} 
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105 p-6"
                  referrerPolicy="no-referrer"
                />
              )}
              
              <div className="absolute bottom-8 right-8 flex gap-3">
                <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center text-[10px] bg-white cursor-pointer hover:bg-black hover:text-white transition-all font-bold">360°</div>
                <div className="w-10 h-10 rounded-full border border-black flex items-center justify-center text-[10px] bg-white cursor-pointer hover:bg-black hover:text-white transition-all font-bold">AR</div>
              </div>
            </motion.div>

            <div className="flex gap-4">
              {activeColor.images ? (
                activeColor.images.map((img, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleThumbnailClick(i)}
                    className={`w-20 h-24 bg-[#EBE9E6] border cursor-pointer transition-all ${selectedImageIndex === i ? 'border-black opacity-100 shadow-lg scale-105' : 'border-border-light opacity-60 hover:opacity-100'} overflow-hidden relative p-2`}
                  >
                    <div className="w-full h-full relative">
                      {img.toLowerCase().endsWith('.mp4') || img.includes('.mp4') ? (
                        <div className="w-full h-full bg-black/5 flex items-center justify-center">
                          <Play size={16} className="text-black/20" />
                        </div>
                      ) : (
                        <img src={img} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                      )}
                    </div>
                    <div className="absolute top-1 left-1 text-[7px] font-black uppercase opacity-40">
                      {i === 0 && 'Main'}
                      {i === 1 && 'Stiletto'}
                      {i === 2 && 'Block'}
                      {i === 3 && 'Flat'}
                      {i === 4 && 'Comfort'}
                      {i === 5 && 'Detail'}
                      {i === 6 && '360°'}
                    </div>
                  </div>
                ))
              ) : (
                product.colors.map((color, i) => (
                  <div 
                    key={i} 
                    onClick={() => {
                      setSelectedColorIndex(i);
                      handleThumbnailClick(0);
                    }}
                    className={`w-20 h-24 bg-[#EBE9E6] border cursor-pointer transition-all ${selectedColorIndex === i ? 'border-black opacity-100 shadow-lg scale-105' : 'border-border-light opacity-60 hover:opacity-100'} overflow-hidden relative`}
                  >
                    <img src={color.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full border border-white/40 shadow-sm" style={{ backgroundColor: color.hex }} />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="mb-10 font-sans">
              <div className="mb-2 text-[11px] uppercase tracking-[0.3em] opacity-40 font-bold">Charles & Keith Signature</div>
              <h1 className="serif text-5xl mb-6 font-light leading-tight text-[#1A1A1A] tracking-tight">{product.name.replace('Signature Essential ', '').replace('Elegant ', '').replace('Luxe Shimmer ', '')} <br/><span className="italic">Modular Edition</span></h1>
              
              <div className="flex items-center gap-6 mb-8">
                <span className="text-2xl font-light text-black">RM{product.price}.00</span>
                <div className="h-4 w-[1px] bg-gray-200" />
                <div className="flex items-center text-[10px] gap-1 text-gold-accent">
                  <span className="tracking-widest">★★★★★</span>
                  <span className="text-black opacity-40 ml-1 text-[9px] font-bold uppercase tracking-widest leading-none">(1,248 REVIEWS)</span>
                </div>
              </div>

              {/* Color Selection Swatches */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[11px] uppercase tracking-widest font-bold">Color: <span className="opacity-40 italic">{activeColor.name}</span></span>
                </div>
                <div className="flex gap-3">
                  {product.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedColorIndex(i);
                        setSelectedImageIndex(0);
                      }}
                      className={`w-8 h-8 rounded-full border-2 transition-all relative ${selectedColorIndex === i ? 'border-black scale-110' : 'border-transparent'}`}
                    >
                      <div className="absolute inset-1 rounded-full shadow-inner" style={{ backgroundColor: color.hex }} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <HeelSelector selectedHeel={selectedHeel} onSelect={handleHeelSelect} />

            <div className="mt-12 mb-8 font-sans">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[11px] uppercase tracking-widest font-bold">Select Size <span className="opacity-40 italic text-[9px] ml-2">EU Sizing</span></span>
                <button className="text-[10px] underline tracking-widest opacity-40 uppercase font-black hover:text-black transition-colors">Size Guide</button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {[35, 36, 37, 38, 39, 40].map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-4 text-[11px] font-bold uppercase border transition-all duration-300 relative ${
                      selectedSize === size 
                        ? 'border-black bg-black text-white' 
                        : 'border-border-light bg-white hover:border-black'
                    }`}
                  >
                    {size}
                    {userScanData?.recommendedSize === size && (
                      <div className="absolute -top-1 -right-1 bg-gold-accent text-[7px] text-white px-1 font-black pb-[1px] shadow-sm">AI FIT</div>
                    )}
                  </button>
                ))}
              </div>
              
              <div className="mt-4">
                <button 
                  onClick={() => setIsScannerOpen(true)}
                  className="w-full bg-[#F8F7F5] border border-border-light py-4 px-6 flex items-center justify-between group hover:border-black transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full border border-gold-accent flex items-center justify-center">
                      <Camera size={14} className="text-gold-accent" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold tracking-wide uppercase">AI Foot Scanner</div>
                      <div className="text-[9px] opacity-40 uppercase tracking-widest font-black">Scan for perfect fit confidence</div>
                    </div>
                  </div>
                  <div className="text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Launch Scanner</div>
                </button>
              </div>

              <AIScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} />

              {userScanData && userScanData.recommendedSize === selectedSize && (
                <p className="mt-3 text-[10px] text-gold-accent font-bold uppercase tracking-widest flex items-center gap-2">
                  <Check size={12} className="text-gold-accent" /> Matched to your AI Foot Scan
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 font-sans">
              <button 
                onClick={() => addToCart(product, selectedSize, activeColor.name, selectedHeel)}
                className="w-full bg-[#1A1A1A] text-white py-6 text-[12px] uppercase tracking-[0.4em] font-bold hover:bg-gold-accent transition-all duration-700 shadow-2xl relative overflow-hidden group"
              >
                <span className="relative z-10">Add to Selection</span>
                <div className="absolute inset-0 bg-gold-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
              <div className="flex justify-between items-center px-2 py-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] text-red-600 font-bold tracking-widest uppercase">Almost Sold Out: High Demand</span>
                </div>
                <span className="text-[9px] underline opacity-40 tracking-widest uppercase font-black cursor-pointer hover:opacity-100 transition-opacity">Shipping Details</span>
              </div>
            </div>

            <div className="mt-12 flex gap-10 text-[9px] uppercase tracking-[0.2em] opacity-40 font-bold border-t border-border-light pt-8">
              <div className="flex items-center gap-2 border-b border-transparent hover:border-border-light py-1 cursor-default">Comfort Insole 2.0</div>
              <div className="flex items-center gap-2 border-b border-transparent hover:border-border-light py-1 cursor-default">Anti-Slip Sole</div>
              <div className="flex items-center gap-2 border-b border-transparent hover:border-border-light py-1 cursor-default">Ethical Leather</div>
            </div>
          </div>
        </div>

        {/* Features Tabs */}
        <div className="mt-32">
          <div className="flex border-b border-gray-100 mb-12">
            {['Description', 'Material & Care', 'Shipping'].map((tab, i) => (
              <button key={i} className={`px-8 py-4 text-xs uppercase tracking-widest font-bold ${i === 0 ? 'border-b-2 border-black' : 'text-gray-400'}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-serif mb-6">Designed for Excellence</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                {product.description} Crafted using sustainable methods and the finest materials, each pair is a testament to our commitment to luxury and ethical production.
              </p>
              <div className="space-y-4">
                {product.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-12 rounded-3xl">
              <h4 className="text-xl font-serif mb-6">Heel Heights</h4>
              <ul className="space-y-6">
                {HEEL_TYPES.map(type => (
                  <li key={type.id} className="flex justify-between items-center py-2 border-b border-gray-200/50">
                    <span className="text-sm font-medium uppercase tracking-widest text-gray-600">{type.name}</span>
                    <span className="text-lg font-serif italic">{type.height}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
