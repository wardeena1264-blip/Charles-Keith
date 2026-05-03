/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, ShoppingBag, Trash2, Truck, Sparkles, Gift } from 'lucide-react';
import { useStore } from '../context';

export function CartDrawer({ onCheckout }: { onCheckout: () => void }) {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useStore();

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeShippingThreshold = 200;
  const shippingLeft = freeShippingThreshold - subtotal;
  const progressPercent = Math.min((subtotal / freeShippingThreshold) * 100, 100);

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

            {/* Free Shipping Progress */}
            <div className="px-6 py-4 bg-[#F8F7F5] border-b border-border-light">
              <div className="flex justify-between items-center mb-2">
                <p className="text-[9px] uppercase font-bold tracking-[0.25em]">
                  {subtotal >= freeShippingThreshold 
                    ? "You've unlocked FREE SHIPPING!" 
                    : `Only RM${shippingLeft.toFixed(0)} away from free shipping`}
                </p>
                <Truck size={14} className={subtotal >= freeShippingThreshold ? 'text-green-500' : 'text-gold-accent'} />
              </div>
              <div className="h-[2px] w-full bg-gray-200">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  className={`h-full transition-all duration-1000 ${subtotal >= freeShippingThreshold ? 'bg-green-500' : 'bg-gold-accent'}`}
                />
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#F8F7F5]/30">
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
                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex justify-between items-center bg-gold-accent/5 p-4 border border-gold-accent/10">
                    <div className="flex items-center gap-2 text-gold-accent">
                      <Sparkles size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Points Earned</span>
                    </div>
                    <span className="text-sm font-bold text-black">{Math.floor(subtotal)} Points</span>
                  </div>

                  <div className="flex justify-between text-[11px] uppercase tracking-widest opacity-60 font-medium">
                    <span>Subtotal</span>
                    <span>RM{subtotal}.00</span>
                  </div>
                  <div className="flex justify-between text-[11px] uppercase tracking-widest opacity-60 font-medium">
                    <span>Shipping</span>
                    <span className={subtotal >= freeShippingThreshold ? 'text-green-600 font-bold' : ''}>
                      {subtotal >= freeShippingThreshold ? 'FREE' : 'RM15.00'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-black pt-4 border-t border-border-light">
                    <span className="text-xs uppercase tracking-[0.3em]">Total Value</span>
                    <span className="text-xl font-serif italic">RM{subtotal >= freeShippingThreshold ? subtotal : subtotal + 15}.00</span>
                  </div>
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
