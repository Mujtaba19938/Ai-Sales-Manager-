import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { dashboardApi } from '../api/client';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState({
    mode: 'light',
    primaryColor: '#22c55e',
    accentColor: '#f59e0b',
    borderRadius: '0.5rem',
  });
  const saveTimeout = useRef(null);

  useEffect(() => {
    dashboardApi.getConfig().then(config => {
      if (config?.theme) setTheme(config.theme);
    }).catch(() => { });
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme.mode);
    root.style.setProperty('--color-primary', theme.primaryColor);
    root.style.setProperty('--color-accent', theme.accentColor);
    root.style.setProperty('--radius', theme.borderRadius);
  }, [theme]);

  const updateTheme = useCallback((updates) => {
    setTheme(prev => {
      const next = { ...prev, ...updates };
      clearTimeout(saveTimeout.current);
      saveTimeout.current = setTimeout(() => {
        dashboardApi.saveTheme({ theme: next }).catch(() => { });
      }, 1000);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
