import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // <-- import Link here
import '../css/Form.css'; // Import your CSS file for styling
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import toast here


const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Please fill all fields'); // show toast
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Login successful!');
        navigate('/books');
        // success toast
        localStorage.setItem('token', data.token);

        // TODO: handle token/session and redirect
      } else {
        toast.error(data.message || 'Login failed'); // show toast

      }
    } catch (error) {
      toast.error('Server error');

    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Your password"
          required
        />

        <button type="submit">Login</button>
      </form>

      {message && <p className="message">{message}</p>}

      {/* Add this block for register link */}
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: '#3498db', textDecoration: 'none' }}>
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
