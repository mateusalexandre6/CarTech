import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff9800", // Laranja vibrante para destaque
    },
    secondary: {
      main: "#607d8b", // Cinza azulado
    },
    background: {
      default: "#212121", // Preto suave
      paper: "#424242", // Cinza escuro
    },
    text: {
      primary: "#ffffff", // Branco para contraste
      secondary: "#b0bec5", // Cinza claro para detalhes sutis
    },
  },
  typography: {
    fontFamily: '"Rajdhani", sans-serif', // Estilo industrial e moderno
    h1: { fontWeight: 700, textTransform: "uppercase" },
    h2: { fontWeight: 600, textTransform: "uppercase" },
    h3: { fontWeight: 500 },
    h4: { fontWeight: 400 },
    h5: { fontWeight: 300 },
    h6: { fontWeight: 200 },
    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 400 },
    body1: { fontWeight: 400 },
    body2: { fontWeight: 300 },
    button: { textTransform: "uppercase", fontWeight: 700 },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#37474f", // Cinza escuro para contraste
          color: "#ffffff",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          borderBottom: "4px solid #ff9800", // Destaque mecânico na navbar
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          padding: "10px 20px",
          fontWeight: 700,
          "&:hover": {
            backgroundColor: "#f57c00",
            color: "#ffffff", // Branco no hover
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          borderLeft: "5px solid #ff9800", // Destaque mecânico nos cards
          backgroundColor: "#424242", // Mantendo coerência com o tema escuro
        },
      },
    },
  },
});

export default darkTheme;
