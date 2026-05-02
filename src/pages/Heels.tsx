/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';

interface HeelsProps {
  onNavigate: (page: string, id?: string) => void;
}

export function Heels({ onNavigate }: HeelsProps) {
  return (
    <div id="heels-page" className="pt-32 pb-24">
      {/* Category Header */}
      <section className="px-10 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold mb-4 block">Collection</span>
          <h1 className="text-5xl font-serif italic mb-6">The High Heels</h1>
          <div className="w-12 h-[1px] bg-black mx-auto mb-6"></div>
          <p className="text-gray-500 font-light leading-relaxed">
            Discover the perfect fusion of timeless elegance and modern versatility. Our collection features innovative interchangeable heel technology for unmatched comfort.
          </p>
        </motion.div>
      </section>

      {/* Filter Bar Placeholder */}
      <section className="px-10 mb-12 border-y border-border-light py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-gray-500">
          <div className="flex gap-8">
            <span className="text-black">All Styles</span>
            <span className="hover:text-black cursor-pointer">Stiletto</span>
            <span className="hover:text-black cursor-pointer">Block</span>
            <span className="hover:text-black cursor-pointer">Sandal</span>
          </div>
          <div>
            <span className="cursor-pointer">Sort By: Featured</span>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-10">
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

      {/* Load More Placeholder */}
      <div className="mt-20 text-center">
        <button className="px-12 py-4 border border-black text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black hover:text-white transition-all">
          Load More
        </button>
      </div>
    </div>
  );
}
