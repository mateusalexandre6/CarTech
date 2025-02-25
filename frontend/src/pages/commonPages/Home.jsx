
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia } from "@mui/material";
import { styled } from "@mui/system";
import ButtonCustom from "../../components/ButtonCustom";

const HeroSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "90vh",
  textAlign: "center",
  background: "linear-gradient(to right, #212121, #424242)",
  color: "#fff",
  padding: "2rem",
});

const services = [
  { title: "Troca de Óleo", image: "/src/assets/oleo-change.png", description: "Troca de óleo rápida e eficiente." },
  { title: "Alinhamento", image: "/src/assets/car-repair.png", description: "Ajuste de suspensão e direção." },
  { title: "Revisão Completa", image: "/src/assets/tires-change.png", description: "Troca de Pneus." },
];

const Home = () => {
  return (
    <Box>
      <HeroSection>
        <Typography variant="h1" gutterBottom>
          Bem-vindo à CarTech
        </Typography>
        <Typography variant="h4" gutterBottom>
          Serviços automotivos de qualidade e tecnologia ao seu alcance.
        </Typography>
        <ButtonCustom variant="contained" color="primary" size="large">
          Agendar Serviço
        </ButtonCustom>
      </HeroSection>

      {/* Serviços */}
      <Container sx={{ my: 5 }}>
        <Typography variant="h4" textAlign="center" gutterBottom color="primary">
          Nossos Serviços
        </Typography>
        <Grid container spacing={3}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia component="img" height="220" image={service.image} alt={service.title} />
                <CardContent>
                  <Typography variant="h5">{service.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Sobre o Aplicativo */}
      <Container sx={{ my: 5, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom color="primary">
          Conheça Nosso Aplicativo
        </Typography>
        <Typography variant="body1">
          Gerencie seus clientes, serviços e orçamentos de maneira simples e eficiente.
        </Typography>
      </Container>

      {/* Depoimentos */}
      <Container sx={{ my: 5 }}>
        <Typography variant="h4" textAlign="center" gutterBottom color="primary">
          O que nossos clientes dizem
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 2 }}>
              <Typography variant="body1">
                “Excelente atendimento e serviço rápido! Recomendo a todos.”
              </Typography>
              <Typography variant="caption" display="block" textAlign="right">
                - João Silva
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 2 }}>
              <Typography variant="body1">
                “Consertaram meu carro em tempo recorde. Muito satisfeito!”
              </Typography>
              <Typography variant="caption" display="block" textAlign="right">
                - Maria Souza
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Rodapé */}
      <Box sx={{ bgcolor: "#212121", color: "#fff", p: 3, textAlign: "center" }}>
        <Typography variant="body2">© 2025 Mecânica de Carros - Todos os direitos reservados.</Typography>
      </Box>
    </Box>
  );
};

export default Home;
