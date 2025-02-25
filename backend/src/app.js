require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const clientRoutes = require("./routes/client.routes");
const vehicleRoutes = require("./routes/vehicle.routes");
const agendamentoRoutes = require("./routes/agendamento.routes");
const orcamentoRoutes = require("./routes/orcamento.routes");
const mechanicRoutes = require("./routes/mechanic.routes");
const serviceRoutes = require("./routes/services.routes");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/agendamentos", agendamentoRoutes);
app.use("/api/orcamentos", orcamentoRoutes);
app.use("/api/mechanics", mechanicRoutes);
app.use("/api/services", serviceRoutes);


module.exports = app;
