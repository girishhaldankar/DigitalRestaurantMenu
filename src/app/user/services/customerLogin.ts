import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";

export const loginCustomer = async (mobile: string) => {
  const cleanMobile = mobile.trim();

  const mobileRegex = /^[6-9]\d{9}$/;
  if (!mobileRegex.test(cleanMobile)) {
    throw new Error("Invalid mobile number");
  }

  const ref = doc(db, "customers", cleanMobile);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    throw new Error("User not found. Please register first.");
  }

  const user = snap.data();

  return {
    name: user.name,
    mobile: cleanMobile,
  };
};