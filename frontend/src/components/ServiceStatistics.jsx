
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import propTypes from "prop-types";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const ServiceStatistics = ({ stats }) => {
  if (!stats) return <Typography>Carregando...</Typography>;

  return (
    <Grid container spacing={3} sx={{ mt: 4, mb: 4 }}>
      {/* Gráfico de Pizza - Status */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Status dos Serviços</Typography>
            <PieChart width={300} height={300}>
              <Pie data={stats.statusCounts} dataKey="count" nameKey="_id" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                {stats.statusCounts.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </CardContent>
        </Card>
      </Grid>

      {/* Gráfico de Barras - Complexidade */}
      <Grid item xs={12} md={6}>
        <Card sx={{ height: "100%", width: "100%" }}>
          <CardContent>
            <Typography variant="h6">Complexidade dos Serviços</Typography>
            <BarChart width={500} height={300} data={stats.complexityCounts} sx={{ width: "100%", height: "100%" }}>
              <CartesianGrid strokeDasharray="4 4"  />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </CardContent>
        </Card>
      </Grid>

      {/* Cards Informativos */}
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" color="primary">Abaixo do Tempo Estimado</Typography>
            <Typography variant="h4">{stats.lessThanEstimated}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" color="secondary">Acima do Tempo Estimado</Typography>
            <Typography variant="h4">{stats.greaterThanEstimated}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ServiceStatistics;

ServiceStatistics.propTypes = {
    stats: propTypes.object,
    };