import React from 'react';
import { useNavigate } from 'react-router-dom';
import book from '../components/assets/bg.jpg';

const HomePage = () => {
  const navigate = useNavigate();

  const handleBrowse = () => {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      navigate('/books');
    } else {
      navigate('/login');
    }
  };

  return (
    <section
      style={{
        backgroundImage: `url(${book})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#1f66ad',
        padding: '80px 20px',
        textAlign: 'center',
        color: '#fff',
      }}
    >
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>
        Discover Your Next Favorite Book
      </h1>
      <p style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto 30px' }}>
        Browse thousands of books across all genres. Find new releases,
        bestsellers, and timeless classics.
      </p>
      <button
        onClick={handleBrowse}
        style={{
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '18px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Browse Books
      </button>
    </section>
  );
};

export default HomePage;
