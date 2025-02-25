import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Typography,
    Box,
    Divider,
    Chip
} from "@mui/material";
import { CheckCircle, ErrorOutline, Build, PunchClock } from "@mui/icons-material";
import { formatarMinutos } from "../utils/formatarMinutos";
import propTypes from "prop-types";

const ServiceCard = ({ service, handleEditService, handleDeleteService }) => {
    const estimatedTime = service.estimated_time;
    const actualTime = service.actual_time;
    const isOnTime = estimatedTime && actualTime && actualTime <= estimatedTime;

    return (
        <Card sx={{
            maxWidth: 500,
            m: 2,
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "background.paper",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
        }}>
            <CardHeader
                avatar={<Build color="primary" />}
                title={
                    <Typography variant="h6" fontWeight="bold">
                        {service.service_type}
                    </Typography>
                }
                subheader={
                    <Typography variant="body2" color="textSecondary">
                        Mecânico: {service.mechanic_id?.name?.toUpperCase()} 
                    </Typography>
                }
            />

            <CardContent>
                <Typography variant="body2" color="textSecondary">
                    <strong>Veículo:</strong> {service.vehicle_id?.modelo?.toUpperCase()} - {service.vehicle_id?.placa?.toUpperCase()}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {estimatedTime && (
                    <Box sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        width: "100%"
                    }}>
                        <Chip
                        sx={{ width: "100%" }}
                        icon={<PunchClock />}
                            label={<Typography variant="body1" color="textPrimary">
                               {formatarMinutos(estimatedTime)}
                            </Typography>}
                            color="info"
                            size="small"
                        />
                    </Box>
                )}

                {actualTime && (
                    <Box sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        mt: 1,
                        width: "100%"
                    }}>
                        <Chip
                            sx={{ width: "100%" }}
                            label={
                                <Typography variant="body1" color="textPrimary">
                                {formatarMinutos(actualTime)}
                                </Typography>
                                }
                            color={isOnTime ? "success" : "error"}
                            size="small"
                            icon={isOnTime ? <CheckCircle /> : <ErrorOutline />}
                        />
                    </Box>
                )}
            </CardContent>

            <CardActions sx={{ justifyContent: "space-between" }}>
                <Button size="small" variant="contained" color="primary" onClick={() => handleEditService(service._id)}>
                    Editar
                </Button>
                <Button size="small" variant="contained" color="error" onClick={() => handleDeleteService(service)}>
                    Deletar
                </Button>
            </CardActions>
        </Card>
    );
};

export default ServiceCard;

ServiceCard.propTypes = {
    service: propTypes.object.isRequired,
    handleEditService: propTypes.func.isRequired,
    handleDeleteService: propTypes.func.isRequired,
};
