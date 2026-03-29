import { useState, useMemo, useRef } from "react";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { VegFilter } from "./components/VegFilter";
import { CategoryTabs } from "./components/CategoryTabs";
import { MenuItemCard } from "./components/MenuItemCard";
import { CartButton } from "./components/CartButton";
import { CheckoutSheet } from "./components/CheckoutSheet";
import { menuItems, categories } from "./data/menuData";

// ✅ CART TYPE
interface CartItem {
  id: string;
  size: "half" | "full";
  quantity: number;
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [vegFilter, setVegFilter] = useState<"all" | "veg" | "nonveg">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // =========================
  // ✅ CUISINE LOGIC
  // =========================
  const getCuisine = (category: string) => {
    if (["Noodles", "Rice", "Starter", "Soup", "Momos"].includes(category))
      return "Chinese";

    if (["Pizza", "Pasta", "Burger", "Sandwich"].includes(category))
      return "Continental";

    return "Indian";
  };

  const cuisines = ["All", "Indian", "Chinese", "Continental"];

  // =========================
  // ✅ FILTER
  // =========================
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const matchCuisine =
        selectedCuisine === "All" ||
        getCuisine(item.category) === selectedCuisine;

      const matchVeg =
        vegFilter === "all" ||
        (vegFilter === "veg" && item.isVeg) ||
        (vegFilter === "nonveg" && !item.isVeg);

      const matchSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchCuisine && matchVeg && matchSearch;
    });
  }, [selectedCategory, selectedCuisine, vegFilter, searchQuery]);

  // =========================
  // ✅ CART LOGIC (same as yours)
  // =========================
  const getPrice = (item: any, size: "half" | "full") => {
    if (size === "half") return item.priceHalf ?? item.price ?? 0;
    return item.priceFull ?? item.price ?? 0;
  };

  const cartItems = useMemo(() => {
    return cart.map((cartItem) => ({
      item: menuItems.find((i) => i.id === cartItem.id)!,
      quantity: cartItem.quantity,
      size: cartItem.size,
    }));
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (sum, { item, quantity, size }) =>
        sum + getPrice(item, size) * quantity,
      0
    );
  }, [cartItems]);

  const totalItemsInCart = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const addToCart = (id: string, size: "half" | "full") => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.id === id && i.size === size
      );

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

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen relative" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div className="min-h-screen relative overflow-x-hidden">

        {/* Background */}
        <div className="fixed inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/food-bg.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[10px]" />
        </div>

        {/* Main */}
        <div className="relative z-10 max-w-7xl mx-auto min-h-screen flex flex-col pt-6 px-4">
          <div className="bg-white/15 backdrop-blur-[24px] border border-white/10 rounded-[3rem] shadow-2xl flex-1 flex flex-col overflow-hidden mb-8">

            <Header onExploreClick={scrollToMenu} />

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Search */}
                <div ref={menuRef}>
                  <SearchBar value={searchQuery} onChange={setSearchQuery} />
                </div>

                {/* ✅ VEG FILTER (NO SCROLL) */}
                <VegFilter
                  filter={vegFilter}
                  onFilterChange={setVegFilter}
                />

                {/* ✅ CUISINE (SCROLLABLE) */}
                <CategoryTabs
                  categories={cuisines}
                  selectedCategory={selectedCuisine}
                  onSelectCategory={setSelectedCuisine}
                />

                {/* ✅ CATEGORY (SCROLLABLE) */}
                <CategoryTabs
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />

                {/* MENU */}
                <main className="pb-32">
                  {filteredItems.length === 0 ? (
                    <div className="text-center py-20">
                      <p className="text-gray-300 text-lg">No items found</p>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:gap-5">
                      {filteredItems.map((item) => {
                        const itemQty =
                          cart.find((i) => i.id === item.id)?.quantity || 0;

                        return (
                          <MenuItemCard
                            key={item.id}
                            item={item}
                            quantity={itemQty}
                            onAdd={addToCart}
                            onRemove={removeFromCart}
                          />
                        );
                      })}
                    </div>
                  )}
                </main>

              </div>
            </div>
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
    </div>
  );
}

export default App;