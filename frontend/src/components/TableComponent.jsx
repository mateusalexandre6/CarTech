import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, Chip
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import propTypes from 'prop-types';

const TableComponent = ({ columns, data, actions }) => {
  const renderCellContent = (key, value) => {
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    
    if (key.toUpperCase() === 'STATUS') {
      return (
        <Chip 
          label={value} 
          color={value === 'Concluído' ? 'success' : value === 'Pendente' ? 'warning' : 'error'}
          variant="outlined"
        />
      );
    }
    return value;
  };

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.main', color: 'white' }}>
            {columns.map((col, index) => (
              <TableCell key={index} sx={{ fontWeight: 'bold' }}>{col}</TableCell>
            ))}
            <TableCell sx={{ fontWeight: 'bold' }}>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row._id} hover>
              {Object.keys(row).map((key, i) => (
                <TableCell key={i}>{renderCellContent(key, row[key])}</TableCell>
              ))}
              <TableCell>
                <Tooltip title="Editar">
                  <IconButton color="primary" onClick={() => actions?.edit?.(row._id)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Excluir">
                  <IconButton color="error" onClick={() => actions?.delete?.(row._id)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;

TableComponent.propTypes = {
  columns: propTypes.array.isRequired,
  data: propTypes.array.isRequired,
  actions: propTypes.shape({
    edit: propTypes.func,
    delete: propTypes.func,
  }),
};
