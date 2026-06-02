import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// NOTE: StrictMode is intentionally disabled. Several effects mutate the DOM
// (splitText, GSAP timelines) which don't reset cleanly under double-invoke.
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
