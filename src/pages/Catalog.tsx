/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, Grid, List as ListIcon, ArrowRight, Star, Heart } from 'lucide-react';
import { PRODUCTS, HEEL_KITS } from '../constants';
import { Product } from '../types';

interface CatalogProps {
  onNavigate: (page: string, id?: string) => void;
}

export function Catalog({ onNavigate }: CatalogProps) {
  const [filter, setFilter] = useState<'all' | 'heels' | 'kits'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const allProducts = useMemo(() => {
    return [...PRODUCTS, ...HEEL_KITS];
  }, []);

  const filteredProducts = useMemo(() => {
    if (filter === 'heels') return PRODUCTS;
    if (filter === 'kits') return HEEL_KITS;
    return allProducts;
  }, [filter, allProducts]);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        {/* Header */}
        <div className="mb-10 md:mb-16 uppercase">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.3em] md:tracking-[0.5em] text-gold-accent mb-4 block"
          >
            The Full Collection
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="serif text-3xl md:text-5xl font-light mb-6 md:mb-8 text-[#1A1A1A]"
          >
            All <span className="italic">Exclusives</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 font-light text-base md:text-lg max-w-2xl leading-relaxed"
          >
            Explore our entire universe of modular footwear. From signature silhouettes to artisanal heel kits, every piece is designed for ultimate versatility.
          </motion.p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 md:mb-12 border-b border-border-light pb-8">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 no-scrollbar">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 md:px-6 py-2 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${filter === 'all' ? 'bg-[#1A1A1A] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              All ({allProducts.length})
            </button>
            <button 
              onClick={() => setFilter('heels')}
              className={`px-4 md:px-6 py-2 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${filter === 'heels' ? 'bg-[#1A1A1A] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              Heels ({PRODUCTS.length})
            </button>
            <button 
              onClick={() => setFilter('kits')}
              className={`px-4 md:px-6 py-2 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${filter === 'kits' ? 'bg-[#1A1A1A] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              Kits ({HEEL_KITS.length})
            </button>
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <div className="flex items-center gap-1 p-1 bg-gray-50 rounded-lg">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-black'}`}
              >
                <Grid size={18} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-black'}`}
              >
                <ListIcon size={18} />
              </button>
            </div>
            <div className="text-[9px] uppercase tracking-widest font-bold text-gray-400 md:hidden">
              Filter By
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div 
            key={filter + viewMode}
            layout
            className={viewMode === 'grid' 
              ? "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-16"
              : "flex flex-col gap-8"
            }
          >
            {filteredProducts.map((product, idx) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={idx}
                viewMode={viewMode}
                onNavigate={onNavigate}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProducts.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-gray-400 font-light">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product, index, viewMode, onNavigate }: { product: Product, index: number, viewMode: 'grid' | 'list', onNavigate: (page: string, id?: string) => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`group cursor-pointer ${viewMode === 'list' ? 'flex gap-10 items-center border-b border-border-light pb-8' : ''}`}
      onClick={() => onNavigate('detail', product.id)}
    >
      <div className={`overflow-hidden bg-[#F9F9F9] relative ${viewMode === 'list' ? 'w-48 h-48' : 'aspect-[3/4] mb-6'}`}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isBestseller && (
            <span className="bg-white px-3 py-1 text-[8px] font-bold uppercase tracking-widest text-[#1A1A1A] shadow-sm">Bestseller</span>
          )}
          {product.isLimited && (
            <span className="bg-gold-accent px-3 py-1 text-[8px] font-bold uppercase tracking-widest text-white shadow-sm">Limited Edition</span>
          )}
        </div>

        <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold-accent hover:text-white">
          <Heart size={14} />
        </button>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
      </div>

      <div className={viewMode === 'list' ? 'flex-grow px-4 md:px-0' : ''}>
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">
              {product.isHeelKit ? `Kit • ${product.heelType}` : 'Interchangeable Heel'}
            </p>
            <h3 className="text-[13px] font-serif font-medium text-[#1A1A1A] group-hover:text-gold-accent transition-colors">
              {product.name}
            </h3>
          </div>
          <div className="text-right">
             <p className="text-[11px] font-bold text-[#1A1A1A]">RM{product.price}.00</p>
             {product.originalPrice && (
               <p className="text-[10px] text-gray-400 line-through">RM{product.originalPrice}.00</p>
             )}
          </div>
        </div>

        {viewMode === 'list' && (
          <p className="text-gray-500 text-sm font-light leading-relaxed max-w-xl mb-6">
            {product.description}
          </p>
        )}

        <div className="flex items-center gap-3 mt-4">
          <div className="flex -space-x-1">
             {product.colors.slice(0, 3).map((color, i) => (
               <div 
                 key={i}
                 className="w-4 h-4 rounded-full border-2 border-white"
                 style={{ backgroundColor: color.hex }}
               />
             ))}
             {product.colors.length > 3 && (
               <div className="w-4 h-4 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[7px] text-gray-500 font-bold">
                 +{product.colors.length - 3}
               </div>
             )}
          </div>
          <div className="h-4 w-[1px] bg-gray-200" />
          <p className="text-[9px] text-gray-400 uppercase tracking-widest">{product.baseColor}</p>
        </div>

        {viewMode === 'list' && (
           <button className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-3 text-gold-accent hover:opacity-75 transition-opacity">
             View Details <ArrowRight size={12} />
           </button>
        )}
      </div>
    </motion.div>
  );
}
