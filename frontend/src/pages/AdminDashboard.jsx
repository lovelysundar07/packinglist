import React, { useState, useEffect } from 'react';
import { Trash2, Users, Search, RefreshCw, UserCheck, ShieldAlert } from 'lucide-react';
import { API_BASE } from '../config';

const AdminDashboard = ({ user, triggerToast }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/users`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        triggerToast('Failed to retrieve user directory.', 'danger');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Error connecting to backend database.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRemoveUser = async (targetUser) => {
    if (targetUser.id === user.id) {
      triggerToast('You cannot remove yourself!', 'danger');
      return;
    }

    const confirmed = window.confirm(
      `WARNING: Removing user "${targetUser.username}" will permanently delete their account and ALL their packing list items. This action cannot be undone.\n\nDo you want to proceed?`
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`${API_BASE}/api/users/${targetUser.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== targetUser.id));
        triggerToast(`User "${targetUser.username}" has been removed.`, 'success');
      } else {
        const data = await response.json();
        triggerToast(data.error || 'Failed to remove user.', 'danger');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Error connecting to backend.', 'danger');
    }
  };

  // Stats
  const totalUsers = users.length;
  const adminCount = users.filter((u) => u.role === 'ADMIN').length;
  const clientCount = users.filter((u) => u.role === 'CLIENT').length;

  // Filter users
  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container dashboard-layout">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.3rem' }}>Admin Console</h1>
          <p style={{ color: 'var(--text-muted)' }}>Administrative user control and directory management</p>
        </div>
        <div>
          <button onClick={fetchUsers} className="btn btn-secondary flex-center" style={{ gap: '0.5rem' }}>
            <RefreshCw size={16} /> Refresh Directory
          </button>
        </div>
      </div>

      {/* Stats Summary cards */}
      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-value">{totalUsers}</div>
          <div className="stat-label">Total Users</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-value" style={{ color: '#f72585' }}>{adminCount}</div>
          <div className="stat-label">Administrators</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-value" style={{ color: 'var(--accent)' }}>{clientCount}</div>
          <div className="stat-label">Regular Users</div>
        </div>
      </div>

      {/* Table controls */}
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
            placeholder="Search users by username or email..."
            style={{ paddingLeft: '2.5rem' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Registered Accounts: {filteredUsers.length}
        </div>
      </div>

      {/* User directory table */}
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
      ) : filteredUsers.length === 0 ? (
        <div className="glass-card empty-state flex-center" style={{ flexDirection: 'column' }}>
          <Users size={48} style={{ color: 'var(--surface-border)', marginBottom: '1rem' }} />
          <h3>No Directory Entries</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.4rem' }}>
            No registered accounts match your search filter.
          </p>
        </div>
      ) : (
        <div className="admin-table-container glass-card" style={{ padding: 0 }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email Address</th>
                <th>Account ID</th>
                <th>Role Designation</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <UserCheck size={16} style={{ color: item.role === 'ADMIN' ? '#f72585' : 'var(--primary)' }} />
                      <span>{item.username}</span>
                      {item.id === user.id && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontStyle: 'italic' }}>
                          (You)
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{item.email}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', opacity: 0.6 }}>
                    {item.id}
                  </td>
                  <td>
                    <span className={`badge-role ${item.role === 'ADMIN' ? 'admin' : 'client'}`}>
                      {item.role === 'CLIENT' ? 'USER' : 'ADMIN'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => handleRemoveUser(item)}
                      className="btn btn-secondary btn-icon"
                      disabled={item.id === user.id}
                      style={{
                        opacity: item.id === user.id ? 0.3 : 1,
                        cursor: item.id === user.id ? 'not-allowed' : 'pointer'
                      }}
                      title={item.id === user.id ? 'Self deletion blocked' : 'Delete user account'}
                    >
                      <Trash2 size={16} style={{ color: item.id === user.id ? 'var(--text-muted)' : 'var(--danger)' }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Admin Disclaimer Alert */}
      <div className="glass-card flex-center" style={{
        marginTop: '2rem',
        padding: '1.2rem',
        borderColor: 'rgba(255, 71, 126, 0.15)',
        background: 'rgba(255, 71, 126, 0.03)',
        gap: '0.8rem',
        justifyContent: 'flex-start'
      }}>
        <ShieldAlert size={20} style={{ color: 'var(--danger)', flexShrink: 0 }} />
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <strong>Security Notice:</strong> As an administrator, you possess privileges to terminate registered user accounts. Deleting a user wipes their credentials and associated database documents recursively. Always confirm user identities before executing removals.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
