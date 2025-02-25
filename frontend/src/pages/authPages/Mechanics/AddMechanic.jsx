import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMechanic } from "../../../redux/slices/mechanicSlice";
import { TextField, Button, Box, Grid, MenuItem } from "@mui/material";
import { useSnackbar } from "../../../context/SnackBarContext";
import propTypes from "prop-types";

const AddMechanic = ({ handleClose }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [availability, setAvailability] = useState(true);
    const dispatch = useDispatch();
    const { showSnackbar } = useSnackbar();

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            dispatch(addMechanic({ 
                name, 
                phone, 
                email, 
                specialization, 
                availability 
            }));
            setName("");
            setPhone("");
            setEmail("");
            setSpecialization("");
            setAvailability(true);
            showSnackbar("Mecânico adicionado com sucesso!", "success");
        } catch (error) {
            console.log(error);
            showSnackbar("Erro ao adicionar mecânico", "error");
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={6}>
                    <TextField label="Nome" fullWidth value={name} onChange={(e) => setName(e.target.value)} required />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <TextField label="Telefone" fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <TextField label="Email" type="email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <TextField
                        select
                        label="Especialização"
                        fullWidth
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        required
                    >
                        <MenuItem value="Motor">Motor</MenuItem>
                        <MenuItem value="Transmissão">Transmissão</MenuItem>
                        <MenuItem value="Elétrica">Elétrica</MenuItem>
                        <MenuItem value="Suspensão">Suspensão</MenuItem>
                        <MenuItem value="Freios">Freios</MenuItem>
                        <MenuItem value="Outros">Outros</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <TextField
                        select
                        label="Disponibilidade"
                        fullWidth
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value === "true")}
                        required
                    >
                        <MenuItem value={true}>Disponível</MenuItem>
                        <MenuItem value={false}>Indisponível</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <Button type="submit" variant="contained" color="primary">Adicionar Mecânico</Button>
                    <Button variant="contained" color="error" sx={{ ml: 2 }} onClick={() => handleClose()}>Cancelar</Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddMechanic;

AddMechanic.propTypes = {
    handleClose: propTypes.func.isRequired,
};