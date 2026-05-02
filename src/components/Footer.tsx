/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer id="site-footer" className="bg-white border-t border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h1 className="text-xl font-serif tracking-[0.2em] uppercase font-light">Charles & Keith</h1>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Pioneering the future of fashion with revolutionary interchangeable heel technology and AI-driven personalized fit experiences.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Collections</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-black transition-colors">Signature Heels</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Bridal Collection</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Evening Classics</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Limited Editions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-black transition-colors">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-black transition-colors">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Newsletter</h4>
            <p className="text-sm text-gray-500 mb-6">Join the signature circle for exclusive access to new arrivals and AI-styling tips.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-gray-50 border-none rounded-lg px-4 py-2 text-sm flex-1 outline-none focus:ring-1 focus:ring-black"
              />
              <button className="bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition-colors">
                <Mail size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-gray-400 uppercase tracking-widest font-medium">
          <p>© 2026 CHARLES & KEITH. SIGNATURE COLLECTION PREVIEW.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-black">Privacy Policy</a>
            <a href="#" className="hover:text-black">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
