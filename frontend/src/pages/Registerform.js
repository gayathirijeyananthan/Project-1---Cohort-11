import React, { useState } from 'react';
import '../css/Form.css'; // Import your CSS file for styling
import { toast } from 'react-toastify'; // import toast here

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = e => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.email || !formData.password) {
            toast.error('Please fill all fields'); // show toast

            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Register Successful'); // show toast

                setFormData({ name: '', email: '', password: '' });
            } else {
                toast.error(data.message || 'Registration failed'); // show toast

            }
        } catch (error) {
            toast.error('Server error'); // show toast
        }
    };

    return (
        <div className="form-container">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit} className="form">
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                />

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
                    placeholder="Create a password"
                    required
                />

                <button type="submit">Register</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default RegisterForm;
