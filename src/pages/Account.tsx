import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc, orderBy } from 'firebase/firestore';
import { motion } from 'motion/react';
import { 
  ShoppingBag, 
  User, 
  MapPin, 
  CreditCard, 
  LogOut, 
  Settings,
  ClipboardList,
  Heart,
  ChevronRight,
  Sparkles,
  Calendar
} from 'lucide-react';

interface AccountProps {
  onNavigate: (page: string) => void;
}

export function Account({ onNavigate }: AccountProps) {
  const { user, profile, loading, signOut } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSignOutLoading, setIsSignOutLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      onNavigate('auth');
      return;
    }

    const fetchOrders = async () => {
      const q = query(
        collection(db, 'orders'), 
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);
    };

    fetchOrders();
  }, [user, onNavigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-black"></div>
      </div>
    );
  }

  const handleSignOut = async () => {
    setIsSignOutLoading(true);
    await signOut();
    onNavigate('home');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <ClipboardList size={18} /> },
    { id: 'orders', label: 'My Orders', icon: <ShoppingBag size={18} /> },
    { id: 'profile', label: 'Personal Data', icon: <User size={18} /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart size={18} /> },
    { id: 'foot-profile', label: 'Foot Profile', icon: <Sparkles size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-10 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <div className="w-full md:w-80 space-y-6">
            <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-white text-xl font-serif">
                  {profile?.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-lg font-serif">Hi, {profile?.displayName?.split(' ')[0] || 'User'}</h2>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">C&K Member</p>
                </div>
              </div>

              <div className="space-y-1">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${
                      activeTab === tab.id 
                        ? 'bg-black text-white shadow-lg shadow-black/10' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="pt-8 mt-8 border-t border-gray-100">
                <button 
                  onClick={handleSignOut}
                  disabled={isSignOutLoading}
                  className="w-full flex items-center gap-4 px-4 py-3.5 text-red-500 hover:bg-red-50 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all"
                >
                  <LogOut size={18} />
                  {isSignOutLoading ? 'Signing out...' : 'Sign Out'}
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Welcome Banner */}
                <div className="bg-white p-10 border border-gray-100 shadow-sm rounded-3xl relative overflow-hidden">
                  <div className="relative z-10">
                    <h1 className="text-3xl font-serif mb-4 italic">Your Style Dashboard</h1>
                    <p className="text-gray-500 text-sm max-w-md leading-relaxed mb-8">
                      Manage your orders, saved items, and personalized foot scan profile all in one place.
                    </p>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => onNavigate('catalog')}
                        className="bg-black text-white px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-gray-900 transition-colors"
                      >
                        Shop New Collection
                      </button>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-gold-accent/5 to-transparent flex items-center justify-center">
                    <Sparkles className="text-gold-accent/20" size={120} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Recent Order Summary */}
                  <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-2xl">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-[12px] font-bold uppercase tracking-widest">Recent Activity</h3>
                      <button onClick={() => setActiveTab('orders')} className="text-[10px] text-gray-400 uppercase tracking-widest hover:text-black">View All</button>
                    </div>
                    {orders.length > 0 ? (
                      <div className="space-y-6">
                        {orders.slice(0, 2).map(order => (
                          <div key={order.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-transparent hover:border-gray-200 transition-colors">
                            <div className="w-12 h-12 rounded-lg bg-white border border-gray-100 flex items-center justify-center">
                              <ShoppingBag size={20} className="text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-[11px] font-bold">Order #{order.id.slice(0, 8)}</p>
                              <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Status: {order.status}</p>
                            </div>
                            <p className="text-[11px] font-bold">RM {order.totalAmount}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <ShoppingBag className="mx-auto text-gray-200 mb-4" size={40} />
                        <p className="text-[11px] text-gray-400 uppercase tracking-widest">No recent orders</p>
                      </div>
                    )}
                  </div>

                  {/* Foot Profile Summary */}
                  <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-2xl">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-[12px] font-bold uppercase tracking-widest">AI Foot Profile</h3>
                      <Sparkles size={16} className="text-gold-accent" />
                    </div>
                    {profile?.footProfile ? (
                      <div className="space-y-4">
                        <div className="flex justify-between p-4 bg-[#F8F9FA] rounded-xl">
                          <span className="text-[10px] uppercase tracking-widest text-gray-400">Rec. Size</span>
                          <span className="text-[12px] font-bold">{profile.footProfile.size}</span>
                        </div>
                        <div className="flex justify-between p-4 bg-[#F8F9FA] rounded-xl">
                          <span className="text-[10px] uppercase tracking-widest text-gray-400">Width</span>
                          <span className="text-[12px] font-bold capitalize">{profile.footProfile.width}</span>
                        </div>
                        <button 
                          onClick={() => setActiveTab('foot-profile')}
                          className="w-full text-center py-4 text-[10px] font-bold uppercase tracking-widest border border-gray-100 rounded-xl hover:bg-gray-50"
                        >
                          Update Scan
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-loose mb-6 italic">
                          "Perfect fit is precision engineering."
                        </p>
                        <button className="bg-gold-accent/10 text-gold-accent px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gold-accent/20 transition-all">
                          Start 3D Scan
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif italic mb-8">Purchase History</h2>
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order.id} className="bg-white p-8 border border-gray-100 shadow-sm rounded-2xl">
                        <div className="flex flex-wrap justify-between items-start gap-4 mb-6 pb-6 border-b border-gray-50">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Order Number</p>
                            <p className="text-[14px] font-bold uppercase tracking-widest">{order.id}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Date</p>
                            <p className="text-[14px] font-bold flex items-center gap-2">
                              <Calendar size={14} />
                              {new Date(order.createdAt?.toMillis()).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Total Amount</p>
                            <p className="text-[14px] font-bold">RM {order.totalAmount}</p>
                          </div>
                          <div className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                            order.status === 'delivered' ? 'bg-green-50 text-green-600' : 'bg-gold-accent/10 text-gold-accent'
                          }`}>
                            {order.status}
                          </div>
                        </div>
                        <div className="space-y-4">
                          {order.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex gap-4">
                              <div className="w-20 h-24 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                                <ShoppingBag size={24} className="text-gray-300" />
                              </div>
                              <div className="flex-1">
                                <p className="text-[12px] font-bold mb-1">{item.name}</p>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Size: {item.selectedSize} | Heel: {item.selectedHeel}</p>
                                <p className="text-[11px] font-bold mt-2">RM {item.price} x {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white py-20 text-center border border-gray-100 rounded-2xl">
                    <ShoppingBag className="mx-auto text-gray-200 mb-6" size={60} />
                    <p className="text-[12px] uppercase tracking-widest text-gray-400 mb-8">No orders found</p>
                    <button 
                      onClick={() => onNavigate('catalog')}
                      className="bg-black text-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] rounded-full"
                    >
                      Browse Collection
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'foot-profile' && (
              <div className="bg-white p-12 border border-gray-100 shadow-sm rounded-3xl">
                <div className="flex items-center gap-4 mb-12">
                  <div className="p-4 bg-gold-accent/10 rounded-2xl">
                    <Sparkles className="text-gold-accent" size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif italic italic">AI Foot Biometrics</h2>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400">Precision fit powered by computer vision</p>
                  </div>
                </div>

                {profile?.footProfile ? (
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 relative group overflow-hidden">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 relative z-10 font-bold">Heel Size</p>
                      <p className="text-5xl font-serif relative z-10">{profile.footProfile.size}</p>
                      <div className="absolute bottom-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <ShoppingBag size={80} />
                      </div>
                    </div>
                    <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 relative group overflow-hidden">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 relative z-10 font-bold">Foot Width</p>
                      <p className="text-3xl font-serif relative z-10 capitalize">{profile.footProfile.width}</p>
                      <div className="absolute bottom-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <MapPin size={80} />
                      </div>
                    </div>
                    <div className="p-8 bg-black text-white rounded-2xl shadow-xl shadow-black/10 relative overflow-hidden flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest opacity-60 mb-2 font-bold">Optimization</p>
                        <p className="text-lg italic font-serif leading-tight">Your fit is synchronized across all designs.</p>
                      </div>
                      <button className="text-[10px] uppercase tracking-[0.3em] font-bold flex items-center gap-2 hover:translate-x-2 transition-transform">
                        Retake Scan <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10">
                   <p className="mb-10 text-gray-400 italic">No scan data available. Start your digital fitting session.</p>
                   <button className="bg-black text-white px-10 py-5 text-[11px] font-bold uppercase tracking-widest rounded-full">
                     Begin 3D Foot Scan
                   </button>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'profile' && (
              <div className="bg-white p-12 border border-gray-100 shadow-sm rounded-3xl">
                <h2 className="text-2xl font-serif italic mb-12">Personal Information</h2>
                <form className="space-y-8 max-w-xl">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Display Name</label>
                       <input 
                         type="text" 
                         defaultValue={profile?.displayName || ''} 
                         className="w-full px-4 py-4 bg-gray-50 border border-transparent border-b-gray-200 outline-none focus:border-black transition-all"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Phone</label>
                       <input 
                         type="text" 
                         defaultValue={profile?.phoneNumber || ''} 
                         placeholder="+60 12-345 6789"
                         className="w-full px-4 py-4 bg-gray-50 border border-transparent border-b-gray-200 outline-none focus:border-black transition-all"
                       />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                    <input 
                      type="email" 
                      value={user.email || ''} 
                      readOnly 
                      className="w-full px-4 py-4 bg-gray-100 border border-transparent text-gray-400 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Default Shipping Address</label>
                    <textarea 
                      defaultValue={profile?.address || ''} 
                      rows={3}
                      className="w-full px-4 py-4 bg-gray-50 border border-transparent border-b-gray-200 outline-none focus:border-black transition-all resize-none"
                    />
                  </div>
                  <button className="bg-black text-white px-12 py-5 text-[11px] font-bold uppercase tracking-widest rounded-full hover:shadow-xl transition-all">
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
