import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { createService } from "../../../redux/slices/servicesSlice";
import { TextField, Button, Box, Grid, MenuItem } from "@mui/material";
import { useSnackbar } from "../../../context/SnackBarContext";
import propTypes from "prop-types";
import { getMechanics   } from "../../../services/mechanicsService";
import { getVehicles } from "../../../services/vehiclesService";
import LoadingScreen from "../../../components/LoadingCustom/LoadingCustom";

const AddService = ({ handleClose }) => {
    const [mechanics, setMechanics] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [mechanicId, setMechanicId] = useState("");
    const [vehicleId, setVehicleId] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [complexityLevel, setComplexityLevel] = useState(1);
    const dispatch = useDispatch();
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchMechanics = async () => {
            try {
                const response = await getMechanics();
                console.log(response);
                setMechanics(response);
            } catch (error) {
                console.error("Erro ao buscar mecânicos", error);
            }
        };

        const fetchVehicles = async () => {
            try {
                const response = await getVehicles();
                console.log(response);
                setVehicles(response);
            } catch (error) {
                console.error("Erro ao buscar veículos", error);
            }
        };

        fetchMechanics();
        fetchVehicles();
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        try {
            dispatch(createService({ 
                mechanic_id: mechanicId, 
                vehicle_id: vehicleId, 
                service_type: serviceType, 
                complexity_level: complexityLevel, 
            }));
            setMechanicId("");
            setVehicleId("");
            setServiceType("");
            setComplexityLevel(1);
            showSnackbar("Serviço adicionado com sucesso!", "success");
        } catch (error) {
            console.log(error);
            showSnackbar("Erro ao adicionar serviço", "error");
        }
    }, [dispatch, mechanicId, vehicleId, serviceType, complexityLevel, showSnackbar]);


    if (!mechanics || !vehicles) {
        return <LoadingScreen />;
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={6}>
                    <TextField
                        select
                        label="Mecânico"
                        fullWidth
                        value={mechanicId}
                        onChange={(e) => setMechanicId(e.target.value)}
                        required
                    >
                        {mechanics?.map((mechanic) => (
                            <MenuItem key={mechanic._id} value={mechanic._id}>
                                {mechanic.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <TextField
                        select
                        label="Veículo"
                        fullWidth
                        value={vehicleId}
                        onChange={(e) => setVehicleId(e.target.value)}
                        required
                    >
                        {vehicles?.map((vehicle) => (
                            <MenuItem key={vehicle._id} value={vehicle._id}>
                                {`${vehicle.modelo}` + ' - ' + `${vehicle.placa}` }
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <TextField
                        select
                        label="Tipo de Serviço"
                        fullWidth
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        required
                    >
                        <MenuItem value="Troca de óleo">Troca de óleo</MenuItem>
                        <MenuItem value="Revisão">Revisão</MenuItem>
                        <MenuItem value="Freios">Freios</MenuItem>
                        <MenuItem value="Motor">Motor</MenuItem>
                        <MenuItem value="Transmissão">Transmissão</MenuItem>
                        <MenuItem value="Outros">Outros</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <TextField
                        label="Nível de Complexidade"
                        type="number"
                        fullWidth
                        value={complexityLevel}
                        onChange={(e) => setComplexityLevel(e.target.value)}
                        required
                        inputProps={{ min: 1, max: 5 }}
                    />
                </Grid>
         
                <Grid item xs={12} md={12} lg={12}>
                    <Button type="submit" variant="contained" color="primary">Adicionar Serviço</Button>
                    <Button variant="contained" color="error" sx={{ ml: 2 }} onClick={() => handleClose()}>Cancelar</Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddService;

AddService.propTypes = {
    handleClose: propTypes.func.isRequired,
};