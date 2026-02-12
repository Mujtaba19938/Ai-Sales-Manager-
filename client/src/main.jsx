import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { DateRangeProvider } from './context/DateRangeContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <DateRangeProvider>
          <App />
        </DateRangeProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
