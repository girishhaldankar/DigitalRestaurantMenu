import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

// ===== TYPES =====
type MenuItem = {
  id?: string;
  name: string;
  category: string;
  cuisine: string; // ✅ ADD THIS
  price?: number | string;
  priceHalf?: number | string;
  priceFull?: number | string;
  isVeg: boolean;
  description: string;
  image: string;
};

type CategoryType = {
  id?: string;
  label: string;
  value: string;
  image?: string;
};

type CuisineType = {
  id?: string;
  label: string;
  value: string;
  image?: string;
};

// ===== EMPTY STATES =====
const emptyMenu: MenuItem = {
  name: "",
  category: "",
  cuisine: "", // ✅ ADD THIS
  price: "",
  priceHalf: "",
  priceFull: "",
  isVeg: true,
  description: "",
  image: "",
};

const emptyCategory: CategoryType = {
  label: "",
  value: "",
  image: "",
};

const emptyCuisine: CuisineType = {
  label: "",
  value: "",
  image: "",
};

export default function AdminManager() {
  // ===== Tabs =====
  const [activeTab, setActiveTab] = useState<"menu" | "category" | "cuisine">("menu");

  // ===== Menu States =====
  const [items, setItems] = useState<MenuItem[]>([]);
  const [form, setForm] = useState<MenuItem>(emptyMenu);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // ===== Category States =====
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [catForm, setCatForm] = useState<CategoryType>(emptyCategory);
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [catImageFile, setCatImageFile] = useState<File | null>(null);
  const [catPreview, setCatPreview] = useState<string | null>(null);
  const [catUploading, setCatUploading] = useState(false);

// ===== cuisines States =====
const [cuisines, setCuisines] = useState<CuisineType[]>([]);
const [cuiForm, setCuiForm] = useState<CuisineType>(emptyCuisine);
const [editingCuiId, setEditingCuiId] = useState<string | null>(null);

  // ================= FETCH MENU =================
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "menuItems"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as MenuItem[];
      setItems(data);
    });
    return () => unsubscribe();
  }, []);

  // ================= FETCH CATEGORIES =================
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "categories"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CategoryType[];
      setCategories(data);
    });
    return () => unsubscribe();
  }, []);

   // ================= FETCH CUISINES =================
  useEffect(() => {
  const unsub = onSnapshot(collection(db, "cuisines"), (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CuisineType[];
    setCuisines(data);
  });

  return () => unsub();
}, []);

  // ================= MENU INPUT CHANGE =================
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  // ================= CATEGORY INPUT CHANGE =================
  const handleCatChange = (e: any) => {
    const { name, value } = e.target;
    setCatForm((prev) => ({ ...prev, [name]: value }));
  };

  // ================= CUISINE INPUT CHANGE =================

  const handleCuisineSubmit = async () => {
  if (!cuiForm.label || !cuiForm.value) return alert("Fill required fields");

  if (editingCuiId) {
    await updateDoc(doc(db, "cuisines", editingCuiId), cuiForm);
  } else {
    await addDoc(collection(db, "cuisines"), cuiForm);
  }

  setCuiForm(emptyCuisine);
  setEditingCuiId(null);
};

  // ================= IMAGE SELECT =================
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleCatImageChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setCatImageFile(file);
    setCatPreview(URL.createObjectURL(file));
  };

  // ================= UPLOAD IMAGE =================
  const uploadImage = async (): Promise<string> => {
    if (!imageFile) return form.image;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "menu_upload");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dixt5kwvz/image/upload",
        { method: "POST", body: formData }
      );
      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
      return "";
    } finally {
      setUploading(false);
    }
  };

  const uploadCatImage = async (): Promise<string> => {
    if (!catImageFile) return catForm.image || "";
    setCatUploading(true);

    const formData = new FormData();
    formData.append("file", catImageFile);
    formData.append("upload_preset", "menu_upload");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dixt5kwvz/image/upload",
        { method: "POST", body: formData }
      );
      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      console.error(err);
      alert("Category image upload failed");
      return "";
    } finally {
      setCatUploading(false);
    }
  };

  // ================= MENU SUBMIT =================
  const handleSubmit = async () => {
    if (!form.name || !form.category || !form.cuisine) return alert("Fill required fields");
    const imageUrl = await uploadImage();
    const saveForm = {
      ...form,
      image: imageUrl,
      price: form.price === "" ? 0 : form.price,
      priceHalf: form.priceHalf === "" ? 0 : form.priceHalf,
      priceFull: form.priceFull === "" ? 0 : form.priceFull,
    };

    if (editingId) {
      await updateDoc(doc(db, "menuItems", editingId), saveForm);
    } else {
      await addDoc(collection(db, "menuItems"), saveForm);
    }

    setForm(emptyMenu);
    setEditingId(null);
    setImageFile(null);
    setPreview(null);
  };

  // ================= MENU EDIT / DELETE =================
  const handleEdit = (item: MenuItem) => {
    setForm({
      ...item,
      price: item.price || "",
      priceHalf: item.priceHalf || "",
      priceFull: item.priceFull || "",
    });
    setPreview(item.image);
    setEditingId(item.id!);
  };
  const handleDelete = async (id: string) => {
    if (!confirm("Delete item?")) return;
    await deleteDoc(doc(db, "menuItems", id));
  };
  const cancelEdit = () => {
    setForm(emptyMenu);
    setEditingId(null);
    setImageFile(null);
    setPreview(null);
  };

  // ================= CATEGORY SUBMIT =================
  const handleCatSubmit = async () => {
    if (!catForm.label || !catForm.value) return alert("Fill required fields");
    const imageUrl = await uploadCatImage();
    const saveCat = { ...catForm, image: imageUrl || catForm.image };

    if (editingCatId) {
      await updateDoc(doc(db, "categories", editingCatId), saveCat);
    } else {
      await addDoc(collection(db, "categories"), saveCat);
    }

    setCatForm(emptyCategory);
    setEditingCatId(null);
    setCatImageFile(null);
    setCatPreview(null);
  };

  const handleEditCat = (cat: CategoryType) => {
    setCatForm(cat);
    setCatPreview(cat.image || null);
    setEditingCatId(cat.id!);
  };
  const handleDeleteCat = async (id: string) => {
    if (!confirm("Delete category?")) return;
    await deleteDoc(doc(db, "categories", id));
  };
  const cancelCatEdit = () => {
    setCatForm(emptyCategory);
    setEditingCatId(null);
    setCatImageFile(null);
    setCatPreview(null);
  };

  return (
    <div className="text-white space-y-6">
      <h1 className="text-2xl font-bold">🍽 Admin Panel</h1>

      {/* ===== TABS ===== */}
      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === "menu" ? "bg-teal-500" : "bg-gray-700"}`}
          onClick={() => setActiveTab("menu")}
        >
          Menu Manager
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "category" ? "bg-teal-500" : "bg-gray-700"}`}
          onClick={() => setActiveTab("category")}
        >
          Category Manager
        </button>
        <button
  className={`px-4 py-2 rounded ${activeTab === "cuisine" ? "bg-teal-500" : "bg-gray-700"}`}
  onClick={() => setActiveTab("cuisine")}
