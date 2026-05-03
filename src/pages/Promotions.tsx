import React from 'react';
import { motion } from 'motion/react';
import { AVAILABLE_VOUCHERS } from '../constants';
import { useStore } from '../context';
import { Ticket, CheckCircle2, ArrowRight, Sparkles, Gift } from 'lucide-react';

export function Promotions() {
  const { claimedVouchers, claimVoucher } = useStore();

  const isClaimed = (id: string) => claimedVouchers.some(v => v.id === id);

  return (
    <div className="pt-24 md:pt-32 pb-20 md:pb-24 min-h-screen bg-[#F8F7F5]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <header className="mb-12 md:mb-16 text-center max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-14 md:w-16 h-14 md:h-16 bg-white flex items-center justify-center rounded-full shadow-sm border border-border-light">
              <Gift className="text-gold-accent" size={28} />
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] md:tracking-[0.4em] text-gold-accent mb-4 block">Exclusive Rewards</span>
          <h1 className="serif text-3xl md:text-5xl mb-6 font-light leading-tight text-[#1A1A1A]">Promotion <br/><span className="italic">Privileges</span></h1>
          <p className="text-gray-500 font-light leading-relaxed text-sm md:text-base">
            Discover tailored offers designed to elevate your shopping experience. Claim your vouchers below and apply them at checkout.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {AVAILABLE_VOUCHERS.map((voucher) => (
            <motion.div
              key={voucher.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-border-light relative overflow-hidden group hover:shadow-xl transition-all duration-500"
            >
              <div className="p-8">
                 <div className="flex justify-between items-start mb-10">
                    <div className="p-3 bg-gold-accent/5 rounded-lg">
                      <Ticket size={24} className="text-gold-accent" />
                    </div>
                    {isClaimed(voucher.id) && (
                      <div className="flex items-center gap-2 text-green-500 text-[10px] font-bold uppercase tracking-widest">
                        <CheckCircle2 size={14} /> Claimed
                      </div>
                    )}
                 </div>

                 <div className="mb-8">
                    <h3 className="text-2xl font-serif mb-2">{voucher.code}</h3>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-4">
                       {voucher.type === 'percentage' ? `${voucher.discount}% OFF` : `RM${voucher.discount} OFF`}
                    </p>
                    <p className="text-sm text-gray-500 font-light leading-relaxed">
                      {voucher.description}
                    </p>
                 </div>

                 <div className="pt-8 border-t border-dashed border-gray-100 mb-8 flex justify-between items-center">
                    <div>
                       <p className="text-[9px] uppercase font-bold tracking-widest text-gray-300">Min. Spend</p>
                       <p className="text-xs font-bold">RM{voucher.minSpend}.00</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[9px] uppercase font-bold tracking-widest text-gray-300">Expires</p>
                       <p className="text-xs font-bold">In 7 Days</p>
                    </div>
                 </div>

                 <button
                   disabled={isClaimed(voucher.id)}
                   onClick={() => claimVoucher(voucher as any)}
                   className={`w-full py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-3 ${
                     isClaimed(voucher.id) 
                       ? 'bg-gray-50 text-gray-300 border border-gray-100 cursor-not-allowed' 
                       : 'bg-[#1A1A1A] text-white hover:bg-gold-accent'
                   }`}
                 >
                   {isClaimed(voucher.id) ? 'Voucher Claimed' : 'Claim Voucher'}
                   {!isClaimed(voucher.id) && <ArrowRight size={14} />}
                 </button>
              </div>
              
              {/* Decorative side cutouts for ticket look */}
              <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-[#F8F7F5] -translate-y-1/2 border-r border-border-light" />
              <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-[#F8F7F5] -translate-y-1/2 border-l border-border-light" />
            </motion.div>
          ))}
        </div>

        <section className="mt-16 md:mt-24 p-8 md:p-12 bg-[#1A1A1A] relative overflow-hidden rounded-2xl md:rounded-3xl">
           <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                 <Sparkles className="text-gold-accent mb-6" size={32} />
                 <h2 className="text-white serif text-3xl md:text-4xl font-light mb-6">Earn More <span className="italic">Points</span></h2>
                 <p className="text-white/60 font-light leading-relaxed mb-8 text-sm md:text-base">
                   Every purchase brings you closer to your next tier. Diamond members enjoy 20% flat discounts and early access to designer collaborations.
                 </p>
                 <button className="w-full md:w-auto bg-white text-black px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gold-accent hover:text-white transition-all duration-500">
                    View Loyalty Status
                 </button>
              </div>
              <div className="hidden md:block">
                 <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: <Sparkles />, title: 'Double Points', desc: 'On Weekend Orders' },
                      { icon: <Gift />, title: 'Birthday Treat', desc: 'Exclusive RM100 Gift' }
                    ].map((card, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm">
                         <div className="text-gold-accent mb-4">{card.icon}</div>
                         <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-2">{card.title}</h4>
                         <p className="text-white/40 text-[10px] leading-relaxed uppercase tracking-wider">{card.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
           
           {/* Background decorative element */}
           <div className="absolute -bottom-20 -right-20 text-white/5 font-serif italic text-[300px] select-none">
              &
           </div>
        </section>
      </div>
    </div>
  );
}
