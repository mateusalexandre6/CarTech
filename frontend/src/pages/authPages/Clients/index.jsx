import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients, removeClient } from "../../../redux/slices/clientsSlice";
import {   Dialog, DialogContent, DialogTitle, Fab, Grid, Container, Typography, Chip  } from "@mui/material";
import LoadingScreen from "../../../components/LoadingCustom/LoadingCustom";
import AddClient from "./AddClient";
import { useSnackbar } from "../../../context/SnackBarContext";
import ClientCard from "../../../components/ClientCard";
import CustomFilter from "../../../components/CustomFIlter";
import { Add } from "@mui/icons-material";

const ClientsList = () => {
  const dispatch = useDispatch();
  const { clients, loading, error } = useSelector((state) => state.clients);

  const [open, setOpen] = useState(false);
 const { showSnackbar } = useSnackbar();
 const [selectedFilters, setSelectedFilters] = useState([]);
 const [paramsFilters, setParamsFilters] = useState({});

  useEffect(() => {
    dispatch(fetchClients(paramsFilters));
  }, [dispatch, paramsFilters]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleRemoveClient = (id) => {
    try {
      dispatch(removeClient(id));
      showSnackbar("Cliente removido com sucesso!", "success");
    }
    catch (error) {
      console.log(error);
      showSnackbar("Erro ao remover cliente", "error");

    }
  }

  const handleSetFilters = (filters) => {
    setSelectedFilters([]);
    setParamsFilters({
      nome: filters.Nome,
      email: filters.Email,
    });
    
    const newFilters =  Array.from(Object.entries(filters)).map(([name, value]) => ({ name, value })).filter((f) => f.value !== '');
    setSelectedFilters(newFilters);
    
  }

  const handleDelete = (filterToDelete) => {
    const newFilters = selectedFilters.filter((filter) => filter.name !== filterToDelete.name);
    setSelectedFilters(newFilters);
    setParamsFilters({
      nome: newFilters.find((f) => f.name === 'Nome')?.value,
      email: newFilters.find((f) => f.name === 'Email')?.value,
    });
  }




  if (loading) return <LoadingScreen />;
  if (error) return <p>Erro: {error}</p>;
  
  return (
  
       <Container maxWidth="lg" sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" gutterBottom>
        Lista de Clientes
      </Typography>
      <Grid container spacing={3} sx={{ mt: 4, mb: 4, display: 'flex', alignItems: 'center' }}> 
      

        {selectedFilters?.map((filter) => (
          <Grid item key={filter.name}>

          <Chip key={filter.name} color="primary" label={`${filter.name}: ${filter.value}`} onDelete={() => handleDelete(filter)} />
          </Grid>
        ))}
      </Grid>
  
      <Grid container spacing={3} sx={{ mt: 4, mb: 4 }}>
        {clients.map((client) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={client._id}>
            <ClientCard client={client} handleRemoveClient={handleRemoveClient} />
          </Grid>
        ))}
      </Grid>

    <Fab color="primary" aria-label="add" onClick={handleClickOpen} sx={{ position: "fixed", bottom: 30, right: 16 }}>
     <Add />
    </Fab>

    <CustomFilter fields={[
      { name: 'Nome', label: 'Nome', type: 'text' },
      { name: 'Email', label: 'E-mail', type: 'text' },
      { name: 'Telefone', label: 'Telefone', type: 'text' },
      { name: 'Veiculo', label: 'Veículo', type: 'select', options: ['Carro', 'Moto', 'Caminhão'] },
      { name: 'Marca', label: 'Marca', type: 'text' },
      { name: 'Status', label: 'Status', type: 'select', options: ['Ativo', 'Inativo'] },

    ]} onApplyFilters={(filters) => handleSetFilters(filters)} />


    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle>Adicionar Cliente</DialogTitle>
      <DialogContent>
      <AddClient handleClose={() => handleClose()} />
      </DialogContent>
    </Dialog>
    </Container>

  );
};

export default ClientsList;
