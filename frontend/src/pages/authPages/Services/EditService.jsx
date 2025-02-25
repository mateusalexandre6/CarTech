
import { useDispatch } from "react-redux";
import { updateServiceTime } from "../../../redux/slices/servicesSlice";
import { TextField, Box, Grid, Button } from "@mui/material";
import { useSnackbar } from "../../../context/SnackBarContext";
import propTypes from "prop-types";


const EditService = ({ handleClose, serviceId }) => {
   
    const dispatch = useDispatch();
    const { showSnackbar } = useSnackbar();

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const actualTime = e.target.actual_time.value;

        try {
            dispatch(updateServiceTime({ id: serviceId, actualTime: actualTime }));
            showSnackbar("Serviço atualizado com sucesso!", "success");
            handleClose();
        } catch (error) {
            console.error(error);
            showSnackbar("Erro ao atualizar serviço", "error");
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
            <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
    <TextField
        label="Tempo Atual (horas)"
        type="number"
        fullWidth
        name="actual_time"
        required
    />
</Grid>
      {/* buttons */}
        <Grid item xs={12} md={12} lg={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                    Atualizar
                </Button>
                <Button onClick={handleClose} variant="contained" color="secondary">
                    Cancelar
                </Button>
            </Box>
            
 </Grid>
 </Grid>
        </Box>
    );
};

export default EditService;

EditService.propTypes = {
    handleClose: propTypes.func.isRequired,
    serviceId: propTypes.string.isRequired,
};
