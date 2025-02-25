
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicles, removeVehicle } from "../../../redux/slices/vehiclesSlice";
import {   Fab, Grid, Container, Typography  } from "@mui/material";
import LoadingScreen from "../../../components/LoadingCustom/LoadingCustom";
import { useSnackbar } from "../../../context/SnackBarContext";
import CustomFilter from "../../../components/CustomFIlter";
import { Add } from "@mui/icons-material";
import VehicleCard from "../../../components/VehicleCard";

const Veiculos = () => {
    const dispatch = useDispatch();
    const { vehicles, loading, error } = useSelector((state) => state.vehicles);
    
    const [ setOpen] = useState(false);
     const { showSnackbar } = useSnackbar();
     const [selectedFilters, setSelectedFilters] = useState([]);
     const [paramsFilters, setParamsFilters] = useState({});
    
    useEffect(() => {
        dispatch(fetchVehicles(paramsFilters));
    }, [dispatch, paramsFilters]);
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
  
    const handleRemoveVehicle = (id) => {
        try {
        dispatch(removeVehicle(id));
        showSnackbar("Veículo removido com sucesso!", "success");
        }
        catch (error) {
        console.log(error);
        showSnackbar("Erro ao remover veículo", "error");
    
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
        ...paramsFilters,
        [filterToDelete.name]: '',
        });
    }
    
    return (
        <Container>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 4 }}>
            <Typography variant="h4">Veículos</Typography>
            <Fab color="primary" aria-label="add" onClick={handleClickOpen} sx={{ position: "fixed", bottom: 30, right: 16 }}>
     <Add />
    </Fab>
        </Grid>
        <CustomFilter
            filters={['Nome', 'Email']}
            setFilters={handleSetFilters}
            selectedFilters={selectedFilters}
            handleDelete={handleDelete}
        />
        <Grid container spacing={3} sx={{ mt: 4 }}>
            {loading ? (
            <LoadingScreen />
            ) : error ? (
            <Typography variant="h4" color="error">
                Erro ao carregar veículos
            </Typography>
            ) : (
            vehicles.map((vehicle) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={vehicle._id}>
                <VehicleCard vehicle={vehicle} handleRemoveVehicle={handleRemoveVehicle} />
                </Grid>
            ))
            )}
        </Grid>
      

        </Container>
    );


};

export default Veiculos;