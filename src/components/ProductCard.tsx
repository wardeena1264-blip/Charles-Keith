/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { addToCart } = useStore();
  const [imageIndex, setImageIndex] = useState(0);

  const images = product.colors[0].images || [product.image];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div 
      id={`product-${product.id}`}
      whileHover={{ y: -10 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#EBE9E6] mb-8 border border-border-light">
        <AnimatePresence mode="wait">
          <motion.img 
            key={imageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            src={images[imageIndex]} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-black shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-black shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight size={16} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1">
              {images.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1 h-1 rounded-full transition-all ${imageIndex === i ? 'bg-black w-3' : 'bg-black/20'}`}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Quick Add Button */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 w-[80%]">
          <button 
            id={`add-to-cart-${product.id}`}
            onClick={(e) => { 
              e.stopPropagation(); 
              addToCart(product, 38, product.colors[0].name, 'stiletto'); 
            }}
            className="w-full bg-white text-black py-4 text-[10px] uppercase tracking-[0.2em] font-bold shadow-2xl hover:bg-black hover:text-white transition-all"
          >
            Quick Add
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
          {product.isBestseller && (
            <div className="bg-black text-white px-3 py-1.5 text-[8px] uppercase tracking-[0.2em] font-bold shadow-lg">
              Bestseller
            </div>
          )}
          {product.isLimited && (
            <div className="bg-gold-accent text-white px-3 py-1.5 text-[8px] uppercase tracking-[0.2em] font-bold shadow-lg">
              Limited Edition
            </div>
          )}
          {product.originalPrice && (
            <div className="bg-[#E74C3C] text-white px-3 py-1.5 text-[8px] uppercase tracking-[0.2em] font-bold shadow-lg">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}% Sale
            </div>
          )}
        </div>
      </div>

      <div className="text-center px-4">
        <h3 className="serif text-xl font-light text-[#1A1A1A] mb-2 tracking-tight group-hover:text-gold-accent transition-colors italic">{product.name.replace('Signature Essential ', '').replace('Elegant ', '').replace('Luxe Shimmer ', '')}</h3>
        <p className="text-[10px] text-gray-400 mb-3 uppercase tracking-[0.2em] font-bold">{product.material}</p>
        <div className="w-8 h-[1px] bg-gold-accent mx-auto mb-3 opacity-40" />
        <div className="flex flex-col items-center gap-1">
          {product.originalPrice && (
            <span className="text-[10px] line-through text-gray-300 tracking-widest font-bold uppercase">RM{product.originalPrice}</span>
          )}
          <p className="text-sm font-light text-gray-900">RM{product.price}.00</p>
        </div>
      </div>
    </motion.div>
  );
}
