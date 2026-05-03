/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PRODUCTS, HEEL_TYPES, HEEL_KITS } from '../constants';
import { HeelSelector } from '../components/HeelSelector';
import { HeelType, Product } from '../types';
import { useStore } from '../context';
import { Check, Shield, Truck, RefreshCw, Star, Heart, Camera, Play, Settings2, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';

import { AIScannerModal } from '../components/AIScannerModal';

export function ProductDetail({ productId, onNavigate }: { productId: string; onNavigate?: (page: string, id?: string) => void }) {
  const product: Product = [...PRODUCTS, ...HEEL_KITS].find(p => p.id === productId) || PRODUCTS[0];
  const [selectedHeel, setSelectedHeel] = useState<HeelType>('stiletto');
  const [selectedSize, setSelectedSize] = useState<number>(38);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const { addToCart, userScanData } = useStore();

  const activeColor = product.colors[selectedColorIndex];
  const activeImages = activeColor.images || [activeColor.image];
  const activeImage = activeImages[selectedImageIndex];

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % activeImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length);
  };

  const currentPrice = product.heelPrices ? product.heelPrices[selectedHeel] : product.price;

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
    <div id="product-detail-page" className="pt-24 md:pt-32 pb-20 md:pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20">
          {/* Visuals */}
          <div className="space-y-8">
            <motion.div 
              layoutId={`product-img-${product.id}`}
              className="aspect-[4/5] bg-[#EBE9E6] overflow-hidden relative flex items-center justify-center border border-border-light group"
            >
              <div className="absolute top-10 left-10 z-10">
                <span className="bg-black text-white text-[10px] uppercase tracking-[0.3em] px-3 py-1 font-bold">Signature Series</span>
              </div>
              {activeImage && (activeImage.toLowerCase().endsWith('.mp4') || activeImage.includes('.mp4')) ? (
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
              
              {activeImages.length > 1 && (
                <>
                  <button 
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-black shadow-lg hover:bg-black hover:text-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-black shadow-lg hover:bg-black hover:text-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight size={20} />
                  </button>
                  
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                    {activeImages.map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-1.5 h-1.5 rounded-full transition-all ${selectedImageIndex === i ? 'bg-black w-4' : 'bg-black/20'}`}
                      />
                    ))}
                  </div>
                </>
              )}
              

            </motion.div>

            <div className="flex gap-2 md:gap-4 overflow-x-auto pb-4 md:pb-0 no-scrollbar">
              {activeColor.images ? (
                activeColor.images.map((img, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleThumbnailClick(i)}
                    className={`w-20 h-24 bg-[#EBE9E6] border cursor-pointer transition-all ${selectedImageIndex === i ? 'border-black opacity-100 shadow-lg scale-105' : 'border-border-light opacity-60 hover:opacity-100'} overflow-hidden relative p-2`}
                  >
                    <div className="w-full h-full relative">
                      {img && (img.toLowerCase().endsWith('.mp4') || img.includes('.mp4')) ? (
                        <div className="w-full h-full bg-black/5 flex items-center justify-center">
                          <Play size={16} className="text-black/20" />
                        </div>
                      ) : (
                        <img src={img} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                      )}
                    </div>
                    {!product.isHeelKit && (
                      <div className="absolute top-1 left-1 text-[7px] font-black uppercase opacity-40">
                        {i === 0 && 'Main'}
                        {i === 1 && 'Stiletto'}
                        {i === 2 && 'Block'}
                        {i === 3 && 'Flat'}
                        {i === 4 && 'Comfort'}
                        {i === 5 && 'Detail'}
                        {i === 6 && '360°'}
                      </div>
                    )}
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
            <div className="mb-8 md:mb-10 font-sans">
              <div className="mb-2 text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] opacity-40 font-bold">Charles & Keith Signature</div>
              <h1 className="serif text-3xl md:text-5xl mb-6 font-light leading-tight text-[#1A1A1A] tracking-tight">{product.name.replace('Signature Essential ', '').replace('Elegant ', '').replace('Luxe Shimmer ', '')}</h1>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    {product.originalPrice && (
                      <span className="text-xs md:text-sm line-through text-gray-300 tracking-widest font-bold">RM{product.originalPrice}.00</span>
                    )}
                    <span className="text-2xl md:text-3xl font-light text-black">RM{currentPrice}.00</span>
                  </div>
                  <div className="h-10 w-[1px] bg-gray-200 hidden sm:block" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center text-[10px] gap-1 text-gold-accent">
                    <span className="tracking-widest">★★★★★</span>
                    <span className="text-black opacity-40 ml-1 text-[9px] font-bold uppercase tracking-widest leading-none">(1,248 REVIEWS)</span>
                  </div>
                  {product.isHeelKit && (
                    <div className="flex items-center gap-2 text-gold-accent text-[9px] font-bold uppercase tracking-[0.2em]">
                      <Settings2 size={12} />
                      Component: Modular Accessorie
                    </div>
                  )}
                  {product.stockCount && product.stockCount < 10 && (
                    <div className="flex items-center gap-2 text-[#E74C3C] text-[10px] font-bold uppercase tracking-[0.2em]">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                      Only {product.stockCount} left in your size!
                    </div>
                  )}
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

            {!product.isHeelKit && <HeelSelector selectedHeel={selectedHeel} onSelect={handleHeelSelect} />}

            {product.isHeelKit && (
              <div className="mt-8 mb-12 p-8 bg-gold-accent/5 border border-gold-accent/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-gold-accent flex items-center justify-center text-white">
                    <Check size={16} />
                  </div>
                  <h4 className="text-[12px] font-bold uppercase tracking-widest text-[#1A1A1A]">Compatibility Guaranteed</h4>
                </div>
                <p className="text-[11px] text-gray-500 font-light leading-relaxed mb-6 uppercase tracking-wider">
                  This modular kit is engineered for full compatibility with all shoes in the Signature and Luxe collection series.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-black/60">
                    <div className="w-1.5 h-1.5 bg-gold-accent rounded-full" />
                    Signature Sandal
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-black/60">
                    <div className="w-1.5 h-1.5 bg-gold-accent rounded-full" />
                    Midnight Pump
                  </div>
                </div>
              </div>
            )}

            {!product.isHeelKit && (
              <div className="mt-12 mb-8 font-sans">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[11px] uppercase tracking-widest font-bold">Select Size <span className="opacity-40 italic text-[9px] ml-2">EU Sizing</span></span>
                  <button className="text-[10px] underline tracking-widest opacity-40 uppercase font-black hover:text-black transition-colors">Size Guide</button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
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
            )}

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
        <div className="mt-16 md:mt-32">
          <div className="flex border-b border-gray-100 mb-8 md:mb-12 overflow-x-auto no-scrollbar">
            {['Description', 'Material & Care', 'Shipping'].map((tab, i) => (
              <button key={i} className={`px-6 md:px-8 py-4 text-[10px] md:text-xs uppercase tracking-widest font-bold whitespace-nowrap ${i === 0 ? 'border-b-2 border-black' : 'text-gray-400'}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <h3 className="text-2xl font-serif mb-6">{product.isHeelKit ? 'Modular Engineering' : 'Designed for Excellence'}</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                {product.description} {product.isHeelKit ? 'Engineered for seamless swaps, this component ensures structural stability at any height.' : 'Crafted using sustainable methods and the finest materials, each pair is a testament to our commitment to luxury and ethical production.'}
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
            {!product.isHeelKit ? (
              <div className="bg-gray-50 p-12 rounded-3xl">
                <h4 className="text-xl font-serif mb-6">Signature Comfort</h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Our advanced orthopedic design ensures that whether you choose a stiletto or a flat height, your arch remains perfectly supported.
                </p>
                <div className="grid grid-cols-2 gap-4">
                   <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-black/60">
                      <div className="w-1 h-1 bg-gold-accent rounded-full" />
                      Dual-Density Foam
                   </div>
                   <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-black/60">
                      <div className="w-1 h-1 bg-gold-accent rounded-full" />
                      Impact Neutralization
                   </div>
                </div>
              </div>
            ) : (
                <div className="bg-[#1A1A1A] text-white p-12 rounded-3xl relative overflow-hidden">
                   <div className="relative z-10">
                      <Sparkles size={32} className="text-gold-accent mb-6" />
                      <h4 className="text-xl font-serif mb-6 italic">Patented Easy-Lock</h4>
                      <p className="text-white/60 text-sm leading-relaxed mb-8">
                        Our aviation-grade titanium mechanism guarantees a secure fit. Switch from heels to flats in under 10 seconds with absolute confidence.
                      </p>
                      <button className="text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-4 text-gold-accent">
                        View Demo Video <ArrowRight size={14} />
                      </button>
                   </div>
                   <div className="absolute top-0 right-0 p-8 opacity-10">
                      <Settings2 size={120} />
                   </div>
                </div>
            )}
          </div>
        </div>

        {/* Cross-Sell Section */}
        {!product.isHeelKit && (
          <div id="modular-extensions-cross-sell" className="mt-32 pt-24 border-t border-border-light">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-gold-accent mb-4 block">Complete the look</span>
                <h2 className="serif text-5xl font-light italic text-[#1A1A1A]">Modular Extensions</h2>
              </div>
              <button 
                id="view-all-kits-btn"
                onClick={() => onNavigate?.('heel-kits')}
                className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gold-accent hover:border-gold-accent transition-colors"
              >
                View Selection
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {HEEL_KITS.map((kit) => (
                 <ProductCard 
                   key={kit.id}
                   product={kit}
                   onClick={() => onNavigate?.('detail', kit.id)}
                 />
               ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
