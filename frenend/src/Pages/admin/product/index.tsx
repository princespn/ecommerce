import React, { useState, useEffect } from 'react';
import axios from "axios";


const API_URL = 'https://api.yourdomain.com/v1/products'; 

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Form & Modal State
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ id: null, name: '', category: 'Diagnostics', price: '', stock: '' });

  // Fetch all products on initial render
  useEffect(() => {
    fetchProducts();
  }, []);

  // 1. GET Products
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // 2. CREATE (POST) / UPDATE (PUT) Product
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      name: currentProduct.name,
      category: currentProduct.category,
      price: Number(currentProduct.price),
      stock: Number(currentProduct.stock)
    };

    const isEdit = Boolean(currentProduct.id);
    const endpoint = isEdit ? `${API_URL}/${currentProduct.id}` : API_URL;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to save product');

      const savedProduct = await response.json();

      if (isEdit) {
        setProducts(products.map((p) => (p.id === currentProduct.id ? savedProduct : p)));
      } else {
        setProducts([savedProduct, ...products]);
      }

      setShowModal(false);
    } catch (err) {
      alert(err.message || 'Error saving product');
    } finally {
      setSubmitting(false);
    }
  };

  // 3. DELETE Product
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete product');

      // Remove item from state upon successful API delete
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message || 'Error deleting product');
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  // Filter Logic (Client-side filtering over returned records)
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (stock) => {
    if (stock === 0) return <span className="badge bg-danger">Out of Stock</span>;
    if (stock < 15) return <span className="badge bg-warning text-dark">Low Stock</span>;
    return <span className="badge bg-success">Active</span>;
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center pb-3 mb-4 border-bottom">
        <div>
          <h3 className="fw-bold mb-1">Products Management</h3>
          <p className="text-muted mb-0">Manage catalog items, pricing, and stock inventory via backend API.</p>
        </div>
        <button 
          className="btn btn-primary d-flex align-items-center gap-2"
          onClick={() => {
            setCurrentProduct({ id: null, name: '', category: 'Diagnostics', price: '', stock: '' });
            setShowModal(true);
          }}
        >
          <i className="bi bi-plus-circle"></i> Add New Product
        </button>
      </div>

      {/* Alert Error Box */}
      {error && (
        <div className="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
          <div><i className="bi bi-exclamation-triangle-fill me-2"></i>{error}</div>
          <button className="btn btn-sm btn-outline-danger" onClick={fetchProducts}>Retry</button>
        </div>
      )}

      {/* Control Toolbar */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-3">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0"
                  placeholder="Search products by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Diagnostics">Diagnostics</option>
                <option value="Equipment">Equipment</option>
                <option value="Consumables">Consumables</option>
                <option value="Mobility">Mobility</option>
              </select>
            </div>
            <div className="col-md-2 d-flex align-items-center text-muted">
              <small>Showing {filteredProducts.length} items</small>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="text-muted mt-2 mb-0">Fetching products from server...</p>
                    </td>
                  </tr>
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="ps-4 fw-semibold text-dark">{product.name}</td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          {product.category}
                        </span>
                      </td>
                      <td className="fw-bold">${Number(product.price).toFixed(2)}</td>
                      <td>{product.stock} units</td>
                      <td>{getStatusBadge(product.stock)}</td>
                      <td className="text-end pe-4">
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleEdit(product)}
                          title="Edit"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(product.id)}
                          title="Delete"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                      <i className="bi bi-box-seam fs-1 d-block mb-2"></i>
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">
                  {currentProduct.id ? 'Edit Product' : 'Add New Product'}
                </h5>
                <button type="button" className="btn-close" disabled={submitting} onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSaveProduct}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={currentProduct.name}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Category</label>
                    <select
                      className="form-select"
                      value={currentProduct.category}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                    >
                      <option value="Diagnostics">Diagnostics</option>
                      <option value="Equipment">Equipment</option>
                      <option value="Consumables">Consumables</option>
                      <option value="Mobility">Mobility</option>
                    </select>
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        required
                        value={currentProduct.price}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">Stock Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        required
                        value={currentProduct.stock}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, stock: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light" disabled={submitting} onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Saving...
                      </>
                    ) : (
                      'Save Product'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}