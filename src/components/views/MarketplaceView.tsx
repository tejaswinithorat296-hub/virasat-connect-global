'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ARTISAN_PRODUCTS, ArtisanProductItem } from '@/data/mockData';
import {
  ShoppingBag,
  Palette,
  ShieldCheck,
  Star,
  Check,
  X,
  CreditCard,
  Truck,
  Heart,
  ExternalLink
} from 'lucide-react';

export const MarketplaceView: React.FC = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProductForModal, setSelectedProductForModal] = useState<ArtisanProductItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const categories = ['All', 'Textiles', 'Pottery', 'Woodwork', 'Jewelry', 'Weaving'];

  const filteredProducts = selectedCategory === 'All'
    ? ARTISAN_PRODUCTS
    : ARTISAN_PRODUCTS.filter(p => p.category === selectedCategory);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      clearCart();
      setCheckoutSuccess(false);
      setIsCartOpen(false);
      alert('Order placed successfully! Direct fair-trade payment transferred to the artisan cooperative.');
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-serif font-bold text-amber-200">
            Global Artisan Heritage Marketplace
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Directly connect with certified master artisans and preserve indigenous crafting lineages.
          </p>
        </div>

        {/* View Cart Button */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 self-start md:self-auto"
        >
          <ShoppingBag className="w-4 h-4" />
          View Bag ({cart.reduce((total, i) => total + i.quantity, 0)} Items • ${cartTotal})
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-4 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1 group"
          >
            <div>
              <div
                className="relative h-48 rounded-xl overflow-hidden bg-slate-950 mb-3 cursor-pointer"
                onClick={() => setSelectedProductForModal(prod)}
              >
                <img
                  src={prod.imageUrl}
                  alt={prod.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 text-amber-300 border border-slate-800">
                  {prod.category}
                </span>
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400">
                  Handmade
                </span>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-amber-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{prod.artisanName}</span>
              </div>
              <span className="text-[10px] text-slate-500 block truncate">{prod.artisanCommunity}, {prod.country}</span>

              <h3
                onClick={() => setSelectedProductForModal(prod)}
                className="text-sm font-bold text-slate-100 group-hover:text-amber-300 transition-colors mt-1 cursor-pointer line-clamp-1"
              >
                {prod.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2 font-light">
                {prod.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-base font-bold text-slate-100">${prod.price}</span>
                <span className="text-[10px] text-slate-500 ml-1">USD</span>
              </div>

              <button
                type="button"
                onClick={() => addToCart(prod)}
                className="py-1.5 px-3 rounded-xl bg-slate-950 hover:bg-amber-400 hover:text-slate-950 border border-slate-800 hover:border-amber-400 text-amber-300 font-semibold text-xs transition-all flex items-center gap-1"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Add to Bag
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProductForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
            <button
              type="button"
              onClick={() => setSelectedProductForModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-950 text-slate-400 hover:text-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <img
                src={selectedProductForModal.imageUrl}
                alt={selectedProductForModal.title}
                className="w-full h-64 object-cover rounded-2xl border border-slate-800"
              />
              <div className="space-y-3 text-xs">
                <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">
                  {selectedProductForModal.category} • {selectedProductForModal.country}
                </span>
                <h3 className="text-xl font-serif font-bold text-slate-100">
                  {selectedProductForModal.title}
                </h3>
                <p className="text-slate-300 leading-relaxed font-light">
                  {selectedProductForModal.description}
                </p>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-slate-400">
                  <div><strong className="text-slate-300">Artisan:</strong> {selectedProductForModal.artisanName}</div>
                  <div><strong className="text-slate-300">Community:</strong> {selectedProductForModal.artisanCommunity}</div>
                  <div><strong className="text-slate-300">Technique:</strong> {selectedProductForModal.technique}</div>
                  <div><strong className="text-slate-300">Materials:</strong> {selectedProductForModal.materials.join(', ')}</div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-2xl font-bold text-amber-300">${selectedProductForModal.price} USD</div>
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(selectedProductForModal);
                      setSelectedProductForModal(null);
                    }}
                    className="py-2 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-serif font-bold text-slate-100">Artisan Bag</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  Your bag is empty. Explore master artisan creations to support traditional craft communities!
                </div>
              ) : (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-bold text-slate-200 line-clamp-1">{item.product.title}</div>
                          <div className="text-slate-400 text-[11px]">${item.product.price} × {item.quantity}</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-rose-400 hover:text-rose-300 text-xs px-2 py-1"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex justify-between text-sm font-bold text-slate-100">
                  <span>Subtotal (Direct to Artisans):</span>
                  <span className="text-amber-400">${cartTotal} USD</span>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  Ethical Fair-Trade Packaging & Global Verified Tracking Included.
                </div>
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={checkoutSuccess}
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <CreditCard className="w-4 h-4" />
                  {checkoutSuccess ? 'Processing Fair-Trade Payment...' : 'Proceed to Ethical Checkout'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

