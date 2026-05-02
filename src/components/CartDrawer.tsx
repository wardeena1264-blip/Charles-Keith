/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../context';

export function CartDrawer({ onCheckout }: { onCheckout: () => void }) {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useStore();

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-border-light flex justify-between items-center bg-white">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-gold-accent" />
                <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold">Your Selection</h3>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:rotate-90 transition-transform text-gray-400 hover:text-black"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#F8F7F5]/50">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-border-light">
                    <ShoppingBag size={24} className="text-gray-300" />
                  </div>
                  <p className="text-[11px] uppercase tracking-widest text-gray-400 font-bold">Your cart is currently empty</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 text-[10px] uppercase tracking-widest font-bold border-b border-black pb-1"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.cartId} className="flex gap-4 group">
                    <div className="w-24 aspect-[3/4] bg-[#EBE9E6] flex-shrink-0 overflow-hidden border border-border-light">
                      <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-[12px] font-bold uppercase tracking-tight leading-tight pr-4">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.cartId)}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium mb-2">
                          {item.selectedColor} • Size {item.selectedSize} • {item.selectedHeel}
                        </p>
                        <p className="text-sm font-serif italic">RM{item.price}</p>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-border-light rounded-full px-2 py-1 bg-white">
                          <button onClick={() => updateQuantity(item.cartId, -1)} className="p-1 hover:text-gold-accent transition-colors">
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-bold w-8 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.cartId, 1)} className="p-1 hover:text-gold-accent transition-colors">
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-[12px] font-bold">RM{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 border-t border-border-light bg-white">
                <div className="flex justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-widest opacity-60 font-medium">Subtotal</span>
                  <span className="text-lg font-serif italic">RM{subtotal}.00</span>
                </div>
                <div className="flex justify-between mb-8">
                  <span className="text-[11px] uppercase tracking-widest opacity-60 font-medium">Shipping</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-green-600">Free</span>
                </div>

                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    onCheckout();
                  }}
                  className="w-full bg-black text-white py-5 text-[12px] uppercase tracking-[0.3em] font-bold hover:bg-gold-accent transition-all duration-500 shadow-xl"
                >
                  Proceed to Secure Checkout
                </button>
                <p className="mt-4 text-[9px] text-center text-gray-400 uppercase tracking-widest font-medium">
                  Taxes calculated at next step • 30-day easy returns
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
