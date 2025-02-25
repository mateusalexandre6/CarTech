import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Grid, List, ListItem, Chip,  Box } from '@mui/material';
import { fetchClientById } from "../../../redux/slices/clientsSlice";
import LoadingScreen from '../../../components/LoadingCustom/LoadingCustom';
import { useDispatch } from 'react-redux';
import { formatarTelefone } from '../../../utils/formatarTelefone';
const ViewClient = () => {
  const { id } = useParams(); 
  console.log(id);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClientById(id))
      .then((response) => {
        setClient(response.payload);
        setLoading(false);
      });
   
  }, [dispatch, id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
       <LoadingScreen />
      </Box>
    );
  }

  if (!client) {
    return (
      <Container>
        <Typography variant="h4" color="error" align="center" gutterBottom>
          Cliente não encontrado
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ p: 4, mt: 8 }}>
        
      <Card sx={{ marginBottom: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Detalhes do Cliente
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color='primary'>Nome:</Typography>
              <Typography>{client.nome}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color='primary' >E-mail:</Typography>
              <Typography>{client.email}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color='primary' >Telefone:</Typography>
              <Typography>{formatarTelefone(client.telefone)}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color='primary' >Endereço:</Typography>
              <Typography>{client.endereco}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color='primary' >Criado em:</Typography>
              <Typography>{new Date(client.createdAt).toLocaleString()}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color='primary' >Atualizado em:</Typography>
              <Typography>{new Date(client.updatedAt).toLocaleString()}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ marginBottom: 4 }}>
        <CardContent>
          <Typography variant="h4"   gutterBottom>
            Veículos
          </Typography>
          {client.veiculos && client.veiculos.length > 0 ? (
            <List>
              {client.veiculos.map((vehicle, index) => (
                <ListItem key={index} onClick={() => console.log(vehicle)} sx={{ cursor: 'pointer' }}>
                  <Chip label={`${vehicle.modelo.toUpperCase()} - ${vehicle.placa.toUpperCase()}`} variant='outlined' color='primary' />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography color='primary'>Sem Veículos</Typography>
          )}
        </CardContent>
      </Card>

      <Card sx={{ marginBottom: 4 }}>
        <CardContent>
          <Typography variant="h4"   gutterBottom>
            Histórico de Serviços
          </Typography>
            {client.historicoServicos && client.historicoServicos.length > 0 ? (
                <List>
                {client.historicoServicos.map((appointment, index) => (
                    <ListItem key={index}>
                    <Chip label={`${appointment.data} - ${appointment.servico}`} variant='outlined' color='primary' />
                    </ListItem>
                ))}
                </List>
            ) : (
                <Typography color='primary'>Sem Histórico de Serviços</Typography>
            )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ViewClient;
