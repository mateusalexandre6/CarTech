import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Fab, Grid, TextField, Autocomplete, Button, Box } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import propTypes from 'prop-types';

const CustomFilter = ({ fields, onApplyFilters }) => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    // Add other filter fields here
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    setOpen(false);
  };

  return (
    <>
      <Fab color="primary" aria-label="filter" onClick={handleClickOpen} sx={{ position: 'fixed', top: 100, right: 16 }}>
        <FilterAltIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>Filtros</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {fields?.map((field) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={field.name}>
                    {(() => {
                        switch (field.type) {
                            case 'text':
                                return (
                                    <TextField
                                        name={field.name}
                                        label={field.label}
                                        variant="outlined"
                                        fullWidth
                                        value={filters[field.name]}
                                        onChange={handleChange}
                                    />
                                );
                            case 'select':
                                return (
                                    <Autocomplete
                                        options={field.options}
                                        getOptionLabel={(option) => option}
                                        renderInput={(params) => <TextField {...params} label={field.label} variant="outlined" />}
                                        onChange={(e, value) => {
                                            setFilters({
                                                ...filters,
                                                [field.name]: value,
                                            });
                                        }}
                                    />
                                );
                            case 'date':
                                return (
                                    <TextField
                                        name={field.name}
                                        label={field.label}
                                        type="date"
                                        variant="outlined"
                                        fullWidth
                                        value={filters[field.name]}
                                        onChange={handleChange}
                                    />
                                );
                            case 'number':
                                return (
                                    <TextField
                                        name={field.name}
                                        label={field.label}
                                        type="number"
                                        variant="outlined"
                                        fullWidth
                                        value={filters[field.name]}
                                        onChange={handleChange}
                                    />
                                );
                            default:
                                return null;
                        }
                    })()}
                </Grid>
            ))}

          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            <Button variant="contained" onClick={handleApplyFilters}>
              Aplicar
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomFilter;

CustomFilter.propTypes = {
    fields: propTypes.arrayOf(
        propTypes.shape({
        name: propTypes.string,
        label: propTypes.string,
        type: propTypes.string,
        options: propTypes.array,
        })
    ).isRequired,
    onApplyFilters: propTypes.func.isRequired,
    };

