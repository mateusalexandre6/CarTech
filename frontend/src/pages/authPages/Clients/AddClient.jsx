import { useState } from "react";
import { useDispatch } from "react-redux";
import { addClient } from "../../../redux/slices/clientsSlice";
import { TextField, Button, Box, Grid } from "@mui/material";
import { useSnackbar } from "../../../context/SnackBarContext";
import propTypes from "prop-types";
const AddClient = ({handleClose}) => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [placa, setPlaca] = useState("");
  const [cor, setCor] = useState("");
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(addClient({ 
        nome, 
        telefone, 
        email, 
        endereco, 
        vehicle: { modelo, ano, placa, cor } 
      }));
      setNome("");
      setTelefone("");
      setEmail("");
      setEndereco("");
      setModelo("");
      setAno("");
      setPlaca("");
      setCor("");
      showSnackbar("Cliente e veículo adicionados com sucesso!", "success");
    } catch (error) {
      console.log(error);
      showSnackbar("Erro ao adicionar cliente e veículo", "error");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6}>
          <TextField label="Nome" fullWidth value={nome} onChange={(e) => setNome(e.target.value)} required />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField label="Telefone" fullWidth value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField label="Email" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField label="Endereço" fullWidth value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField label="Modelo do Veículo" fullWidth value={modelo} onChange={(e) => setModelo(e.target.value)} required />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField label="Ano do Veículo" type="number" fullWidth value={ano} onChange={(e) => setAno(e.target.value)} required />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField label="Placa do Veículo" fullWidth value={placa} onChange={(e) => setPlaca(e.target.value)} required />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField label="Cor do Veículo" fullWidth value={cor} onChange={(e) => setCor(e.target.value)} />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Button type="submit" variant="contained" color="primary">Adicionar Cliente</Button>
          <Button variant="contained" color="error" sx={{ ml: 2 }} onClick={() => handleClose()}>Cancelar</Button>
        </Grid>
      </Grid>

    </Box>
  );
};

export default AddClient;

AddClient.propTypes = {
  handleClose: propTypes.func.isRequired,
};