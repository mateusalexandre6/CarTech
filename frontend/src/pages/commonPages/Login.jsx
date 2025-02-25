import { useState, useEffect, useRef } from "react";
import { TextField, Button, Container, Card, CardHeader, CardContent, CardActions, CircularProgress } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { useSnackbar } from "../../context/SnackBarContext";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const { status } = useSelector((state) => state.auth);
  const { handleLogin } = useAuth();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (status === "authenticated" && !hasRedirected.current) {
      hasRedirected.current = true;
      navigate("/cartech/dashboard", { replace: true });
    }
  }, [status, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleLogin(email, password);

    if (!result || result?.error) {
      const errorMessage = typeof result?.error === "string" ? result.error : result?.error?.message;
      showSnackbar(errorMessage || "Erro ao realizar login", "error");
    } else {
      showSnackbar("Login realizado com sucesso!", "success");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", overflow: "hidden" }}>
      <Card sx={{ padding: 2, width: "100%" }}>
        <CardHeader title="Login" />
        <form onSubmit={handleSubmit}>
          <CardContent>
            <TextField fullWidth margin="normal" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField fullWidth margin="normal" type="password" label="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button fullWidth variant="contained" color="primary" type="submit" disabled={status === "loading"}>
              {status === "loading" ? (
                <>
                  <span>Carregando...</span>
                  <CircularProgress size={20} color="inherit" sx={{ ml: 1 }} />
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
