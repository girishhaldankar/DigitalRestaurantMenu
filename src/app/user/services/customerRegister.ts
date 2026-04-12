import { db } from "../../../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export const registerCustomer = async (name: string, mobile: string) => {
  const cleanMobile = mobile.trim();

  const mobileRegex = /^[6-9]\d{9}$/;
  if (!mobileRegex.test(cleanMobile)) {
    throw new Error("Invalid mobile number");
  }

  const ref = doc(db, "customers", cleanMobile);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    throw new Error("User already exists. Please login.");
  }

  await setDoc(ref, {
    name,
    mobile: cleanMobile,
    createdAt: serverTimestamp(),
  });

  return {
    name,
    mobile: cleanMobile,
  };
};