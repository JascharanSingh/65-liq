import React, { useEffect, useState } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import { useNavigate } from "react-router-dom";

const categoryMap = {
  Whiskey: ["Canadian", "Flavored", "American", "Irish", "Bourbon", "Single Malt", "More Whiskey", "Scotch", "Rye"],
  Rum: ["White", "Spiced", "Flavored", "Dark", "Aged", "Gold"],
  Wine: ["Red Wine", "Champagne & Sparkling Wine", "Dessert Wine", "Pink Wine", "White Wine", "Speciality Wine"],
  "Brandy & Cognac": ["Speciality Wine", "Champagne & Sparkling Wine", "Dessert Wine", "White Wine", "Red Wine", "Pink Wine"],
  Spirits: ["Ready-to-Drink Cocktails", "Soju", "Gin", "Liqueur, Cordials, & Schnapps"],
  "Tequila & Mezcal": ["Reposado", "Gold", "Blanco", "Anejo", "Mezcal"],
  "Seltzer & Hard Beverages": ["Hard Seltzer", "Ready to Drink Cocktails & Shots"],
  Vodka: [],
  "Non-Alcoholic Drinks": [],
  "Best Seller": [],
  Trending: [],
  "New Arrival": [],
};

export default function Admin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: "",
    tagline: "",
    description: "",
    volume: "",
    alcoholPercent: "",
    actualPrice: "",
    discount: "",
    sellingPrice: "",
    stock: "",
    category: "",
    subcategory: "",
    origin: "",
    brand: "",
    image: null,
    agree: false,
    onSale: false,
    bestSeller: false,
    trending: false,
    newArrival: false,
  });

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/admin/verify", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        if (data.role !== "admin" && data.user?.role !== "admin") throw new Error("Unauthorized");
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  useEffect(() => {
    fetch("http://localhost:4000/api/products", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("❌ Failed to fetch products", err));
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:4000/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/login");
    } catch (err) {
      console.error("❌ Logout failed", err);
      alert("Logout failed");
    }
  };

  const handleSubmit = () => {
    if (!formData.image) return alert("Please upload an image.");

    const url = editingProductId
      ? `http://localhost:4000/api/products/${editingProductId}`
      : "http://localhost:4000/api/products";

    const method = editingProductId ? "PUT" : "POST";

    const payload = {
      name: formData.productName,
      price: formData.sellingPrice,
      description: formData.description,
      image: formData.image,
      category: formData.category,
      subcategory: formData.subcategory,
      onSale: formData.onSale,
      brand: formData.brand,
      volume: formData.volume,
      bestSeller: formData.bestSeller,
      trending: formData.trending,
      newArrival: formData.newArrival,
    };

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save product");
        return res.json();
      })
      .then(() => {
        alert("✅ Product saved");
        return fetch("http://localhost:4000/api/products", {
          credentials: "include",
        });
      })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => alert(err.message));

    setEditingProductId(null);
    setFormData({
      productName: "",
      tagline: "",
      description: "",
      volume: "",
      alcoholPercent: "",
      actualPrice: "",
      discount: "",
      sellingPrice: "",
      stock: "",
      category: "",
      subcategory: "",
      origin: "",
      brand: "",
      image: null,
      agree: false,
      onSale: false,
      bestSeller: false,
      trending: false,
      newArrival: false,
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this product?")) return;
    fetch(`http://localhost:4000/api/products/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(() => setProducts(products.filter((p) => p._id !== id)))
      .catch((err) => alert("❌ Delete failed"));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow rounded relative">
      {/* 🔐 Logout Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">{editingProductId ? "Edit" : "Add / Edit Liquor Product"}</h2>

      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input type="text" placeholder="Product Name" value={formData.productName} onChange={(e) => setFormData({ ...formData, productName: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="Volume" value={formData.volume} onChange={(e) => setFormData({ ...formData, volume: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="Selling Price" value={formData.sellingPrice} onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })} className="border p-2 rounded" />
        <input type="text" placeholder="Brand" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} className="border p-2 rounded" />
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value, subcategory: "" })
          }
          className="border p-2 rounded"
        >
          <option value="">Select Category</option>
          {Object.keys(categoryMap).map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        {categoryMap[formData.category]?.length > 0 && (
          <select
            value={formData.subcategory}
            onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="">Select Subcategory</option>
            {categoryMap[formData.category].map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        )}
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        <label><input type="checkbox" checked={formData.onSale} onChange={(e) => setFormData({ ...formData, onSale: e.target.checked })} /> On Sale</label>
        <label><input type="checkbox" checked={formData.bestSeller} onChange={(e) => setFormData({ ...formData, bestSeller: e.target.checked })} /> Best Seller</label>
        <label><input type="checkbox" checked={formData.trending} onChange={(e) => setFormData({ ...formData, trending: e.target.checked })} /> Trending</label>
        <label><input type="checkbox" checked={formData.newArrival} onChange={(e) => setFormData({ ...formData, newArrival: e.target.checked })} /> New Arrival</label>
      </div>

      <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full mt-4 border p-2 rounded" rows={4} />

      <div className="mt-4">
        <label className="block font-semibold mb-2">Upload Image</label>
        <IKContext publicKey="public_bPlFafmths0AlYRK+uMj4YnhEUs=" urlEndpoint="https://ik.imagekit.io/fo27dnu54" authenticator={async () => {
          const res = await fetch("http://localhost:4000/api/imagekit/auth");
          return res.json();
        }}>
          <IKUpload fileName="liquor-product" folder="/liquor-products" useUniqueFileName={true} onSuccess={(res) => setFormData((prev) => ({ ...prev, image: res.url }))} onError={() => alert("Image upload failed.")} />
        </IKContext>
        {formData.image && <img src={formData.image} alt="Preview" className="mt-3 w-40 h-auto rounded shadow" />}
      </div>

      <button onClick={handleSubmit} className="bg-black text-white px-6 py-2 mt-6 rounded hover:bg-gray-800">
        {editingProductId ? "Update Product" : "Add Product"}
      </button>

      <hr className="my-6" />
      <h3 className="text-xl font-bold mb-4">Existing Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.filter((p) => (p?.name || "").toLowerCase().includes(search.toLowerCase())).map((product) => (
          <div key={product._id} className="p-4 border rounded shadow-sm bg-white hover:shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
            <h4 className="font-semibold mt-2 text-base">{product.name}</h4>
            <p className="text-green-700 font-bold text-sm">${product.price}</p>
            <p className="text-xs text-gray-600">{product.category}{product.subcategory ? ` → ${product.subcategory}` : ""}</p>
            <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
            <div className="flex justify-between mt-3">
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm" onClick={() => {
                setEditingProductId(product._id);
                setFormData({
                  productName: product.name || "",
                  tagline: "",
                  description: product.description || "",
                  volume: product.volume || "",
                  alcoholPercent: "",
                  actualPrice: "",
                  discount: "",
                  sellingPrice: product.price || "",
                  stock: "",
                  category: product.category || "",
                  subcategory: product.subcategory || "",
                  origin: "",
                  brand: product.brand || "",
                  image: product.image || null,
                  agree: false,
                  onSale: product.onSale || false,
                  bestSeller: product.bestSeller || false,
                  trending: product.trending || false,
                  newArrival: product.newArrival || false,
                });
              }}>Edit</button>
              <button className="bg-red-600 text-white px-3 py-1 rounded text-sm" onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}