import { useState, useMemo, useRef, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { VegFilter } from "./components/VegFilter";
import { CategoryTabs } from "./components/CategoryTabs";
import { MenuItemCard } from "./components/MenuItemCard";
import { CartButton } from "./components/CartButton";
import { CheckoutSheet } from "./components/CheckoutSheet";

import MenuPreviewPage from "./MenuPreviewPage";
import { useMenu } from "./hooks/useMenu";
import { CuisineFilter } from "./components/CuisineFilter";
import { InstallButton } from "../../components/InstallButton";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";

import SplashScreen from "../../components/SplashScreen";

/* =========================
   TYPES
   ========================= */
interface CartItem {
  id: string;
  size: "half" | "full";
  quantity: number;
}

/* =========================
   MAIN APP (FIXED)
   ========================= */
export default function UserApp() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 🔥 MAIN APP ALWAYS MOUNTED */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu-preview" element={<MenuPreviewPage />} />

        {/* Policy Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
      </Routes>

      {/* 🔥 INSTALL BUTTON ALWAYS AVAILABLE */}
      <InstallButton />

      {/* 🔥 SPLASH OVERLAY */}
      {loading && (
        <div className="fixed inset-0 z-[9999]">
          <SplashScreen />
        </div>
      )}
    </>
  );
}

/* =========================
   HOME PAGE
   ========================= */
function Home() {
  const { menuItems, categories } = useMenu();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [vegFilter, setVegFilter] = useState("all");
  const [cuisineFilter, setCuisineFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const menuRef = useRef<any>(null);

  const scrollToMenu = () =>
    menuRef.current?.scrollIntoView({ behavior: "smooth" });

  /* =========================
     FILTER LOGIC
     ========================= */
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const matchVeg =
        vegFilter === "all" ||
        (vegFilter === "veg" && item.isVeg) ||
        (vegFilter === "nonveg" && !item.isVeg);

      const matchCuisine =
        cuisineFilter === "All" || item.cuisine === cuisineFilter;

      const matchSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchVeg && matchCuisine && matchSearch;
    });
  }, [menuItems, selectedCategory, vegFilter, cuisineFilter, searchQuery]);

  /* =========================
     CART
     ========================= */
  const getPrice = (item: any, size: "half" | "full") =>
    size === "half"
      ? item.priceHalf ?? item.price ?? 0
      : item.priceFull ?? item.price ?? 0;

  const cartItems = useMemo(
    () =>
      cart.map((cartItem) => ({
        item: menuItems.find((i) => i.id === cartItem.id),
        quantity: cartItem.quantity,
        size: cartItem.size,
      })),
    [cart, menuItems]
  );

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, { item, quantity, size }) =>
          sum + getPrice(item, size) * quantity,
        0
      ),
    [cartItems]
  );

  const totalItemsInCart = useMemo(
    () => cart.reduce((sum, i) => sum + i.quantity, 0),
    [cart]
  );

  const addToCart = (id: string, size: "half" | "full") => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.id === id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { id, size, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string, size: "half" | "full") => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id && i.size === size
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  /* =========================
     UI
     ========================= */
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: "url('/food-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-8 py-2 sm:py-8">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden px-1 py-2 space-y-4">

          <Header onExploreClick={scrollToMenu} />

          <div ref={menuRef}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          <VegFilter filter={vegFilter} onFilterChange={setVegFilter} />

          <CuisineFilter
            cuisine={cuisineFilter}
            onChange={setCuisineFilter}
          />

          <CategoryTabs
            categories={[
              { label: "All", value: "All", icon: "/icons/grid-2.png" },
              ...categories.map((cat) => ({
                ...cat,
                icon: `/icons/${cat.value
                  .toLowerCase()
                  .replace(/&/g, "and")
                  .replace(/\s+/g, "-")}.png`,
              })),
            ]}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <div className="grid grid-cols-2 gap-4 mt-4 pb-32 max-w-6xl mx-auto">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                quantity={cart.find((i) => i.id === item.id)?.quantity || 0}
                onAdd={addToCart}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          {/* Footer */}
          <footer className="text-xs text-center text-gray-300 mt-6 space-x-4">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/refund-policy">Refund</Link>
          </footer>
        </div>
      </div>

      {/* Cart */}
      <CartButton
        itemCount={totalItemsInCart}
        total={cartTotal}
        onClick={() => setIsCartOpen(true)}
      />

      <CheckoutSheet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onAdd={addToCart}
        onRemove={removeFromCart}
        onClearCart={clearCart}
      />
    </div>
  );
}