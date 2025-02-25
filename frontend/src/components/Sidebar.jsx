import { useState } from "react";
import { AppBar, Toolbar, Avatar, Drawer, List, ListItem, IconButton, Tooltip, Box, Typography, Fab } from "@mui/material";
import { Home, CarRepair, Group, ExitToApp, Menu, Nightlight, WbSunny, CarCrash, Engineering } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useMediaQuery } from "@mui/material";
import { useThemeContext } from "../hooks/useThemeContext";


const Sidebar = () => {
  const { handleLogout } = useAuth();
  const location = useLocation();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { mode, toggleTheme } = useThemeContext(); 

  // Estado para controlar a visibilidade do Drawer
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerToggle = () => {
    setOpenDrawer((prevState) => !prevState); // Alterna o estado do Drawer
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CarroTech
          </Typography>
          <Tooltip title="Perfil">
            <IconButton>
              <Avatar alt="Usuário" src="/static/images/avatar.png" sx={{ width: 40, height: 40 }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={openDrawer} 
        onClose={handleDrawerToggle} 
        sx={{
          width: 70,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 70,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 2,
            marginTop: 8,
            // adiciona borda da cor primary
            borderLeft: `5px solid primary.main`,
          },
        }}
      >
        <List>
          <ListItem button component={Link} to="/cartech" sx={{ justifyContent: "center" }}>
            <Tooltip title="Home">
              <IconButton>
                <Home
                  sx={{
                    color: location.pathname === "/cartech" ? "primary.main" : "inherit",
                    "&:hover": { color: "primary.main" },
                  }}
                />
              </IconButton>
            </Tooltip>
          </ListItem>

          <ListItem button component={Link} to="/cartech/services" sx={{ justifyContent: "center" }}>
            <Tooltip title="Serviços">
              <IconButton>
                <CarRepair
                  sx={{
                    color: location.pathname.startsWith("/cartech/services") ? "primary.main" : "inherit",
                    "&:hover": { color: "primary.main" },
                  }}
                />
              </IconButton>
            </Tooltip>
          </ListItem>

          <ListItem button component={Link} to="/cartech/clients" sx={{ justifyContent: "center" }}>
            <Tooltip title="Clientes">
              <IconButton>
                <Group
                  sx={{
                    color: location.pathname.startsWith("/cartech/clients") ? "primary.main" : "inherit",
                    "&:hover": { color: "primary.main" },
                  }}
                />
              </IconButton>
            </Tooltip>
          </ListItem>
          <ListItem button component={Link} to="/cartech/vehicles" sx={{ justifyContent: "center" }}>
            <Tooltip title="Veículos">
              <IconButton>
                <CarCrash
                  sx={{
                    color: location.pathname.startsWith("/cartech/vehicles") ? "primary.main" : "inherit",
                    "&:hover": { color: "primary.main" },
                  }}
                />
              </IconButton>
            </Tooltip>     
          </ListItem>    

          <ListItem button component={Link} to="/cartech/mechanics" sx={{ justifyContent: "center" }}>
             <Tooltip title="Mecânicos">
                <IconButton>
                  <Engineering
                    sx={{
                      color: location.pathname.startsWith("/cartech/mechanics") ? "primary.main" : "inherit",
                      "&:hover": { color: "primary.main" },
                    }}
                  />
                </IconButton>
              </Tooltip>
          </ListItem>   
        </List>

     

        {/* Tema e Logout */}
        <Box sx={{ marginBottom: 6 }}>
          <Tooltip title="Logout">
            <IconButton onClick={handleLogout}>
              <ExitToApp sx={{ "&:hover": { color: "primary.main" } }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Drawer>

  {/* Botão FAB para alternar tema */}
  <Fab
        color="primary"
        aria-label="theme-toggle"
        sx={{
          position: "fixed",
          bottom: 16,
          left: 70,
          backgroundColor: "transparent",
          border: `none`,
          boxShadow: 0,
        }}
        onClick={toggleTheme}
      >
        {mode === "dark" ? <WbSunny color="primary" /> : <Nightlight color="primary" />}
      </Fab>

    </>
  );
};

export default Sidebar;
