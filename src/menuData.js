// ✅ CATEGORIES (ONLY UI GROUPS)
export const categories = [
  { label: "Mocktail", value: "Mocktail" },
  { label: "Tea & Coffee", value: "Tea & Coffee" },
  { label: "Bread", value: "Bread" },
  { label: "Small Bites", value: "Small Bites" },
  { label: "Maggie", value: "Maggie" },
  { label: "Sandwich", value: "Sandwich" },
  { label: "Burger", value: "Burger" },
  { label: "Wrap", value: "Wrap" },
  { label: "Pasta", value: "Pasta" },
  { label: "Thai", value: "Thai" },
  { label: "Starter", value: "Starter" },
  { label: "Noodles", value: "Noodles" },
  { label: "Rice", value: "Rice" },
  { label: "Soup", value: "Soup" },
  { label: "Pizza", value: "Pizza" },
  { label: "Momos", value: "Momos" },
  { label: "Frankie", value: "Frankie" },
];

// ✅ CUISINES (FILTER ONLY)
export const cuisines = [
  { label: "All", value: "All" },
  { label: "Indian", value: "Indian" },
  { label: "Chinese", value: "Chinese" },
  { label: "Continental", value: "Continental" }
];

// ✅ MENU ITEMS (FIXED)
export const menuItems = [

  // MOCKTAIL
  {
    id: "mocktail-1",
    name: "Lemon Mojito",
    description: "Refreshing mint lemon drink",
    price: 75,
    image: "/foodimages/lemon-mojito.jpg",
    category: "Mocktail",
    cuisine: "Continental",
    isVeg: true
  },
  {
    id: "mocktail-2",
    name: "Peach Ice Tea",
    description: "Chilled peach tea",
    price: 75,
    image: "/foodimages/peach-ice-tea.jpg",
    category: "Mocktail",
    cuisine: "Continental",
    isVeg: true
  },

  // TEA
  {
    id: "tea-1",
    name: "Tea",
    description: "Hot tea",
    price: 20,
    image: "/foodimages/tea.jpg",
    category: "Tea & Coffee",
    cuisine: "Indian",
    isVeg: true
  },

  // SMALL BITES
  {
    id: "bite-1",
    name: "French Fries",
    description: "Crispy fries",
    priceHalf: 100,
    priceFull: 160,
    image: "/foodimages/french-fries.jpg",
    category: "Small Bites",
    cuisine: "Fast Food",
    isVeg: true
  },

  // MAGGI
  {
    id: "maggi-1",
    name: "Classic Maggi",
    description: "Simple maggi",
    price: 60,
    image: "/foodimages/classic-maggi.jpg",
    category: "Maggie",
    cuisine: "Indian",
    isVeg: true
  },

  // SANDWICH
  {
    id: "sandwich-1",
    name: "Veg Cheese Sandwich",
    description: "Loaded sandwich",
    priceHalf: 50,
    priceFull: 65,
    image: "/foodimages/veg-cheese-sandwich.jpg",
    category: "Sandwich",
    cuisine: "Fast Food",
    isVeg: true
  },

  // BURGER
  {
    id: "burger-1",
    name: "Veggie Burger",
    description: "Cheesy veg burger",
    price: 120,
    image: "/foodimages/veggie-cheesy-burger.jpg",
    category: "Burger",
    cuisine: "Fast Food",
    isVeg: true
  },

  // PIZZA
  {
    id: "pizza-1",
    name: "Margherita Pizza",
    description: "Classic cheese pizza",
    priceHalf: 140,
    priceFull: 210,
    image: "/foodimages/margherita-pizza.jpg",
    category: "Pizza",
    cuisine: "Fast Food",
    isVeg: true
  },

  // CHINESE
  {
    id: "ch-1",
    name: "Veg Hakka Noodles",
    description: "Street style noodles",
    priceHalf: 120,
    priceFull: 180,
    image: "/foodimages/hakka-noodles.jpg",
    category: "Noodles",
    cuisine: "Chinese",
    isVeg: true
  },
  {
    id: "ch-2",
    name: "Veg Manchurian",
    description: "Dry / gravy manchurian",
    priceHalf: 140,
    priceFull: 200,
    image: "/foodimages/veg-manchurian.jpg",
    category: "Starter",
    cuisine: "Chinese",
    isVeg: true
  },
  {
    id: "ch-3",
    name: "Schezwan Fried Rice",
    description: "Spicy schezwan rice",
    priceHalf: 130,
    priceFull: 190,
    image: "/foodimages/schezwan-rice.jpg",
    category: "Rice",
    cuisine: "Chinese",
    isVeg: true
  },

  // INDIAN
  {
    id: "ind-1",
    name: "Paneer Butter Masala",
    description: "Rich creamy paneer curry",
    priceHalf: 180,
    priceFull: 260,
    image: "/foodimages/paneer-butter-masala.jpg",
    category: "Starter",
    cuisine: "Indian",
    isVeg: true
  },
  {
    id: "ind-2",
    name: "Dal Tadka",
    description: "Classic Indian dal",
    priceHalf: 120,
    priceFull: 180,
    image: "/foodimages/dal-tadka.jpg",
    category: "Starter",
    cuisine: "Indian",
    isVeg: true
  },

  // CONTINENTAL
  {
    id: "con-1",
    name: "White Sauce Pasta",
    description: "Creamy white sauce pasta",
    price: 180,
    image: "/foodimages/white-sauce-pasta.jpg",
    category: "Pasta",
    cuisine: "Continental",
    isVeg: true
  },
  {
    id: "con-2",
    name: "Grilled Sandwich",
    description: "Classic grilled sandwich",
    price: 90,
    image: "/foodimages/grilled-sandwich.jpg",
    category: "Sandwich",
    cuisine: "Continental",
    isVeg: true
  }
];