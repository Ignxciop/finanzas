import React from 'react';
import Navbar from '../ui/layout/Navbar';
import Footer from '../ui/layout/Footer';
import HomePage from '../features/home/pages/HomePage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
