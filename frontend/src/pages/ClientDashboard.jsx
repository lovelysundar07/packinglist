import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, CheckSquare, Square, RefreshCw, Luggage } from 'lucide-react';

const ClientDashboard = ({ user, triggerToast }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  // Form states
  const [itemName, setItemName] = useState('');
  const [itemQty, setItemQty] = useState(1);
  const [editingItem, setEditingItem] = useState(null);

  // Fetch items on mount
  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/items/user/${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        triggerToast('Failed to load items.', 'danger');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Could not fetch items. Is the backend server online?', 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [user.id]);

  // Handle Add Item
  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!itemName.trim() || itemQty < 1) {
      triggerToast('Please provide a valid name and quantity.', 'danger');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: itemName,
          quantity: itemQty,
          packed: false,
          userId: user.id
        })
      });

      if (response.ok) {
        const newItem = await response.json();
        setItems((prev) => [...prev, newItem]);
        triggerToast(`Added "${newItem.name}" to your list.`);
        setIsAddOpen(false);
        setItemName('');
        setItemQty(1);
      } else {
        triggerToast('Failed to add item.', 'danger');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Error connecting to backend.', 'danger');
    }
  };

  // Toggle Packed status
  const handleTogglePacked = async (item) => {
    try {
      const updatedItem = { ...item, packed: !item.packed };
      const response = await fetch(`http://localhost:8080/api/items/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem)
      });

      if (response.ok) {
        setItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, packed: updatedItem.packed } : i))
        );
        triggerToast(
          updatedItem.packed 
            ? `Packed "${item.name}"!` 
            : `Unpacked "${item.name}".`
        );
      } else {
        triggerToast('Failed to update item status.', 'danger');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Error updating status.', 'danger');
    }
  };

  // Open Edit Modal
  const openEditModal = (item) => {
    setEditingItem(item);
    setItemName(item.name);
    setItemQty(item.quantity);
    setIsEditOpen(true);
  };

  // Handle Update Item
  const handleUpdateItem = async (e) => {
    e.preventDefault();
    if (!itemName.trim() || itemQty < 1) {
      triggerToast('Please enter a valid name and quantity.', 'danger');
      return;
    }

    try {
      const updatedItem = { ...editingItem, name: itemName, quantity: itemQty };
      const response = await fetch(`http://localhost:8080/api/items/${editingItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem)
      });

      if (response.ok) {
        setItems((prev) =>
          prev.map((i) => (i.id === editingItem.id ? updatedItem : i))
        );
        triggerToast(`Updated "${itemName}".`);
        setIsEditOpen(false);
        setEditingItem(null);
        setItemName('');
        setItemQty(1);
      } else {
        triggerToast('Failed to update item.', 'danger');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Error updating item.', 'danger');
    }
  };

  // Handle Delete Item
  const handleDeleteItem = async (itemId, name) => {
    if (!window.confirm(`Are you sure you want to remove "${name}"?`)) return;

    try {
      const response = await fetch(`http://localhost:8080/api/items/${itemId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setItems((prev) => prev.filter((i) => i.id !== itemId));
        triggerToast(`Removed "${name}" from list.`, 'danger');
      } else {
        triggerToast('Failed to delete item.', 'danger');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Error deleting item.', 'danger');
    }
  };

  // Calculations for stats
  const totalItems = items.length;
  const packedItems = items.filter((i) => i.packed).length;
  const completionPercentage = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

  // Filter items based on search term
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container dashboard-layout">
      {/* Stats Summary Header */}
      <div className="dashboard-header">
        <div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.3rem' }}>My Packing List</h1>
          <p style={{ color: 'var(--text-muted)' }}>Keep track of your luggage and travel essentials</p>
        </div>
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <button onClick={fetchItems} className="btn btn-secondary btn-icon" title="Refresh List">
            <RefreshCw size={18} />
          </button>
          <button onClick={() => setIsAddOpen(true)} className="btn btn-primary">
            <Plus size={18} /> Add New Item
          </button>
        </div>
      </div>

      {/* Progress Card */}
      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-value">{totalItems}</div>
          <div className="stat-label">Total Items</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-value" style={{ color: 'var(--success)' }}>{packedItems}</div>
          <div className="stat-label">Packed</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-value" style={{ color: 'var(--accent)' }}>
            {totalItems - packedItems}
          </div>
          <div className="stat-label">Remaining</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-value">{completionPercentage}%</div>
          <div className="stat-label">Progress</div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '10px',
            height: '6px',
            width: '100%',
            marginTop: '0.8rem',
            overflow: 'hidden'
          }}>
            <div style={{
              background: 'linear-gradient(90deg, var(--primary), var(--success))',
              height: '100%',
              width: `${completionPercentage}%`,
              transition: 'width 0.4s ease-out'
            }}></div>
          </div>
        </div>
      </div>

      {/* Search and Packing items */}
      <div className="items-controls">
        <div className="search-bar" style={{ position: 'relative' }}>
          <Search size={18} style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)'
          }} />
          <input
            type="text"
            placeholder="Search items..."
            style={{ paddingLeft: '2.5rem' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Showing {filteredItems.length} of {totalItems} items
        </div>
      </div>

      {loading ? (
        <div className="flex-center" style={{ height: '200px' }}>
          <div className="loader" style={{
            width: '40px',
            height: '40px',
            border: '3px solid var(--surface-border)',
            borderTopColor: 'var(--primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="glass-card empty-state flex-center" style={{ flexDirection: 'column' }}>
          <Luggage size={48} style={{ color: 'var(--surface-border)', marginBottom: '1rem' }} />
          <h3>No Items Found</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.4rem' }}>
            {search ? 'Try adjusting your search filter.' : 'Click "Add New Item" to populate your checklist.'}
          </p>
        </div>
      ) : (
        <div className="items-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className={`glass-card item-card ${item.packed ? 'packed' : 'unpacked'}`}>
              <div className="item-card-header">
                <div>
                  <h3 className="item-title">{item.name}</h3>
                  <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.4rem', alignItems: 'center' }}>
                    <span className="item-qty">Qty: {item.quantity}</span>
                    <span style={{
                      fontSize: '0.75rem',
                      color: item.packed ? 'var(--success)' : 'var(--primary)',
                      fontWeight: 600
                    }}>
                      {item.packed ? 'Packed' : 'To Pack'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="item-card-footer">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={item.packed}
                    onChange={() => handleTogglePacked(item)}
                  />
                  <div className="custom-checkbox"></div>
                  <span>Mark as packed</span>
                </label>

                <div className="item-actions">
                  <button onClick={() => openEditModal(item)} className="btn btn-secondary btn-icon" title="Edit item details">
                    <Edit2 size={14} style={{ color: 'var(--accent)' }} />
                  </button>
                  <button onClick={() => handleDeleteItem(item.id, item.name)} className="btn btn-secondary btn-icon" title="Delete item">
                    <Trash2 size={14} style={{ color: 'var(--danger)' }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Item Modal */}
      {isAddOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Add New Essential</h3>
              <button onClick={() => setIsAddOpen(false)} className="modal-close">&times;</button>
            </div>
            <form onSubmit={handleAddItem}>
              <div className="form-group">
                <label className="form-label" htmlFor="itemName">Item Name</label>
                <input
                  type="text"
                  id="itemName"
                  placeholder="e.g., Passport, Charging Cables, Sneakers"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="itemQty">Quantity</label>
                <input
                  type="number"
                  id="itemQty"
                  min="1"
                  value={itemQty}
                  onChange={(e) => setItemQty(parseInt(e.target.value) || 1)}
                />
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setIsAddOpen(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Add Item</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {isEditOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Modify Item</h3>
              <button onClick={() => setIsEditOpen(false)} className="modal-close">&times;</button>
            </div>
            <form onSubmit={handleUpdateItem}>
              <div className="form-group">
                <label className="form-label" htmlFor="editName">Item Name</label>
                <input
                  type="text"
                  id="editName"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="editQty">Quantity</label>
                <input
                  type="number"
                  id="editQty"
                  min="1"
                  value={itemQty}
                  onChange={(e) => setItemQty(parseInt(e.target.value) || 1)}
                />
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setIsEditOpen(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
