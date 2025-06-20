import React from 'react';
import book from '../components/assets/bg.jpg'; // Adjust the path as necessary

const HomePage = () => {
  return (
    <>
      <section
        style={{
backgroundImage: `url(${book})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#1f66ad', // fallback color
          padding: '80px 20px',
          textAlign: 'center',
          color: '#fff', // change text color if needed
        }}
      >
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '20px',
          }}
        >
          Discover Your Next Favorite Book
        </h1>
        <p
          style={{
            fontSize: '18px',
            maxWidth: '600px',
            margin: '0 auto 30px',
          }}
        >
          Browse thousands of books across all genres. Find new releases,
          bestsellers, and timeless classics.
        </p>
        <a
          href="/books"
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '18px',
            textDecoration: 'none',
          }}
        >
          Browse Books
        </a>
      </section>
    </>
  );
};

export default HomePage;
