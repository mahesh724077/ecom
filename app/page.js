'use client';

import { useEffect, useState } from 'react';
import "../src/app/globals.css";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    price: '',
    picture: '',
  });

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched products:', data);
        setProducts(data || []);
      })
      .catch((err) => console.error('Failed to fetch products:', err));
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      desc: formData.desc,
      price: parseFloat(formData.price),
      picture: formData.picture,
    };

    try {
      const res = await fetch('http://localhost:3000/api/products/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to register product');
      }

      const newProduct = await res.json();
      setProducts((prev) => [...prev, newProduct]);
      setFormData({ name: '', desc: '', price: '', picture: '' });
    } catch (error) {
      console.error('Error registering product:', error);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-4">🛍️ My E-Commerce App</h1>
      <p className="text-center text-gray-600 mb-10">Backend + Frontend in Next.js + MongoDB</p>

      {/* Product Registration Form */}
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-md rounded-xl p-6 mb-12 border space-y-4 max-w-xl mx-auto"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Register New Product</h2>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full border p-2 rounded-md"
        />
        <textarea
          name="desc"
          placeholder="Description"
          value={formData.desc}
          onChange={handleInputChange}
          required
          className="w-full border p-2 rounded-md"
        />
        <input
          type="number"
          name="price"
          placeholder="Price (INR)"
          value={formData.price}
          onChange={handleInputChange}
          required
          className="w-full border p-2 rounded-md"
        />
        <input
          type="text"
          name="picture"
          placeholder="Image URL"
          value={formData.picture}
          onChange={handleInputChange}
          required
          className="w-full border p-2 rounded-md"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          Register Product
        </button>
      </form>

      {/* Product List */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
         {products.map((product, index) => (
  <div
    key={product._id || `${product.name}-${index}`}
    className="bg-white shadow-lg rounded-xl p-4 border hover:shadow-2xl transition"
  >
    <img
      src={product.picture}
      alt={product.name}
      className="h-48 w-full object-cover rounded-md mb-4"
    />
    <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
    <p className="text-gray-600">{product.desc}</p>
    <p className="text-green-600 font-bold mt-2">₹{product.price}</p>
  </div>
))}

        </div>
      )}
    </div>
  );
}
