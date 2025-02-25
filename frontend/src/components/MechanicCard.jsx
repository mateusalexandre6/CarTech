import { Card, CardContent, Typography, Button, Paper, List, CardActions } from "@mui/material";
import propTypes from "prop-types";

const MechanicCard = ({ mechanic, handleRemoveMechanic }) => {
    return (
        <Card sx={{ minWidth: 250, mb: 2, p: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: 3 }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                    {mechanic.name}
                </Typography>
                <Typography color="text.secondary">{mechanic.email}</Typography>

                {mechanic.specialization?.length > 0 ? (
                    <Paper sx={{ mt: 2, p: 2, borderRadius: 2 }} elevation={3}>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            Especialidades
                        </Typography>
                       
                            <List>
                                <Typography variant="body2" color="text.secondary">{mechanic.specialization.toUpperCase()}</Typography>
                              
                            </List>
                       
                    </Paper>
                ) : (
                    <Typography variant="body2" sx={{ mt: 2 }}>Sem Especialidades</Typography>
                )}
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" href={`/cartech/mechanic/${mechanic._id}`}>
                    Detalhes
                </Button>
                <Button size="small" color="error" onClick={() => handleRemoveMechanic(mechanic._id)}>
                    Deletar
                </Button>
            </CardActions>
        </Card>
    );
};

export default MechanicCard;

MechanicCard.propTypes = {
    mechanic: propTypes.object.isRequired,
    handleRemoveMechanic: propTypes.func.isRequired,
};