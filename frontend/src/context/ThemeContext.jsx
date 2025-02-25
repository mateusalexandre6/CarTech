import  { createContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import themeLight from "../theme/themeLight";
import themeDark from "../theme/themeDark";
import propTypes from "prop-types";

// Criando o contexto para o tema
const ThemeContext = createContext();

// Provider do tema, que fornece o estado e função para alternar o tema
export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");

  // Alterar o tema entre claro e escuro
  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode); // Salvar a escolha no localStorage
      return newMode;
    });
  };

  // Definir o tema com base no estado `mode`
  const theme = useMemo(() => (mode === "light" ? themeLight : themeDark), [mode]);

  // Ação a ser realizada quando o estado de `mode` for alterado
  useEffect(() => {
    console.log(`Modo atual: ${mode}`); // Verificação para ver se o modo está sendo alterado corretamente
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext };

ThemeProvider.propTypes = {
    children: propTypes.node.isRequired
    };
    