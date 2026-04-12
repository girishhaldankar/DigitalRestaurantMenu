import { db } from "./firebase"; // your firebase config
import { collection, doc, setDoc } from "firebase/firestore";
import { menuItems, categories } from "./menuData";

// 🔥 Upload Categories
export const uploadCategories = async () => {
  try {
    for (const cat of categories) {
      await setDoc(doc(db, "categories", cat.value), cat);
    }
    console.log("✅ Categories Uploaded");
  } catch (err) {
    console.error(err);
  }
};

// 🔥 Upload Menu Items
export const uploadMenuItems = async () => {
  try {
    for (const item of menuItems) {
      await setDoc(doc(db, "menuItems", item.id), item);
    }
    console.log("✅ Menu Uploaded");
  } catch (err) {
    console.error(err);
  }
};

// 🔥 Run both
export const uploadAll = async () => {
  await uploadCategories();
  await uploadMenuItems();
};