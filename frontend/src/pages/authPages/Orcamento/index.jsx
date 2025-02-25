
import  { useState, useEffect } from 'react';
import axios from 'axios';
import TableComponent from './TableComponent';
import { Container, Typography } from '@mui/material';
import propTypes from 'prop-types';

const Orcamentos = ({ agendamentoId }) => {
  const [orcamentos, setOrcamentos] = useState([]);

  useEffect(() => {
    axios.get(`/api/orcamentos?agendamento=${agendamentoId}`)
      .then(response => setOrcamentos(response.data))
      .catch(error => console.error(error));
  }, [agendamentoId]);

  const handleChangePagamento = (id, newStatus) => {
    axios.put(`/api/orcamentos/${id}`, { statusPagamento: newStatus })
      .then(() => setOrcamentos(prevOrcamentos => prevOrcamentos.map(orcamento =>
        orcamento._id === id ? { ...orcamento, statusPagamento: newStatus } : orcamento
      )))
      .catch(error => console.error(error));
  };

  const columns = ['Descrição', 'Valor Total', 'Status de Pagamento'];

  const actions = {
    Status: {
      label: 'Marcar como Pago',
      action: (id) => handleChangePagamento(id, 'pago')
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Orçamentos
      </Typography>
      <TableComponent
        columns={columns}
        data={orcamentos}
        actions={actions}
      />
    </Container>
  );
};

export default Orcamentos;

Orcamentos.propTypes = {
    agendamentoId: propTypes.string.isRequired
    };