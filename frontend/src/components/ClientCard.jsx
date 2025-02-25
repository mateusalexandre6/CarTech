import { Card, CardContent, Typography, Button,  Divider, Paper, List, CardActions } from "@mui/material";
import propTypes from "prop-types";

const ClientCard = ({ client, handleRemoveClient }) => {
  return (
    <Card sx={{ minWidth: 250, mb: 2, p: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: 3 }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {client.nome}
        </Typography>
        <Typography color="text.secondary">{client.email}</Typography>

        {client.veiculos?.length > 0 ? (
          <Paper sx={{ mt: 2, p: 2, borderRadius: 2 }} elevation={3}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Veículos
            </Typography>
            {client.veiculos.map((veiculo, index) => (
             <List key={index}>
              <Typography variant="body2" color="text.secondary">{veiculo.modelo.toUpperCase()} - {veiculo.placa.toUpperCase()}</Typography>
              {index !== client.veiculos.length - 1 && <Divider />}
              </List>
            ))}
          </Paper>
        ) : (
          <Typography variant="body2" sx={{ mt: 2 }}>Sem Veículos</Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" href={`/cartech/client/${client._id}`}>
          Detalhes
        </Button>
        <Button size="small" color="error" onClick={() => handleRemoveClient(client._id)}>
          Deletar
        </Button>

      </CardActions>

    </Card>
  );
};

export default ClientCard;

ClientCard.propTypes = {
  client: propTypes.object.isRequired,
  handleRemoveClient: propTypes.func.isRequired,
};
