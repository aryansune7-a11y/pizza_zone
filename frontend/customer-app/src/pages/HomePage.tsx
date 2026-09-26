import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { HeroBanner } from '../components/HeroBanner';
import { CategoryFilter } from '../components/CategoryFilter';
import { ProductCard } from '../components/ProductCard';
import { CustomizationModal } from '../components/CustomizationModal';
import { CartDrawer } from '../components/CartDrawer';
import { Footer } from '../components/Footer';
import { Category, Product } from '../types';
import apiClient from '../api/apiClient';

export const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadMenu = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/menu');
        const payload = response?.data || response;
        const nextCategories = (payload.categories || []) as Category[];
        const nextProducts = (payload.products || []).map((product: any) => ({
          id: product.id,
          categoryId: product.categoryId,
          name: product.name,
          description: product.description,
          basePrice: Number(product.basePrice ?? 0),
          isVeg: Boolean(product.isVeg),
          isTodaySpecial: Boolean(product.isTodaySpecial),
          todaySpecialPrice: product.todaySpecialPrice ? Number(product.todaySpecialPrice) : undefined,
          prepTimeMinutes: product.prepTimeMinutes ?? undefined,
          imageUrl: product.imageUrl,
          rating: product.rating ?? undefined,
          ratingCount: product.ratingCount ?? undefined,
          variants: (product.variants || []).map((variant: any) => ({
            id: variant.id,
            name: variant.name,
            priceDelta: Number(variant.priceDelta ?? 0),
          })),
          addons: (product.addons || []).map((addon: any) => ({
            id: addon.id,
            name: addon.name,
            price: Number(addon.price ?? 0),
          })),
        }));

        setCategories(nextCategories);
        setProducts(nextProducts);
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Unable to load menu right now.');
      } finally {
        setLoading(false);
      }
    };

    void loadMenu();
  }, []);

  const filteredProducts = products.filter((product) => {
    if (selectedCategoryId !== 'all' && product.categoryId !== selectedCategoryId) {
      return false;
    }
    if (isVegOnly && !product.isVeg) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF7]">
      <Header />
      <HeroBanner />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {loading ? (
          <div className="py-16 text-center text-pizza-dark font-bold">Loading delicious menu...</div>
        ) : error ? (
          <div className="py-16 text-center text-rose-600 font-bold">{error}</div>
        ) : (
          <>
            <CategoryFilter 
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={setSelectedCategoryId}
              isVegOnly={isVegOnly}
              onToggleVegOnly={() => setIsVegOnly((prev) => !prev)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  onCustomize={(prod) => setCustomizingProduct(prod)}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-16 text-center space-y-3">
                <div className="text-4xl">🔍</div>
                <h3 className="text-lg font-bold text-pizza-dark">No pizzas matched your filter</h3>
                <p className="text-xs text-pizza-muted">Try toggling off 'Veg Only' or select another category.</p>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />

      <CustomizationModal 
        product={customizingProduct}
        onClose={() => setCustomizingProduct(null)}
      />

      <CartDrawer />
    </div>
  );
};
