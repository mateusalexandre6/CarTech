import  { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import propTypes from "prop-types";
// Criando o contexto do Snackbar
const SnackbarContext = createContext();

// Componente SnackbarProvider
export const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const showSnackbar = (message, severity = "success") => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar 
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

// Exportando corretamente o hook useSnackbar
export const useSnackbar = () => useContext(SnackbarContext);

SnackbarProvider.propTypes = {
  children: propTypes.node.isRequired
};