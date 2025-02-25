import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

// Hook para acessar o contexto do tema
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  
  // Verificar se o contexto está disponível
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }

  return context;
};
