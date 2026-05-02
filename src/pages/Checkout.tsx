/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ShieldCheck, CreditCard, Truck, ChevronLeft, ArrowRight } from 'lucide-react';
import { useStore } from '../context';

export function Checkout({ onBack }: { onBack: () => void }) {
  const { cart, clearCart } = useStore();
  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal; // Free shipping

  const handleComplete = () => {
    setStep('success');
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md p-10 glass-panel rounded-3xl"
        >
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="serif text-4xl mb-4 italic">Thank You for <br/>Your Purchase</h2>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed font-light">
            Your order #CK-928RM{Math.floor(Math.random() * 1000)} has been confirmed and is being prepared for shipment.
          </p>
          <button 
            onClick={onBack}
            className="w-full bg-black text-white py-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-gold-accent transition-colors"
          >
            Continue Exploring
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-10">
      <div className="flex items-center gap-2 mb-12">
        <button onClick={onBack} className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold hover:text-gold-accent transition-colors">
          <ChevronLeft size={16} />
          Back to Selection
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-20">
        {/* Main Flow */}
        <div className="lg:col-span-7 space-y-12">
          {/* Progress Marks */}
          <div className="flex gap-8 items-center border-b border-border-light pb-8">
            <div className={`flex items-center gap-3 ${step === 'info' ? 'text-black' : 'text-gray-300'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step === 'info' ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}>1</div>
              <span className="text-[11px] uppercase tracking-widest font-bold">Shipping Info</span>
            </div>
            <div className="w-12 h-[1px] bg-gray-100" />
            <div className={`flex items-center gap-3 ${step === 'payment' ? 'text-black' : 'text-gray-300'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step === 'payment' ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
              <span className="text-[11px] uppercase tracking-widest font-bold">Secure Payment</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 'info' ? (
              <motion.div
                key="info"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">First Name</label>
                    <input type="text" className="w-full bg-white border border-border-light p-4 text-sm outline-none focus:border-black transition-colors" placeholder="Emma" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Last Name</label>
                    <input type="text" className="w-full bg-white border border-border-light p-4 text-sm outline-none focus:border-black transition-colors" placeholder="Waterson" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Shipping Address</label>
                  <input type="text" className="w-full bg-white border border-border-light p-4 text-sm outline-none focus:border-black transition-colors" placeholder="123 Luxury Lane, Fashion District" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">City</label>
                    <input type="text" className="w-full bg-white border border-border-light p-4 text-sm outline-none focus:border-black transition-colors" placeholder="New York" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Zip Code</label>
                    <input type="text" className="w-full bg-white border border-border-light p-4 text-sm outline-none focus:border-black transition-colors" placeholder="10001" />
                  </div>
                </div>

                <div className="pt-8 flex flex-col gap-4">
                  <div className="bg-green-50/50 border border-green-100 p-6 flex gap-4 items-center rounded-2xl">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-600 shadow-sm">
                      <Truck size={20} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold tracking-wide uppercase">Signature White-Glove Delivery</p>
                      <p className="text-[10px] text-green-600/70 font-semibold uppercase tracking-widest">Complimentary for Signature Collection</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setStep('payment')}
                    className="w-full bg-[#1A1A1A] text-white py-5 text-[12px] uppercase tracking-[0.3em] font-bold hover:bg-gold-accent transition-all flex items-center justify-center gap-4 group"
                  >
                    Next: Secure Payment
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="bg-white border border-border-light p-10 space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-5">
                    <CreditCard size={120} />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Card Number</label>
                    <div className="relative">
                      <input type="text" className="w-full bg-[#F8F7F5] border border-border-light p-4 text-sm outline-none focus:border-black transition-colors" placeholder="•••• •••• •••• ••••" />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                        <div className="w-10 h-6 bg-gray-200 rounded opacity-20" />
                        <div className="w-10 h-6 bg-gray-200 rounded opacity-20" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">Expiry Date</label>
                      <input type="text" className="w-full bg-[#F8F7F5] border border-border-light p-4 text-sm outline-none focus:border-black transition-colors" placeholder="MM / YY" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-40">CVV</label>
                      <input type="text" className="w-full bg-[#F8F7F5] border border-border-light p-4 text-sm outline-none focus:border-black transition-colors" placeholder="•••" />
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-3 text-[10px] font-bold text-green-600 uppercase tracking-widest">
                    <ShieldCheck size={16} />
                    256-bit Bank-Level Encryption Guaranteed
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <button 
                    onClick={handleComplete}
                    className="w-full bg-[#C5A059] text-white py-5 text-[12px] uppercase tracking-[0.3em] font-bold hover:bg-black transition-all shadow-xl"
                  >
                    Complete Luxury Secure Payment
                  </button>
                  <button onClick={() => setStep('info')} className="text-[10px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100 transition-opacity">
                    Return to Shipping
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-5">
          <div className="glass-panel border-border-light p-10 rounded-3xl sticky top-32">
            <h3 className="serif text-2xl mb-8 border-b border-border-light pb-6 italic">Order Summary</h3>
            
            <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.cartId} className="flex gap-4">
                  <div className="w-16 aspect-[3/4] bg-[#EBE9E6] flex-shrink-0 border border-border-light overflow-hidden">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11px] font-bold uppercase truncate pr-2">{item.name}</h4>
                    <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold mt-1">Size {item.selectedSize} • {item.selectedHeel} • x{item.quantity}</p>
                    <p className="text-sm font-serif italic mt-1 leading-none">RM{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-border-light pt-8">
              <div className="flex justify-between items-center">
                <span className="text-[11px] uppercase tracking-widest font-bold opacity-40">Subtotal</span>
                <span className="text-md font-serif italic">RM{subtotal}.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] uppercase tracking-widest font-bold opacity-40">Express Shipping</span>
                <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Free</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-border-light">
                <span className="text-[12px] uppercase tracking-[0.2em] font-black">Total Due</span>
                <span className="text-2xl font-serif italic text-gold-accent">RM{total}.00</span>
              </div>
            </div>

            <div className="mt-10 mb-2 border-l border-gold-accent pl-4 text-[10px] text-gray-400 leading-relaxed uppercase tracking-tight">
              Safe & Secure Checkout • Free 30-Day Returns • Authentic Charles & Keith Quality
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
