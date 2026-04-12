import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function Settings() {
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // 🔥 LOAD SETTINGS
  useEffect(() => {
    const fetchSettings = async () => {
      const ref = doc(db, "settings", "config");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setBusinessName(data.businessName || "");
        setPhone(data.phone || "");
        setAddress(data.address || "");
      }
    };

    fetchSettings();
  }, []);

  // 💾 SAVE
  const handleSave = async () => {
    if (!businessName || !phone || !address) {
      alert("Please fill all fields");
      return;
    }

    await setDoc(doc(db, "settings", "config"), {
      businessName,
      phone,
      address,
    });

    alert("Settings Saved ✅");
  };

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-bold">⚙️ Settings</h1>

      <div className="bg-gray-800 p-6 rounded-lg space-y-4 max-w-lg">

        <input
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder="Business Name"
          className="w-full px-3 py-2 bg-gray-700 rounded"
        />

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          className="w-full px-3 py-2 bg-gray-700 rounded"
        />

        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          className="w-full px-3 py-2 bg-gray-700 rounded"
        />

        <button
          onClick={handleSave}
          className="bg-teal-500 px-4 py-2 rounded"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}