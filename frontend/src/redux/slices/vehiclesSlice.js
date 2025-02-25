import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle } from "../../services/vehiclesService";

// Estado inicial
const initialState = {
  vehicles: [],
  vehicle: null,
  loading: false,
  error: null,
};

// Thunks para operações assíncronas
export const fetchVehicles = createAsyncThunk("vehicles/fetchAll", async (params, thunkAPI) => {
  try {
    return await getVehicles(params);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const fetchVehicleById = createAsyncThunk("vehicles/fetchById", async (id, thunkAPI) => {
  try {
    return await getVehicleById(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const addVehicle = createAsyncThunk("vehicles/add", async (vehicleData, thunkAPI) => {
  try {
    return await createVehicle(vehicleData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const editVehicle = createAsyncThunk("vehicles/edit", async ({ id, vehicleData }, thunkAPI) => {
  try {
    return await updateVehicle(id, vehicleData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const removeVehicle = createAsyncThunk("vehicles/delete", async (id, thunkAPI) => {
  try {
    await deleteVehicle(id);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Criando o Slice
const vehiclesSlice = createSlice({
    name: "vehicles",
    initialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder
        .addCase(fetchVehicles.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchVehicles.fulfilled, (state, action) => {
            state.vehicles = action.payload;
            state.loading = false;
        })
        .addCase(fetchVehicles.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        .addCase(fetchVehicleById.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchVehicleById.fulfilled, (state, action) => {
            state.vehicle = action.payload;
            state.loading = false;
        })
        .addCase(fetchVehicleById.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        .addCase(addVehicle.pending, (state) => {
            state.loading = true;
        })
        .addCase(addVehicle.fulfilled, (state, action) => {
            state.vehicles.push(action.payload);
            state.loading = false;
        })
        .addCase(addVehicle.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        .addCase(editVehicle.pending, (state) => {
            state.loading = true;
        })
        .addCase(editVehicle.fulfilled, (state, action) => {
            const index = state.vehicles.findIndex((vehicle) => vehicle.id === action.payload.id);
            state.vehicles[index] = action.payload;
            state.loading = false;
        })
        .addCase(editVehicle.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        .addCase(removeVehicle.pending, (state) => {
            state.loading = true;
        })
        .addCase(removeVehicle.fulfilled, (state, action) => {
            state.vehicles = state.vehicles.filter((vehicle) => vehicle.id !== action.payload);
            state.loading = false;
        })
        .addCase(removeVehicle.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
    },
    });

export default vehiclesSlice.reducer;