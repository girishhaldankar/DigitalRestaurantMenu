import { menuItems } from "./menuData";

export interface PDFMenuSection {
  title: string;
  items: { name: string; price: number }[];
  subtitle?: string;
}

// Helper function
const getItemsByCategory = (categories: string[]) => {
  return menuItems
    .filter((item) => categories.includes(item.category))
    .map((item) => ({
      name: item.name,
      price: item.price,
    }));
};

export const pdfMenuData: PDFMenuSection[] = [
  {
    title: "Today's Special",
    subtitle: "Chef's Hand-picked Delights",
    items: [
      { name: "Chef Special Biryani", price: 349 },
      { name: "Butter Chicken Deluxe", price: 329 },
      { name: "Paneer Royal Tikka", price: 279 },
    ],
  },

  {
    title: "Combo Offers",
    subtitle: "Perfect for Sharing",
    items: [
      { name: "Family Feast (Serves 4)", price: 999 },
      { name: "Lunch Combo (Rice + Curry)", price: 299 },
      { name: "Couple Dinner Special", price: 599 },
    ],
  },

  {
    title: "Indian Cuisine",
    subtitle: "Traditional Indian Dishes",
    items: getItemsByCategory(["Indian"]),
  },

  {
    title: "Chinese Cuisine",
    subtitle: "Popular Indo-Chinese",
    items: getItemsByCategory(["Chinese"]),
  },

  {
    title: "Continental Cuisine",
    subtitle: "International Flavors",
    items: getItemsByCategory(["Continental"]),
  },

  {
    title: "Beverages",
    items: getItemsByCategory(["Beverages"]),
  },

  {
    title: "Desserts",
    items: getItemsByCategory(["Desserts"]),
  },
];