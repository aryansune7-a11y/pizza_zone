import React, { useState } from 'react';
import { Plus, Sparkles, Edit, Trash2, Search, Check, X } from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  isVeg: boolean;
  isTodaySpecial: boolean;
  todaySpecialPrice?: number;
  isActive: boolean;
  imageUrl: string;
}

const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'p1',
    name: 'Truffle Mushroom Supreme',
    category: 'Signature Pizzas',
    basePrice: 499,
    isVeg: true,
    isTodaySpecial: true,
    todaySpecialPrice: 449,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p2',
    name: 'Fiery Pepperoni & Jalapeño Overload',
    category: 'Signature Pizzas',
    basePrice: 549,
    isVeg: false,
    isTodaySpecial: false,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p3',
    name: 'Paneer Tikka Passion',
    category: 'Signature Pizzas',
    basePrice: 429,
    isVeg: true,
    isTodaySpecial: true,
    todaySpecialPrice: 379,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p4',
    name: 'Cheesy Garlic Stuffed Sticks',
    category: 'Gourmet Sides',
    basePrice: 189,
    isVeg: true,
    isTodaySpecial: false,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p5',
    name: 'Artisanal Cold Brew Sparkler',
    category: 'Beverages',
    basePrice: 129,
    isVeg: true,
    isTodaySpecial: false,
    isActive: true,
    imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80'
  }
];

export const MenuManagementView: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Signature Pizzas');
  const [newPrice, setNewPrice] = useState('399');
  const [newIsVeg, setNewIsVeg] = useState(true);

  const toggleTodaySpecial = (productId: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id !== productId) return p;
      const nextSpecial = !p.isTodaySpecial;
      return {
        ...p,
        isTodaySpecial: nextSpecial,
        todaySpecialPrice: nextSpecial ? Math.round(p.basePrice * 0.85) : undefined
      };
    }));
  };

  const toggleActiveStatus = (productId: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id !== productId) return p;
      return { ...p, isActive: !p.isActive };
    }));
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const newProd: ProductItem = {
      id: `p-${Date.now()}`,
      name: newName,
      category: newCategory,
      basePrice: parseFloat(newPrice) || 299,
      isVeg: newIsVeg,
      isTodaySpecial: false,
      isActive: true,
      imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
    };

    setProducts([newProd, ...products]);
    setIsAddModalOpen(false);
    setNewName('');
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Top Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1E293B] p-6 rounded-2xl border border-[#334155]">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            <span>Menu & Today's Special Manager</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Manage product catalog, pricing, variants, and feature Today's Specials live on customer app.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product name..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0F172A] border border-[#334155] text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-lg transition-all flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Item</span>
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#1E293B] rounded-2xl border border-[#334155] overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#0F172A] text-slate-400 uppercase font-extrabold border-b border-[#334155]">
            <tr>
              <th className="py-4 px-6">Product</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Base Price</th>
              <th className="py-4 px-6">Dietary</th>
              <th className="py-4 px-6">Today's Special Badge</th>
              <th className="py-4 px-6">Catalog State</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#334155] text-slate-200">
            {filteredProducts.map((p) => (
              <tr key={p.id} className="hover:bg-[#334155]/20 transition-colors">
                <td className="py-4 px-6 flex items-center gap-3">
                  <img src={p.imageUrl} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                  <span className="font-bold text-white text-sm">{p.name}</span>
                </td>
                <td className="py-4 px-6 font-medium text-slate-300">
                  {p.category}
                </td>
                <td className="py-4 px-6 font-black text-white">
                  ₹{p.basePrice}
                </td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                    p.isVeg 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                      : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                  }`}>
                    {p.isVeg ? 'PURE VEG' : 'NON-VEG'}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => toggleTodaySpecial(p.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                      p.isTodaySpecial
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-[#0F172A] text-slate-400 border border-[#334155] hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{p.isTodaySpecial ? `ACTIVE (₹${p.todaySpecialPrice})` : 'SET SPECIAL'}</span>
                  </button>
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => toggleActiveStatus(p.id)}
                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold ${
                      p.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {p.isActive ? 'IN STOCK' : 'OUT OF STOCK'}
                  </button>
                </td>
                <td className="py-4 px-6 text-right space-x-2">
                  <button 
                    onClick={() => alert(`Edit Product '${p.name}' properties`)}
                    className="p-1.5 rounded-lg bg-[#0F172A] text-slate-300 hover:text-indigo-400 border border-[#334155]"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <form onSubmit={handleAddProduct} className="bg-[#1E293B] border border-[#334155] rounded-3xl p-6 w-full max-w-md space-y-4 text-white shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#334155] pb-3">
              <h3 className="text-lg font-black text-white">Add New Menu Product</h3>
              <button type="button" onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Product Name</label>
                <input 
                  type="text" 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Sourdough Pesto Basil"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0F172A] border border-[#334155] text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Category</label>
                <select 
                  value={newCategory} 
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0F172A] border border-[#334155] text-white focus:outline-none"
                >
                  <option value="Signature Pizzas">Signature Pizzas</option>
                  <option value="Gourmet Sides">Gourmet Sides</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Desserts">Desserts</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Base Price (₹)</label>
                <input 
                  type="number" 
                  value={newPrice} 
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0F172A] border border-[#334155] text-white focus:outline-none"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="vegCheck"
                  checked={newIsVeg} 
                  onChange={(e) => setNewIsVeg(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500"
                />
                <label htmlFor="vegCheck" className="font-bold text-slate-300">Is Pure Veg Product</label>
              </div>
            </div>

            <div className="pt-4 border-t border-[#334155] flex justify-end gap-2">
              <button 
                type="button" 
                onClick={() => setIsAddModalOpen(false)} 
                className="px-4 py-2 rounded-xl bg-[#0F172A] text-slate-400 text-xs font-bold"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
