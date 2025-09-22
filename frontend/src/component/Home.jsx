import React, { useEffect, useState } from "react";
import grid from "../assets/grid.png";
import list from "../assets/list.png";
import filter from "../assets/filter.png";
import axios from "../lib/axios.js";
import { toast } from "sonner";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 16,
    totalPages: 1,
  });

  const [editingProduct, setEditingProduct] = useState(null);

  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    minPrice: "",
    maxPrice: "",
  });

  const getAllProducts = async (page = meta.page) => {
    try {
      const params = {
        page,
        limit: meta.limit,
        sortBy,
        order,
      };

      if (filters.brands.length) params.brand = filters.brands.join(",");
      if (filters.categories.length) params.category = filters.categories.join(",");
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;

      const res = await axios.get("/products/all", { params });
      setProducts(res.data.data || []);
      setMeta(res.data.meta || { total: 0, page: 1, limit: 16, totalPages: 1 });
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Failed to fetch products.");
    }
  };

  useEffect(() => {
    getAllProducts(1);
    
  }, [sortBy, order, filters]);

  const resetForm = () => {
    setTitle("");
    setBrand("");
    setCategory("");
    setPrice("");
    setStock("");
    setDescription("");
    setEditingProduct(null);
  };

  const openCreate = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setTitle(product.title || "");
    setBrand(product.brand || "");
    setCategory(product.category || "");
    setPrice(product.price ?? "");
    setStock(product.stock ?? "");
    setDescription(product.description || "");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: title.trim(),
      brand: brand.trim(),
      category: category.trim() || "General",
      price: Number(price) || 0,
      stock: Number(stock) || 0,
      description: description.trim(),
      image,
    };
    try {
      if (editingProduct) {
        await axios.put(`/products/update/${editingProduct._id}`, payload);
        toast.success("Product updated successfully.");
      } else {
        await axios.post("/products/create", payload);
        toast.success("Product created successfully.");
      }
      resetForm();
      setIsModalOpen(false);
      getAllProducts(meta.page);
    } catch (err) {
      console.error("Error saving product:", err);
      toast.error("Failed to save product.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/products/delete/${id}`);
      toast.success("Product deleted successfully.");
      getAllProducts(meta.page);
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("Failed to delete product.");
    }
  };

  const goToPage = (p) => {
    getAllProducts(p);
  };

  const toggleBrand = (b) => {
    setFilters((prev) => {
      const brands = prev.brands.includes(b)
        ? prev.brands.filter((x) => x !== b)
        : [...prev.brands, b];
      return { ...prev, brands };
    });
  };

  const toggleCategory = (c) => {
    setFilters((prev) => {
      const categories = prev.categories.includes(c)
        ? prev.categories.filter((x) => x !== c)
        : [...prev.categories, c];
      return { ...prev, categories };
    });
  };

  return (
    <div className="relative">
     
      <div className="w-full bg-[#F9F7E7] py-6 px-4 sm:px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex gap-2 items-center"
            >
              <img src={filter} alt="Filter" className="w-[20px] h-[20px]" />
              Filter
            </button>
            <button>
              <img src={grid} alt="Grid View" className="w-[20px] h-[20px]" />
            </button>
            <button>
              <img src={list} alt="List View" className="w-[20px] h-[20px]" />
            </button>

            <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>

            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {meta.total === 0 ? 0 : (meta.page - 1) * meta.limit + 1}–
                {meta.total === 0
                  ? 0
                  : Math.min(meta.page * meta.limit, meta.total)}
              </span>{" "}
              of <span className="font-medium">{meta.total}</span> results
            </p>
          </div>

         
          <div onClick={openCreate} className="w-full sm:w-[202px] h-[48px] bg-white flex items-center justify-center rounded">
            <button  className="text-[#C6922D] font-semibold">
              Add Product
            </button>
          </div>

         

         
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
             <div className="flex items-center gap-2 h-[30px]">
  
  <span
    style={{
      fontFamily: "Poppins, sans-serif",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "20px",
      lineHeight: "100%",
      letterSpacing: "0%",
      opacity: 1,
    }}
    className="text-gray-700"
  >
    Show
  </span>


  <span
    className="border border-gray-200 bg-white flex items-center justify-center"
    style={{
      width: "54px",
      height: "30px",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "20px",
      lineHeight: "100%",
      letterSpacing: "0%",
      opacity: 1,
      transform: "rotate(0deg)",
    }}
  >
    {products.length}
  </span>
</div>

<div
  className="flex items-center justify-between gap-2 border border-gray-200 rounded px-2"
  style={{
    width: "287px",
    height: "55px",
    opacity: 1,
    transform: "rotate(0deg)",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 400,
    fontStyle: "normal",
    fontSize: "20px",
    lineHeight: "100%",
    letterSpacing: "0%",
  }}
>
  
  <span
    style={{
      width: "83px",
      height: "30px",
      display: "flex",
      alignItems: "center",
      
    }}
    className="text-gray-700"
  >
    Sort by
  </span>

 
  <select
    className="bg-white focus:outline-none"
    style={{
      fontFamily: "Poppins, sans-serif",
      fontWeight: 400,
      fontStyle: "normal",
      fontSize: "20px",
      lineHeight: "100%",
      letterSpacing: "0%",
      
    }}
    value={`${sortBy}-${order}`}
    onChange={(e) => {
      const [field, dir] = e.target.value.split("-");
      setSortBy(field);
      setOrder(dir);
    }}
  >
    <option value="price-desc">Price: High to Low</option>
    <option value="price-asc">Price: Low to High</option>
  </select>
</div>


          </div>
        </div>
      </div>

     
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">

          <div className="bg-white w-full max-w-[400px] rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Filter Products</h2>

            
            <div className="mb-4">
              <h3 className="font-medium">Brands</h3>
              {["Ikea", "Galaxy", "DR.Furni",].map((b) => (
                <label key={b} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(b)}
                    onChange={() => toggleBrand(b)}
                  />
                  {b}
                </label>
              ))}
            </div>

            
            <div className="mb-4">
              <h3 className="font-medium">Categories</h3>
              {["Dinning Table", "Bed", "Table", "Sofa"].map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(c)}
                    onChange={() => toggleCategory(c)}
                  />
                  {c}
                </label>
              ))}
            </div>

           
            <div className="mb-4">
              <h3 className="font-medium">Price Range</h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="border p-1 rounded w-1/2"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, minPrice: e.target.value }))
                  }
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="border p-1 rounded w-1/2"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))
                  }
                />
              </div>
            </div>

            
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsFilterOpen(false);
                  getAllProducts(1);
                }}
                className="px-4 py-2 bg-[#C6922D] text-white rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

   
{isModalOpen && (
  <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
    <div className="bg-white w-full max-w-[500px] rounded-lg shadow-lg">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">
          {editingProduct ? "Update Product" : "Add Product"}
        </h2>
        <button
          onClick={() => {
            setIsModalOpen(false);
            resetForm();
          }}
          className="text-gray-500 hover:text-black"
        >
          ✕
        </button>
      </div>

      <form className="p-4 space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Brand"
          className="w-full border p-2 rounded"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          className="w-full border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full border p-2 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Stock"
          className="w-full border p-2 rounded"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 w-full bg-[#C6922D] text-white py-2 rounded"
          >
            {editingProduct ? "Update Product" : "Save Product"}
          </button>
          <button
            type="button"
            onClick={() => {
              resetForm();
              setIsModalOpen(false);
            }}
            className="flex-1 border rounded py-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}


    
      <div className="h-[30px]"></div>
      <div className="px-4 sm:px-6 md:px-10 pb-10 w-full max-w-[1236px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="relative group shadow rounded overflow-hidden w-full max-w-[285px] mx-auto md:max-w-none h-[446px]"
              style={{ backgroundColor: "#F4F5F7" }}
            >
              <img
                src={`${import.meta.env.VITE_API_URL}${product.image}`}
                alt={product.title}
                className="w-full h-[301px] object-cover"
              />

              
              <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition">
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
                <div className="relative z-10 flex gap-2 flex-wrap justify-center">
                  <button
                    onClick={() => openEdit(product)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    ✏️ Update
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg">{product.title}</h3>
                <p className="text-[#898989]">{product.brand}</p>
                <p className="text-[#3A3A3A] font-bold">Rp {product.price}</p>
              </div>
            </div>
          ))}
        </div>

        
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          <button
            disabled={meta.page === 1}
            onClick={() => goToPage(meta.page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: meta.totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                meta.page === i + 1 ? "bg-[#C6922D] text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={meta.page === meta.totalPages}
            onClick={() => goToPage(meta.page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
