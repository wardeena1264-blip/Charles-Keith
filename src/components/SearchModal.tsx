import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { PRODUCTS, HEEL_KITS } from '../constants';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string, id?: string) => void;
}

export function SearchModal({ isOpen, onClose, onNavigate }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const allProducts = [...PRODUCTS, ...HEEL_KITS];
      const filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.material.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6);
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (product: Product) => {
    onNavigate('detail', product.id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed inset-x-4 top-20 md:top-32 max-w-2xl mx-auto bg-white z-[110] rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="p-6 md:p-8 border-b border-gray-100 flex items-center gap-4">
              <Search className="text-gray-400" size={24} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for heels, kits, materials..."
                className="flex-1 bg-transparent border-none outline-none text-xl md:text-2xl font-serif text-[#1A1A1A] placeholder:text-gray-300"
              />
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-400" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4 md:p-6">
              {query.length > 0 ? (
                results.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-4 px-2">Search Results</p>
                    {results.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleSelect(product)}
                        className="w-full flex items-center gap-6 p-4 rounded-2xl hover:bg-gray-50 transition-all group text-left"
                      >
                        <div className="w-20 h-24 bg-[#F8F9FA] rounded-xl flex items-center justify-center overflow-hidden border border-gray-100">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {product.isHeelKit ? (
                              <span className="text-[9px] uppercase tracking-widest font-bold text-gold-accent px-2 py-0.5 bg-gold-accent/10 rounded-full">Heel Kit</span>
                            ) : (
                              <span className="text-[9px] uppercase tracking-widest font-bold text-gray-400">Footwear</span>
                            )}
                          </div>
                          <h3 className="text-sm md:text-base font-bold uppercase tracking-widest mb-1">{product.name}</h3>
                          <p className="text-xs text-gray-400">RM {product.price}</p>
                        </div>
                        <ArrowRight size={20} className="text-gray-200 group-hover:text-black group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center">
                    <Search className="mx-auto text-gray-100 mb-6" size={60} />
                    <p className="text-gray-400 font-serif italic">No results found for "{query}"</p>
                  </div>
                )
              ) : (
                <div className="space-y-10 py-4">
                   <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-6 px-2">Quick Access</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { label: 'Shop All', id: 'catalog', icon: <ShoppingBag size={18} /> },
                        { label: 'Heels', id: 'heels', icon: <Search size={18} /> },
                        { label: 'Heel Kits', id: 'heel-kits', icon: <Sparkles size={18} /> },
                      ].map(item => (
                        <button
                          key={item.id}
                          onClick={() => { onNavigate(item.id); onClose(); }}
                          className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="text-gold-accent">{item.icon}</div>
                          <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-6 px-2">Popular Searches</p>
                    <div className="flex flex-wrap gap-2 px-2">
                      {['Stilettos', 'Interchangeable', 'Sandal', 'Block Heel', 'Nappa Leather', 'Gold Kit'].map(tag => (
                        <button 
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="px-4 py-2 rounded-full border border-gray-100 text-[11px] font-bold uppercase tracking-widest hover:border-black transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
