import { useEffect, useState } from 'react';
import axios from 'axios';
import TableComponent from './TableComponent';
import { Container, Typography, Button } from '@mui/material';

const Agendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    axios.get('/api/agendamentos')
      .then(response => setAgendamentos(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleChangeStatus = (id, newStatus) => {
    axios.put(`/api/agendamentos/${id}`, { status: newStatus })
      .then(() => setAgendamentos(prevAgendamentos => prevAgendamentos.map(agendamento =>
        agendamento._id === id ? { ...agendamento, status: newStatus } : agendamento
      )))
      .catch(error => console.error(error));
  };

  const columns = ['Veículo', 'Data', 'Serviço', 'Status'];

  const actions = {
    Status: {
      label: 'Iniciar',
      action: (id) => handleChangeStatus(id, 'em andamento')
    },
    Concluir: {
      label: 'Concluir',
      action: (id) => handleChangeStatus(id, 'concluído')
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Agendamentos
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2 }}
        onClick={() => console.log('Abrir formulário para novo agendamento')}
      >
        Novo Agendamento
      </Button>
      <TableComponent
        columns={columns}
        data={agendamentos}
        actions={actions}
      />
    </Container>
  );
};

export default Agendamentos;
