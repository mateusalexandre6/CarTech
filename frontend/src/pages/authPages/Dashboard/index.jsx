import { Container, Card, CardContent, CardHeader, Typography, List, ListItem, ListItemText, ListItemIcon, Grid } from '@mui/material';
import { Build, CarRental, CarRepair, Groups,  } from '@mui/icons-material';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { fetchMechanics } from '../../../redux/slices/mechanicSlice';
import { fetchServices } from '../../../redux/slices/servicesSlice';
import { fetchClients } from '../../../redux/slices/clientsSlice';
import { fetchVehicles } from '../../../redux/slices/vehiclesSlice';
import { getStatistics } from '../../../services/servicesService';

import ServiceStatistics from '../../../components/ServiceStatistics';




const Dashboard = () => {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.user);
    const { mechanics } = useSelector((state) => state.mechanics);
    const { services } = useSelector((state) => state.services);
    const { clients } = useSelector((state) => state.clients);
    const { vehicles } = useSelector((state) => state.vehicles);

    const [stats, setStats] = useState(null);

    const formatarComplexidade = (complexidade) => {
        console.log(complexidade, "complexidade")
        switch (complexidade) {
            case 1:
                return "Muito Fácil";
            case 2:
                return "Fácil";
            case 3:
                return "Médio";
            case 4:
                return "Difícil";
            case 5:
                return "Muito Difícil";
            default:
                return "Desconhecido";
        }
    };

    useEffect(() => {
        dispatch(fetchMechanics());
        dispatch(fetchServices());
        dispatch(fetchClients());
        dispatch(fetchVehicles());
        getStatistics().then((data) => {
      
            data = {
                ...data,
                complexityCounts: data.complexityCounts.map((item) => ({ ...item, _id: formatarComplexidade(item._id) })),
            }
            setStats(data);
       
        });

    }
        , [dispatch
        ]);





    return (
        <Container maxWidth="lg" sx={{ p: 4, mt: 8 }}>
            <Typography variant="h4" gutterBottom color="primary">
                Bem-vindo, {user.name}!
            </Typography>

            <ServiceStatistics stats={stats} /> 
            <Grid container spacing={3}>

           

                
                {/* Card de Serviços em Andamento */}
                <Grid item xs={12} md={6}>
                    <Card elevation={3} sx={{ width: "100%", bgcolor: "background.paper", height: "100%" }}>
                        <CardHeader
                            title="Serviços em Andamento"
                            subheader="Status dos serviços atuais"
                            avatar={<CarRepair color="primary" />}
                        />
                        <CardContent>
                            <List>
                                {services?.map((servico, index) => {
                                    // Função para definir a cor do ícone com base no status
                                    const getColor = (status) => {
                                        switch (status.toLowerCase()) {
                                            case "concluído":
                                                return "success";
                                            case "pendente":
                                                return "info";
                                            case "erro":
                                                return "error";
                                            default:
                                                return "secondary";
                                        }
                                    };

                                    return (
                                        <ListItem key={index}>
                                            <ListItemIcon>
                                                <CarRepair color={getColor(servico.status)} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={servico.servico}
                                                secondary={`Mecânico: ${servico.mechanic_id.name} | Status: ${servico.status}`}
                                            />
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card elevation={3} sx={{ width: "100%", bgcolor: "background.paper" }}>
                        <CardHeader
                            title="Clientes"
                            subheader="Lista de clientes"
                            avatar={<Groups color="primary" />}
                        />
                        <CardContent>
                            <List>
                                {clients?.map((cliente, index) => (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            <Groups color="secondary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={cliente.nome}
                                            secondary={cliente.email}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
           
               
                
                <Grid item xs={12} md={6}>

                    <Card elevation={3} sx={{ width: "100%", bgcolor: "background.paper" }}>
                        <CardHeader
                            title="Veículos"
                            subheader="Lista de veículos"
                            avatar={<CarRental color="primary" />}
                        />
                        <CardContent>
                            <List>
                                {vehicles?.map((veiculo, index) => (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            <CarRental color="secondary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={veiculo.modelo}
                                            secondary={veiculo.cliente.nome
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>



                <Grid item xs={12} md={6}>
                    <Card elevation={3} sx={{ width: "100%", bgcolor: "background.paper" }}>
                        <CardHeader
                            title="Mecânicos"
                            subheader="Lista de mecânicos disponíveis"
                            avatar={<Build color="primary" />}
                        />
                        <CardContent>
                            <List>
                                {mechanics?.map((mecanico, index) => (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            <Build color="secondary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={mecanico.name}
                                            secondary={mecanico.specialization}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>


               






            </Grid>
        </Container>
    );
};

export default Dashboard;
