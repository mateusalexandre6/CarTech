import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices, deleteService } from "../../../redux/slices/servicesSlice";
import { Fab, Grid, Container, Typography, Dialog, DialogTitle, DialogContent,  IconButton, Tooltip } from "@mui/material";
import LoadingScreen from "../../../components/LoadingCustom/LoadingCustom";
import { useSnackbar } from "../../../context/SnackBarContext";
import CustomFilter from "../../../components/CustomFIlter";
import { Add, DashboardCustomize, GridOn} from "@mui/icons-material";
import ServiceCard from "../../../components/ServiceCard";
import AddService from "./AddService";
import EditService from "./EditService";
import TableComponent from "../../../components/TableComponent";
import { formatarMinutos } from "../../../utils/formatarMinutos";

const Services = () => {
    const dispatch = useDispatch();
    const { services, loading, error } = useSelector((state) => state.services);

    const [open, setOpen] = useState(false);
    const { showSnackbar } = useSnackbar();
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [paramsFilters, setParamsFilters] = useState({});
    const [openEdit, setOpenEdit] = useState(false);
    const [serviceId, setServiceId] = useState(null);
    const [isCard, setIsCard] = useState(true);



    useEffect(() => {
        dispatch(fetchServices(paramsFilters));
    }, [dispatch, paramsFilters]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDeleteService = (service) => {
        try {
            dispatch(deleteService(service._id));
            showSnackbar("Serviço removido com sucesso!", "success");
        } catch (error) {
            console.log(error);
            showSnackbar("Erro ao remover serviço", "error");
        }
    }

    const handleSetFilters = (filters) => {
        setSelectedFilters([]);
        setParamsFilters({
            service_type: filters.ServiceType,
            status: filters.Status,
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
    const handleCloseEdit = () => {
        setOpenEdit(false);
        dispatch(fetchServices(paramsFilters));

    }

    if (loading) {
        return <LoadingScreen />;
    }


    return (
        <>
            <Container sx={{ mt: 20, mb: 4 }}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Typography variant="h4">Serviços</Typography>
                    <Fab color="primary" aria-label="add" onClick={handleClickOpen} sx={{ position: "fixed", bottom: 30, right: 16 }}>
                        <Add />
                    </Fab>
                </Grid>

                <Grid container justifyContent="flex-end" alignItems="center" sx={{ mt: 1 }}>
                    
                    <IconButton onClick={() => setIsCard(!isCard)}>
                        <Tooltip title={isCard ? "Visualização em Tabela" : "Visualização em Cartões"}>
                        {isCard ? <GridOn color="primary" />: <DashboardCustomize color="primary"  />}
                        </Tooltip>
                    </IconButton>
                    </Grid>

                <CustomFilter
                    filters={['ServiceType', 'Status']}
                    setFilters={handleSetFilters}
                    selectedFilters={selectedFilters}
                    handleDelete={handleDelete} />
                <Grid container spacing={3} sx={{ mt: 4 }}>
           
                    {loading || error ? (
                        <LoadingScreen />
                    )
                    : 
                     isCard ? (
                        services?.map((service) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={service._id}>


                                <ServiceCard service={service} handleDeleteService={handleDeleteService} handleEditService={(service_id) => {
                                     setServiceId(service_id)

                                    setOpenEdit(true);
                                    
                                      }} />
                            </Grid>
                        ))
                    ) :
                      <TableComponent
                      columns={['_id', 'Nome', 'Mecanico', 'Tempo Estimado', 'Tempo Real', 'Status']}
                      data={services.map((service) => ({
                            _id: service._id,
                            Nome: service.service_type,
                            Mecanico: service.mechanic_id.name,
                            'Tempo Estimado': formatarMinutos(service.estimated_time),
                            'Tempo Real': formatarMinutos(service.actual_time),
                            'Status': service.status,
                

                        }))}
                      actions={
                            {
                                
                                edit: (id) => {
                                    setServiceId(id);
                                    setOpenEdit(true);
                                },
                                delete: (id) => {
                                    const service = services.find((service) => service._id === id);
                                    handleDeleteService(service);
                                }
                            }
                      }
                    />
                    }

                </Grid>

                <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
                    <DialogTitle>Adicionar Serviço</DialogTitle>
                    <DialogContent>
                        <AddService handleClose={() => handleClose()} />
                    </DialogContent>
                </Dialog>

                <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="lg" fullWidth>
                    <DialogTitle>Editar Serviço</DialogTitle>
                    <DialogContent>
                      <EditService handleClose={() => handleCloseEdit()} serviceId={serviceId} />
                    </DialogContent>
                </Dialog>

            </Container>
        </>
    );
};

export default Services;