>
  Cuisine Manager
</button>
      </div>

      {/* ===== MENU MANAGER ===== */}
      {activeTab === "menu" && (
        <div className="space-y-6">
          {/* Menu Form */}
          <div className="bg-gray-800 p-4 rounded-xl space-y-3">
            <h2 className="text-lg font-semibold">{editingId ? "✏️ Edit Item" : "➕ Add Item"}</h2>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Item Name" className="w-full p-2 rounded bg-gray-700"/>
            <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 rounded bg-gray-700">
              <option value="">Select Category</option>
              {categories.map((cat) => (<option key={cat.id} value={cat.value}>{cat.label}</option>))}
            </select>
            <select
  name="cuisine"
  value={form.cuisine}
  onChange={handleChange}
  className="w-full p-2 rounded bg-gray-700"
>
  <option value="">Select Cuisine</option>
  <option value="Indian">Indian</option>
  <option value="Chinese">Chinese</option>
  <option value="Continental">Continental</option>
  <option value="Fast Food">Fast Food</option>
  <option value="Thai">Thai</option>
</select>
            <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Base Price" className="w-full p-2 rounded bg-gray-700"/>
            <input name="priceHalf" type="number" value={form.priceHalf} onChange={handleChange} placeholder="Half Price" className="w-full p-2 rounded bg-gray-700"/>
            <input name="priceFull" type="number" value={form.priceFull} onChange={handleChange} placeholder="Full Price" className="w-full p-2 rounded bg-gray-700"/>
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 rounded bg-gray-700"/>
            {preview && <img src={preview} className="w-24 h-24 object-cover rounded mt-2"/>}
            {uploading && <p>Uploading image...</p>}
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 rounded bg-gray-700"/>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isVeg" checked={form.isVeg} onChange={handleChange}/> Veg Item
            </label>
            <div className="flex gap-3">
              <button onClick={handleSubmit} className="bg-teal-500 px-4 py-2 rounded">{editingId ? "Update Item" : "Add Item"}</button>
              {editingId && <button onClick={cancelEdit} className="bg-gray-600 px-4 py-2 rounded">Cancel</button>}
            </div>
          </div>

          {/* Menu Items List */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Menu Items</h2>
            {items.length === 0 ? <p className="text-gray-400">No menu items found</p> :
              items.map((item) => (
                <div key={item.id} className="bg-gray-800 p-4 rounded-xl flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <img src={item.image || "/foodimages/placeholder.png"} className="w-14 h-14 rounded object-cover"/>
                    <div>
                      <p className="font-bold">{item.name}</p>
                     <p className="text-sm text-gray-400">
  {item.category} • {item.cuisine}
</p>
                      <p className="text-sm">{item.priceHalf && item.priceFull ? `₹${item.priceHalf} / ₹${item.priceFull}` : `₹${item.price}`}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(item)} className="bg-yellow-500 px-3 py-1 rounded">Edit</button>
                    <button onClick={() => handleDelete(item.id!)} className="bg-red-500 px-3 py-1 rounded">Delete</button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      )}

      {/* ===== CATEGORY MANAGER ===== */}
      {activeTab === "category" && (
        <div className="space-y-6">
          {/* Category Form */}
          <div className="bg-gray-800 p-4 rounded-xl space-y-3">
            <h2 className="text-lg font-semibold">{editingCatId ? "✏️ Edit Category" : "➕ Add Category"}</h2>
            <input name="label" value={catForm.label} onChange={handleCatChange} placeholder="Category Label" className="w-full p-2 rounded bg-gray-700"/>
            <input name="value" value={catForm.value} onChange={handleCatChange} placeholder="Category Value" className="w-full p-2 rounded bg-gray-700"/>
            <input type="file" accept="image/*" onChange={handleCatImageChange} className="w-full p-2 rounded bg-gray-700"/>
            {catPreview && <img src={catPreview} className="w-24 h-24 object-cover rounded mt-2"/>}
            {catUploading && <p>Uploading image...</p>}
            <div className="flex gap-3">
              <button onClick={handleCatSubmit} className="bg-teal-500 px-4 py-2 rounded">{editingCatId ? "Update Category" : "Add Category"}</button>
              {editingCatId && <button onClick={cancelCatEdit} className="bg-gray-600 px-4 py-2 rounded">Cancel</button>}
            </div>
          </div>

          {/* Categories List */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Categories</h2>
            {categories.length === 0 ? <p className="text-gray-400">No categories found</p> :
              categories.map((cat) => (
                <div key={cat.id} className="bg-gray-800 p-4 rounded-xl flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <img src={cat.image || "/foodimages/placeholder.png"} className="w-14 h-14 rounded object-cover"/>
                    <p>{cat.label} ({cat.value})</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditCat(cat)} className="bg-yellow-500 px-3 py-1 rounded">Edit</button>
                    <button onClick={() => handleDeleteCat(cat.id!)} className="bg-red-500 px-3 py-1 rounded">Delete</button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      )}

      {/* ===== CUISINE MANAGER ===== */}
     {/* ===== CUISINE MANAGER ===== */}
{activeTab === "cuisine" && (
  <div className="space-y-6">
    <div className="bg-gray-800 p-4 rounded-xl space-y-3">
      <h2 className="text-lg font-semibold">
        {editingCuiId ? "✏️ Edit Cuisine" : "➕ Add Cuisine"}
      </h2>

      <input
        name="label"
        value={cuiForm.label}
        onChange={(e) =>
          setCuiForm({ ...cuiForm, label: e.target.value })
        }
        placeholder="Cuisine Label"
        className="w-full p-2 rounded bg-gray-700"
      />

      <input
        name="value"
        value={cuiForm.value}
        onChange={(e) =>
          setCuiForm({ ...cuiForm, value: e.target.value })
        }
        placeholder="Cuisine Value"
        className="w-full p-2 rounded bg-gray-700"
      />

      <button
        onClick={handleCuisineSubmit}
        className="bg-teal-500 px-4 py-2 rounded"
      >
        {editingCuiId ? "Update Cuisine" : "Add Cuisine"}
      </button>

      {/* CANCEL BUTTON (IMPORTANT) */}
      {editingCuiId && (
        <button
          onClick={() => {
            setCuiForm(emptyCuisine);
            setEditingCuiId(null);
          }}
          className="bg-gray-600 px-4 py-2 rounded ml-2"
        >
          Cancel
        </button>
      )}
    </div>

    {/* LIST */}
    <div className="space-y-2">
      {cuisines.map((c) => (
        <div
          key={c.id}
          className="bg-gray-800 p-3 rounded flex justify-between"
        >
          <p>{c.label}</p>

          <div className="flex gap-2">
            {/* ✅ FIXED EDIT */}
            <button
              onClick={() => {
                setCuiForm(c);
                setEditingCuiId(c.id!);
              }}
              className="bg-yellow-500 px-2 rounded"
            >
              Edit
            </button>

            {/* DELETE */}
            <button
              onClick={async () => {
                await deleteDoc(doc(db, "cuisines", c.id!));
              }}
              className="bg-red-500 px-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


    </div>
  );
}