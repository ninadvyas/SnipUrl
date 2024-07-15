import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
      <Router>
        <Navbar />
        <Toaster/>
        <Analytics />
        <App />
      </Router>
  </React.StrictMode>
);
