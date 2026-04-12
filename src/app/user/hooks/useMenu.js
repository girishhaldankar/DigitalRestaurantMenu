import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export const useMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // ✅ MENU ITEMS
    const q = query(collection(db, "menuItems"), orderBy("name"));

    const unsubscribeMenu = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id, // ✅ IMPORTANT
        ...doc.data(),
      }));
      setMenuItems(data);
    });

    // ✅ CATEGORIES
    const unsubscribeCat = onSnapshot(
      collection(db, "categories"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(data);
      }
    );

    return () => {
      unsubscribeMenu();
      unsubscribeCat();
    };
  }, []);

  return { menuItems, categories };
};