import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  currentTheme: 'light',
  changeCurrentTheme: () => { },
});

export default function ThemeProvider({ children }) {
  // Define o estilo fixo diretamente no document.documentElement
  document.documentElement.classList.remove('dark');
  document.documentElement.style.colorScheme = 'light';

  // Retorna os filhos sem contexto de tema
  return <>{children}</>;
}

export const useThemeProvider = () => useContext(ThemeContext);