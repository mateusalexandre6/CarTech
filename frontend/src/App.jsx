import { Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import Home from "./pages/commonPages/Home";
import Login from "./pages/commonPages/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreUser } from "./redux/slices/authSlice";
import LoadingScreen from "./components/LoadingCustom/LoadingCustom";
import Dashboard from "./pages/authPages/Dashboard";
import { SnackbarProvider } from "./context/SnackBarContext";
import ClientsList from "./pages/authPages/Clients";
import ViewClient from "./pages/authPages/Clients/ViewClient";
import Veiculos from "./pages/authPages/Veiculos";
import Mechanics from "./pages/authPages/Mechanics";
import Services from "./pages/authPages/Services";

const App = () => {
  const { status, checkTokenExpiration } = useAuth();
 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser());
    checkTokenExpiration();
  }, [dispatch, checkTokenExpiration]);

  return (
    <>
      <SnackbarProvider>
      <CssBaseline />
      {status === "loading" ? (
        <LoadingScreen />
      ) : status === "authenticated" ? (
        <Sidebar />
      ) : (
        <Navbar />
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route element={<PrivateRoute />}>
          <Route path="/cartech/clients" element={<ClientsList />} />
          <Route path="/cartech/client/:id" element={<ViewClient />} />
          <Route path="/cartech" element={<Dashboard />} />
          <Route path="/cartech/dashboard" element={<Dashboard />} />
          <Route path="/cartech/vehicles" element={<Veiculos />} />
          <Route path="/cartech/mechanics" element={<Mechanics />} />
          <Route path="/cartech/services" element={<Services />} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<h1>Painel Administrativo</h1>} />
        </Route>
      </Routes>
      </SnackbarProvider>
    </>
  );
};

export default App;
