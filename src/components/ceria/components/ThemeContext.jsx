import React, { createContext, useState, useContext, useMemo } from 'react';

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  // Tema selalu 'light'
  const theme = 'light';
  const toggleTheme = () => {}; // tidak melakukan apa pun

  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem('ceriaAdmin') === 'true');
  const [useIntegration, setUseIntegration] = useState(() => localStorage.getItem('ceriaUseIntegration') === 'true');

  const login = async (username, password) => {
    const ok =
      (username === 'adminceria@kemenkopmk.go.id' && password === 'adminceria') ||
      (username.trim().length > 0 && password === 'admin');

    if (ok) {
      sessionStorage.setItem('ceriaAdmin', 'true');
      setIsAdmin(true);
    }
    return ok;
  };

  const logout = () => {
    sessionStorage.removeItem('ceriaAdmin');
    setIsAdmin(false);
  };

  // tetap simpan preferensi integrasi (fitur non-tema)
  React.useEffect(() => {
    localStorage.setItem('ceriaUseIntegration', String(useIntegration));
  }, [useIntegration]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      isAdmin,
      login,
      logout,
      useIntegration,
      setUseIntegration,
    }),
    [isAdmin, useIntegration]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
