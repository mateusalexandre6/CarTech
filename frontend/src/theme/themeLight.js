import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#d35400", // Laranja queimado, remetendo a ferrugem/ferramentas
    },
    secondary: {
      main: "#455a64", // Cinza escuro, lembrando metais e peças
    },
    background: {
      default: "#f4f4f4", // Cinza claro, remetendo a chão de oficina
      paper: "#ffffff",
    },
    text: {
      primary: "#212121", // Preto para melhor contraste
      secondary: "#455a64", // Cinza escuro para sutileza
    },
  },
  typography: {
    fontFamily: '"Rajdhani", sans-serif', // Fonte industrial e moderna
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
          backgroundColor: "#ffffff",
          color: "#212121",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          borderBottom: "4px solid #d35400", // Destaque na navbar
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
            backgroundColor: "#bf360c", // Tom mais escuro no hover
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderLeft: "5px solid #d35400", // Detalhe visual de oficina
        },
      },
    },
  },
});

export default lightTheme;
