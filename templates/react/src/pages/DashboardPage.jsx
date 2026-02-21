import { Trash2, PlusCircle, Package, BarChart3, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";
import { useAuthStore } from "../store/authStore";

const DashboardPage = () => {
    const { products, fetchProducts, createProduct, deleteProduct, loading } = useProductStore();
    const { authUser } = useAuthStore();
    const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
    const [isAddOpen, setIsAddOpen] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleAddProduct = (e) => {
        e.preventDefault();
        createProduct(newProduct);
        setNewProduct({ name: "", price: "", image: "" });
        setIsAddOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            deleteProduct(id);
        }
    };

    const totalValue = products.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0);

    return (
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '6rem 1.5rem 3rem' }}>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900" style={{ marginBottom: '0.25rem' }}>
                    Welcome back, {authUser?.name || "User"} 👋
                </h1>
                <p className="text-gray-500 text-lg">Here's what's happening with your products today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ marginBottom: '2.5rem' }}>
                <div style={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: '1rem', padding: '1.5rem' }}>
                    <div className="flex items-center gap-3" style={{ marginBottom: '0.75rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Package className="text-blue-500" style={{ width: '20px', height: '20px' }} />
                        </div>
                        <span className="text-gray-500 text-sm font-medium">Total Products</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{products.length}</p>
                </div>
                <div style={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: '1rem', padding: '1.5rem' }}>
                    <div className="flex items-center gap-3" style={{ marginBottom: '0.75rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <BarChart3 className="text-green-500" style={{ width: '20px', height: '20px' }} />
                        </div>
                        <span className="text-gray-500 text-sm font-medium">Total Value</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">${totalValue.toFixed(2)}</p>
                </div>
                <div style={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: '1rem', padding: '1.5rem' }}>
                    <div className="flex items-center gap-3" style={{ marginBottom: '0.75rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ShoppingBag className="text-amber-500" style={{ width: '20px', height: '20px' }} />
                        </div>
                        <span className="text-gray-500 text-sm font-medium">Avg. Price</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">
                        ${products.length > 0 ? (totalValue / products.length).toFixed(2) : "0.00"}
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6" style={{ marginBottom: '2rem' }}>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900" style={{ marginBottom: '0.25rem' }}>My Products</h2>
                    <p className="text-gray-500">Manage and track your inventory</p>
                </div>
                <button
                    onClick={() => setIsAddOpen(!isAddOpen)}
                    className="btn-black gap-2 h-12 px-6"
                >
                    <PlusCircle className="size-5" />
                    <span>Add Product</span>
                </button>
            </div>

            {isAddOpen && (
                <div style={{ maxWidth: '42rem', margin: '0 auto 2.5rem', padding: '2rem', background: '#fff', border: '1px solid #f3f4f6', borderRadius: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)' }}>
                    <h2 className="text-2xl font-bold text-gray-900" style={{ marginBottom: '1.5rem' }}>Add New Product</h2>
                    <form onSubmit={handleAddProduct} className="flex flex-col gap-6">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Product Name</span></label>
                            <input
                                type="text"
                                placeholder="e.g. Premium Coffee Beans"
                                className="input"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label"><span className="label-text">Price ($)</span></label>
                                <input
                                    type="number"
                                    placeholder="29.99"
                                    className="input"
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Image URL</span></label>
                                <input
                                    type="text"
                                    placeholder="https://images.unsplash.com/..."
                                    className="input"
                                    value={newProduct.image}
                                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3" style={{ paddingTop: '0.5rem' }}>
                            <button
                                type="button"
                                className="btn-outline-pill px-8"
                                onClick={() => setIsAddOpen(false)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn-black px-8" disabled={loading}>
                                {loading ? "Creating..." : "Create Product"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {products.length === 0 && !loading ? (
                <div style={{ textAlign: 'center', padding: '6rem 1rem', background: '#f9fafb', borderRadius: '1.5rem', border: '1px dashed #e5e7eb' }}>
                    <Package style={{ width: '64px', height: '64px', color: '#d1d5db', marginBottom: '1rem', margin: '0 auto 1rem' }} />
                    <p className="text-gray-500 text-xl font-medium">No products found</p>
                    <p className="text-gray-400" style={{ marginTop: '0.5rem' }}>Start by adding your first product above.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product._id} className="card group">
                            <div className="relative aspect-square overflow-hidden bg-gray-50 border-b border-gray-100">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800" }}
                                />
                                <div className="absolute top-4 right-4">
                                    <div className="badge-secondary bg-white/90 backdrop-blur-sm shadow-sm py-1.5 px-3">
                                        ${product.price}
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
                                        {product.name}
                                    </h2>
                                </div>
                                <div className="card-actions" style={{ marginTop: '1rem' }}>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="btn-outline-pill flex-1 py-2 text-red-600 hover:bg-red-50 border-red-100"
                                    >
                                        <Trash2 className="size-4 mr-2" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default DashboardPage;
