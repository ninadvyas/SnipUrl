import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
      <Router>
        <Navbar />
        <Toaster/>
        <App />
      </Router>
  </React.StrictMode>
);
