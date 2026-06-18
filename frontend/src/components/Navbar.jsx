import React from 'react';
import { Briefcase, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <a href="/" className="nav-brand" onClick={(e) => e.preventDefault()}>
          <Briefcase className="brand-icon" size={24} style={{ color: 'var(--primary)' }} />
          <span>PACKING LIST</span>
        </a>

        <div className="nav-profile">
          <div className="user-badge flex-center" style={{ gap: '0.4rem' }}>
            <UserIcon size={14} />
            <span>{user.username}</span>
            {user.role === 'ADMIN' && (
              <span style={{ 
                fontSize: '0.7rem', 
                background: '#f72585', 
                padding: '0.15rem 0.4rem', 
                borderRadius: '4px', 
                color: '#fff', 
                marginLeft: '0.2rem',
                fontWeight: 'bold',
                letterSpacing: '0.05em'
              }}>
                ADMIN
              </span>
            )}
          </div>

          <button onClick={onLogout} className="nav-logout-btn" title="Sign Out">
            <LogOut size={18} />
            <span style={{ display: 'none' }} className="md-show">Sign Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
