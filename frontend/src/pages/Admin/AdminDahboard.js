import React from 'react';
import './AdminDashboard.css'; // Assuming you have a CSS file for styling

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="logo">Admin Panel</h2>
        <nav>
          <ul>
            <li className="active">Dashboard</li>
            <li>Users</li>
            <li>Orders</li>
            <li>Products</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>Dashboard</h1>
          <div className="user-info">Welcome, Admin</div>
        </header>

        <section className="stats-cards">
          <div className="card">
            <h3>Total Users</h3>
            <p>1,245</p>
          </div>
          <div className="card">
            <h3>Orders Today</h3>
            <p>76</p>
          </div>
          <div className="card">
            <h3>Products</h3>
            <p>134</p>
          </div>
          <div className="card">
            <h3>Revenue</h3>
            <p>$9,450</p>
          </div>
        </section>

        <section className="content-section">
          <h2>Recent Activity</h2>
          <ul className="activity-list">
            <li>User John registered</li>
            <li>Order #1234 completed</li>
            <li>New product added: Wireless Mouse</li>
            <li>System maintenance scheduled</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
