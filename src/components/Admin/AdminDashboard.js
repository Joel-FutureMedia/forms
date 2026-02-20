import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersManagement from './UsersManagement';
import OpeningDaysManagement from './OpeningDaysManagement';
import OpeningHoursManagement from './OpeningHoursManagement';
import FormsManagement from './FormsManagement';
import logo from '../../assets/logo.png';
import './AdminDashboard.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('forms');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <img src={logo} alt="SimplyFound Logo" className="admin-sidebar-logo" />
          <h2>Admin Panel</h2>
        </div>
        
        <nav className="admin-nav">
          <button
            className={activeTab === 'forms' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('forms')}
          >
            📋 Form Submissions
          </button>
          <button
            className={activeTab === 'users' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('users')}
          >
            👥 Users
          </button>
          <button
            className={activeTab === 'openingDays' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('openingDays')}
          >
            📅 Opening Days
          </button>
          <button
            className={activeTab === 'openingHours' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('openingHours')}
          >
            ⏰ Opening Hours
          </button>
        </nav>

        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'forms' && <FormsManagement />}
        {activeTab === 'users' && <UsersManagement />}
        {activeTab === 'openingDays' && <OpeningDaysManagement />}
        {activeTab === 'openingHours' && <OpeningHoursManagement />}
      </div>
    </div>
  );
}

export default AdminDashboard;

