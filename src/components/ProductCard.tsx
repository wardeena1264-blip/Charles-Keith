/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { addToCart } = useStore();

  return (
    <motion.div 
      id={`product-${product.id}`}
      whileHover={{ y: -10 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#EBE9E6] mb-8 border border-border-light">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
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

        {/* Badge */}
        {product.id === '1' && (
          <div className="absolute top-10 left-10 bg-black text-white px-3 py-1 text-[9px] uppercase tracking-[0.2em] font-bold">
            Bestseller
          </div>
        )}
      </div>

      <div className="text-center px-4">
        <h3 className="serif text-xl font-light text-[#1A1A1A] mb-2 tracking-tight group-hover:text-gold-accent transition-colors italic">{product.name.replace('Signature Essential ', '').replace('Elegant ', '').replace('Luxe Shimmer ', '')}</h3>
        <p className="text-[10px] text-gray-400 mb-3 uppercase tracking-[0.2em] font-bold">{product.material}</p>
        <div className="w-8 h-[1px] bg-gold-accent mx-auto mb-3 opacity-40" />
        <p className="text-sm font-light text-gray-900">RM{product.price}.00</p>
      </div>
    </motion.div>
  );
}
