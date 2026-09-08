import React, { useState } from 'react';

export interface Category {
  id: number | string;
  name: string;
  slug: string;
  parent_id?: number | string | null;
}

interface CategoryAdminProps {
  categories: Category[];
  onAddCategory?: (categoryData: Omit<Category, 'id'>) => void;
  onUpdateCategory?: (id: number | string, categoryData: Partial<Category>) => void;
  onDeleteCategory?: (id: number | string) => void;
}

export const CategoryAdmin: React.FC<CategoryAdminProps> = ({
  categories = [],
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
}) => {
  // Modal State Controls
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form Field States
  const [name, setName] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [parentId, setParentId] = useState<string>('0');

  // Open modal for CREATING a category
  const handleOpenAddModal = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setParentId('0');
    setShowModal(true);
  };

  // Open modal for EDITING an existing category
  const handleOpenEditModal = (category: Category) => {
    setEditingCategory(category);
    setName(category.name);
    setSlug(category.slug);
    setParentId(category.parent_id ? String(category.parent_id) : '0');
    setShowModal(true);
  };

  // Auto-generate URL slug from name input
  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCategory) {
      setSlug(val.toLowerCase().trim().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-'));
    }
  };

  // Handle Form Submit (Add or Update)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedParentId = parentId === '0' ? null : Number(parentId);

    if (editingCategory) {
      if (onUpdateCategory) {
        onUpdateCategory(editingCategory.id, {
          name,
          slug,
          parent_id: formattedParentId,
        });
      }
    } else {
      if (onAddCategory) {
        onAddCategory({
          name,
          slug,
          parent_id: formattedParentId,
        });
      }
    }

    setShowModal(false);
  };

  // Handle Category Deletion
  const handleDelete = (id: number | string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      if (onDeleteCategory) {
        onDeleteCategory(id);
      }
    }
  };

  // Helper function to resolve parent name
  const getParentName = (pid?: number | string | null) => {
    if (!pid || pid === 0 || pid === '0') return 'Root (Top Level)';
    const parent = categories.find((c) => String(c.id) === String(pid));
    return parent ? parent.name : 'Root (Top Level)';
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 bg-white p-4 mb-4">
      {/* Header Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold text-dark mb-1">Category Management</h5>
          <p className="text-muted small mb-0">Organize and manage top-level and nested product categories.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="btn btn-primary fw-bold px-3 py-2 rounded-3 shadow-sm text-white"
        >
          <i className="bi bi-plus-lg me-1"></i> Add New Category
        </button>
      </div>

      {/* Categories Table */}
      <div className="table-responsive">
        <table className="table align-middle table-hover mb-0">
          <thead className="table-light small text-secondary">
            <tr>
              <th>ID</th>
              <th>CATEGORY NAME</th>
              <th>SLUG</th>
              <th>PARENT CATEGORY</th>
              <th className="text-end">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="small">
            {categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-muted">
                  No categories found. Click <strong>Add New Category</strong> to create one.
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id}>
                  <td className="fw-bold text-dark font-monospace">#{cat.id}</td>
                  <td className="fw-semibold text-dark">
                    <i className="bi bi-box-seam me-2 text-primary"></i>
                    {cat.name}
                  </td>
                  <td>
                    <span className="badge bg-light text-secondary border font-monospace">{cat.slug}</span>
                  </td>
                  <td>
                    <span className="badge bg-info-subtle text-info-emphasis border border-info-subtle">
                      {getParentName(cat.parent_id)}
                    </span>
                  </td>
                  <td className="text-end">
                    <button
                      onClick={() => handleOpenEditModal(cat)}
                      className="btn btn-light btn-sm shadow-none me-1"
                      title="Edit Category"
                    >
                      <i className="bi bi-pencil-square text-primary"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="btn btn-light btn-sm shadow-none text-danger"
                      title="Delete Category"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Category Modal */}
      {showModal && (
        <div className="modal fade show d-block tab-modal-backdrop" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body py-3">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Category Name</label>
                    <input
                      type="text"
                      className="form-control rounded-3"
                      placeholder="e.g., Electronics"
                      value={name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Category Slug</label>
                    <input
                      type="text"
                      className="form-control rounded-3 font-monospace"
                      placeholder="e.g., electronics"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Parent Category</label>
                    <select
                      className="form-select rounded-3"
                      value={parentId}
                      onChange={(e) => setParentId(e.target.value)}
                    >
                      <option value="0">None (Top-Level Category)</option>
                      {categories
                        .filter((c) => String(c.id) !== String(editingCategory?.id)) // Prevent self-referencing
                        .map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="modal-footer border-0 pt-0">
                  <button
                    type="button"
                    className="btn btn-light fw-semibold rounded-3"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary fw-bold rounded-3 text-white px-4">
                    {editingCategory ? 'Save Changes' : 'Create Category'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};