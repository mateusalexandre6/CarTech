import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMechanics, removeMechanic } from "../../../redux/slices/mechanicSlice";
import { Fab, Grid, Container, Typography, Dialog, DialogTitle, DialogContent  } from "@mui/material";
import LoadingScreen from "../../../components/LoadingCustom/LoadingCustom";
import { useSnackbar } from "../../../context/SnackBarContext";
import CustomFilter from "../../../components/CustomFIlter";
import { Add } from "@mui/icons-material";
import MechanicCard from "../../../components/MechanicCard";
import AddMechanic from "./AddMechanic";


const Mechanics = () => {
    const dispatch = useDispatch();
    const { mechanics, loading, error } = useSelector((state) => state.mechanics);
    
    const [open, setOpen] = useState(false);
    const { showSnackbar } = useSnackbar();
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [paramsFilters, setParamsFilters] = useState({});
    
    useEffect(() => {
        dispatch(fetchMechanics(paramsFilters));
    }, [dispatch, paramsFilters]);
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleRemoveMechanic = (id) => {
        try {
            dispatch(removeMechanic(id));
            showSnackbar("Mecânico removido com sucesso!", "success");
        } catch (error) {
            console.log(error);
            showSnackbar("Erro ao remover mecânico", "error");
        }
    }
    
    const handleSetFilters = (filters) => {
        setSelectedFilters([]);
        setParamsFilters({
            nome: filters.Nome,
            email: filters.Email,
        });
        
        const newFilters = Array.from(Object.entries(filters)).map(([name, value]) => ({ name, value })).filter((f) => f.value !== '');
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

    const handleClose = () => {
        setOpen(false);
    }
    
    
    return (
        <>
        <Container sx={{ mt: 20, mb: 4 }}>
            <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h4">Mecânicos</Typography>
            <Fab color="primary" aria-label="add" onClick={handleClickOpen} sx={{ position: "fixed", bottom: 30, right: 16 }}>
                <Add />
            </Fab>
        </Grid>
        
        <CustomFilter
                filters={['Nome', 'Email']}
                setFilters={handleSetFilters}
                selectedFilters={selectedFilters}
                handleDelete={handleDelete} /><Grid container spacing={3} sx={{ mt: 4 }}>
                {loading ? (
                    <LoadingScreen />
                ) : error ? (
                    <Typography variant="h4" color="error">
                        Erro ao carregar mecânicos
                    </Typography>
                ) : (
                    mechanics.map((mechanic) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={mechanic._id}>
                        <MechanicCard mechanic={mechanic} handleRemoveMechanic={handleRemoveMechanic} />

            </Grid>
                    ))
                )}
            </Grid>

            <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle>Adicionar Cliente</DialogTitle>
      <DialogContent>
      <AddMechanic handleClose={() => handleClose()} />
      </DialogContent>
    </Dialog>
        </Container>




        </>
    );
};

export default Mechanics;
