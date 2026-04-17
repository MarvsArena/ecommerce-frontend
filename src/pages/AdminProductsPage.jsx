import { useEffect, useMemo, useState } from "react";

import { ChevronDownIcon } from "../components/Icons";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../services/productService";
import { categories } from "../utils/constants";
import { formatCurrency } from "../utils/currency";

const initialForm = {
  name: "",
  description: "",
  price: "",
  category: "Frontal Wigs",
  stock: "",
  featured: true,
  texture: "",
  length: "",
  capType: "",
  imageUrls: "",
};

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const productCategories = useMemo(() => categories.filter((item) => item !== "All"), []);

  const fetchProductsData = async () => {
    setLoading(true);

    try {
      const productData = await getProducts();
      setProducts(productData);
      setError("");
    } catch (fetchError) {
      setError(fetchError.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  const resetForm = () => {
    setForm(initialForm);
    setFiles([]);
    setEditingId(null);
  };

  const buildFormData = () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    Array.from(files).forEach((file) => formData.append("images", file));
    return formData;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setFeedback("");

    try {
      const formData = buildFormData();

      if (editingId) {
        await updateProduct(editingId, formData);
        setFeedback("Product updated successfully.");
      } else {
        await createProduct(formData);
        setFeedback("Product created successfully.");
      }

      resetForm();
      fetchProductsData();
    } catch (submitError) {
      setError(submitError.response?.data?.message || "Unable to save product");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      featured: product.featured,
      texture: product.texture || "",
      length: product.length || "",
      capType: product.capType || "",
      imageUrls: product.images.join(", "),
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setFeedback("Product deleted successfully.");
      fetchProductsData();
    } catch (deleteError) {
      setError(deleteError.response?.data?.message || "Unable to delete product");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-brand-gold">Products</p>
        <h2 className="mt-3 font-display text-4xl text-slate-950 dark:text-white">Inventory management</h2>
      </div>

      {error && <div className="alert-error px-5 py-4">{error}</div>}
      {feedback && <div className="alert-success px-5 py-4">{feedback}</div>}

      <div className="grid gap-8 xl:grid-cols-[420px_1fr]">
        <form onSubmit={handleSubmit} className="luxury-panel h-fit p-7 xl:sticky xl:top-28">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-3xl text-slate-950 dark:text-white">
              {editingId ? "Edit Product" : "Add Product"}
            </h3>
            {editingId && (
              <button type="button" onClick={resetForm} className="text-sm text-brand-gold">
                Cancel
              </button>
            )}
          </div>

          <div className="mt-6 space-y-4">
            {[
              ["name", "Product Name"],
              ["description", "Description"],
              ["price", "Price"],
              ["stock", "Stock"],
              ["texture", "Texture"],
              ["length", "Length"],
              ["capType", "Cap Type"],
              ["imageUrls", "Image URLs (comma separated)"],
            ].map(([field, label]) => (
              <label key={field}>
                <span className="field-label">{label}</span>
                {field === "description" || field === "imageUrls" ? (
                  <textarea
                    rows={field === "description" ? 4 : 3}
                    value={form[field]}
                    onChange={(event) => setForm((current) => ({ ...current, [field]: event.target.value }))}
                    className="input-field min-h-[120px]"
                    required={field === "description"}
                  />
                ) : (
                  <input
                    type={field === "price" || field === "stock" ? "number" : "text"}
                    value={form[field]}
                    onChange={(event) => setForm((current) => ({ ...current, [field]: event.target.value }))}
                    className="input-field"
                    required={["name", "price", "stock"].includes(field)}
                  />
                )}
              </label>
            ))}

            <label>
              <span className="field-label">Category</span>
              <div className="relative">
                <select
                  value={form.category}
                  onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                  className="input-field appearance-none pr-11"
                >
                  {productCategories.map((category) => (
                    <option key={category} value={category} className="bg-[#fbf3e7] text-slate-950 dark:bg-black dark:text-white">
                      {category}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 dark:text-white/45" />
              </div>
            </label>

            <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white/72 px-4 py-4 dark:border-white/10 dark:bg-white/[0.03]">
              <input
                type="checkbox"
                checked={Boolean(form.featured)}
                onChange={(event) => setForm((current) => ({ ...current, featured: event.target.checked }))}
                className="h-4 w-4 accent-[#d4af37]"
              />
              <span className="text-sm text-slate-700 dark:text-white/75">Feature this product on the homepage</span>
            </label>

            <label>
              <span className="field-label">Upload Images</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => setFiles(event.target.files)}
                className="input-field file:mr-4 file:rounded-full file:border-0 file:bg-brand-gold file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black"
              />
            </label>
          </div>

          <button type="submit" className="button-primary mt-6 w-full justify-center">
            {editingId ? "Update Product" : "Create Product"}
          </button>
        </form>

        <div className="luxury-panel p-7">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-3xl text-slate-950 dark:text-white">Product Inventory</h3>
            <p className="text-sm text-slate-500 dark:text-white/50">{products.length} products</p>
          </div>

          {loading ? (
            <LoadingSpinner label="Loading products" />
          ) : (
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {products.map((product) => (
                <article key={product._id} className="rounded-[1.8rem] border border-black/10 bg-white/72 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                  <div className="flex gap-4">
                    <img src={product.images[0]} alt={product.name} className="h-28 w-24 rounded-2xl object-cover" />
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-[0.3em] text-brand-gold">{product.category}</p>
                      <h4 className="mt-2 font-display text-2xl text-slate-950 dark:text-white">{product.name}</h4>
                      <p className="mt-2 text-sm text-slate-500 dark:text-white/55">
                        {formatCurrency(product.price)} • {product.stock} in stock
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 flex gap-3">
                    <button type="button" onClick={() => handleEdit(product)} className="button-secondary flex-1 justify-center">
                      Edit
                    </button>
                    <button type="button" onClick={() => handleDelete(product._id)} className="inline-flex flex-1 items-center justify-center rounded-full border border-rose-400/20 bg-rose-500/10 px-5 py-3 text-sm font-medium text-rose-700 transition hover:bg-rose-500/20 dark:text-rose-200">
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProductsPage;
