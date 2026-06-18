import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import ClientDashboard from './pages/ClientDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState([]);

  // Load user from localStorage on start
  useEffect(() => {
    const savedUser = localStorage.getItem('packing_list_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Utility to show beautiful toasts
  const triggerToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('packing_list_user', JSON.stringify(userData));
    triggerToast(`Welcome back, ${userData.username}!`);
  };

  const handleLogout = () => {
    triggerToast('Logged out successfully.');
    setUser(null);
    localStorage.removeItem('packing_list_user');
  };

  if (loading) {
    return (
      <div className="flex-center" style={{ height: '100vh', flexDirection: 'column', gap: '1rem' }}>
        <div className="loader" style={{
          width: '50px',
          height: '50px',
          border: '3px solid var(--surface-border)',
          borderTopColor: 'var(--primary)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ color: 'var(--text-muted)' }}>Preparing checklist...</p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {user && <Navbar user={user} onLogout={handleLogout} />}
      
      <Routes>
        {/* Unauthenticated routes */}
        <Route 
          path="/login" 
          element={
            !user ? (
              <Login onLogin={handleLogin} triggerToast={triggerToast} />
            ) : user.role === 'ADMIN' ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          } 
        />
        <Route 
          path="/register" 
          element={
            !user ? (
              <Register triggerToast={triggerToast} />
            ) : user.role === 'ADMIN' ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          } 
        />

        {/* User Dashboard Route */}
        <Route 
          path="/dashboard" 
          element={
            user && user.role === 'CLIENT' ? (
              <ClientDashboard user={user} triggerToast={triggerToast} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        {/* Admin Dashboard Route */}
        <Route 
          path="/admin" 
          element={
            user && user.role === 'ADMIN' ? (
              <AdminDashboard user={user} triggerToast={triggerToast} />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        {/* Default Fallback Redirect */}
        <Route 
          path="*" 
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : user.role === 'ADMIN' ? (
              <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          } 
        />
      </Routes>

      {/* Global animated toasts overlay */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`}>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </BrowserRouter>
  );
}

export default App;
