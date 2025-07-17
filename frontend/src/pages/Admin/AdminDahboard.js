import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import axios from 'axios';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {

      const token = localStorage.getItem('token'); // Get the stored token

       const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }}

    if (activeTab === 'users') {
      axios.get('http://localhost:5000/api/user/allusers', config)
        .then(res => setUsers(res.data))
        .catch(err => console.error(err));
    } else if (activeTab === 'orders') {
      axios.get('http://localhost:5000/api/order', config)
        .then(res => setOrders(res.data))
        .catch(err => console.error(err));
    } else if (activeTab === 'products') {
      axios.get('/api/book')
        .then(res => setProducts(res.data))
        .catch(err => console.error(err));
    }
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return (
          <div>
            <h2>All Users</h2>
            <ul>
              {users.map(user => (
                <li key={user._id}>{user.name} - {user.email}</li>
              ))}
            </ul>
          </div>
        );
      case 'orders':
        return (
          <div>
            <h2>All Orders</h2>
            <ul>
              {orders.map(order => (
                <li key={order._id}>Order #{order._id} - {order.status}</li>
              ))}
            </ul>
          </div>
        );
      case 'products':
        return (
          <div>
            <h2>All Products</h2>
            <ul>
              {products.map(product => (
                <li key={product._id}>{product.name} - ${product.price}</li>
              ))}
            </ul>
          </div>
        );
      default:
        return (
          <>
            <section className="stats-cards">
              <div className="card"><h3>Total Users</h3><p>1,245</p></div>
              <div className="card"><h3>Orders Today</h3><p>76</p></div>
              <div className="card"><h3>Products</h3><p>134</p></div>
              <div className="card"><h3>Revenue</h3><p>$9,450</p></div>
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
          </>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="logo">Admin Panel</h2>
        <nav>
          <ul>
            <li onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'active' : ''}>Dashboard</li>
            <li onClick={() => setActiveTab('users')} className={activeTab === 'users' ? 'active' : ''}>Users</li>
            <li onClick={() => setActiveTab('orders')} className={activeTab === 'orders' ? 'active' : ''}>Orders</li>
            <li onClick={() => setActiveTab('products')} className={activeTab === 'products' ? 'active' : ''}>Products</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <div className="user-info">Welcome, Admin</div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
