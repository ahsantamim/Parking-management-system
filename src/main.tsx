import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 min-h-screen">
      <App />
    </div>
  </StrictMode>
);
