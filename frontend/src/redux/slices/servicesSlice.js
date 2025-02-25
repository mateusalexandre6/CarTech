// src/redux/slices/serviceSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postService, getServices, getServiceById, updateService, removeService, updateServiceActualTime } from "../../services/servicesService";


// Thunks para chamadas assíncronas
export const fetchServices = createAsyncThunk("services/fetchAll", async () => {
    const response = await getServices();
    return response
});

export const fetchServiceById = createAsyncThunk("services/fetchById", async (id) => {
    const response = await getServiceById(id);
    return response
});

export const createService = createAsyncThunk("services/create", async (serviceData) => {
    const response =  await postService(serviceData);
    return response
});

export const updateServiceStatus = createAsyncThunk("services/updateStatus", async ({ id, status }) => {
    const response = await updateService(id, { status });
    return response
});

export const deleteService = createAsyncThunk("services/delete", async (id) => {
    await  removeService(id);
    return id;
});

export const updateServiceTime = createAsyncThunk("services/updateTime", async ({ id, actualTime }) => {
    console.log(id, "id", actualTime, "actualTime", " -> updateServiceTime");
    const response = await updateServiceActualTime(id, { actualTime });
    return response
}
);



const serviceSlice = createSlice({
    name: "services",
    initialState: {
        services: [],
        selectedService: null,
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.services = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchServiceById.fulfilled, (state, action) => {
                state.selectedService = action.payload;
            })
            .addCase(updateServiceStatus.fulfilled, (state, action) => {
                const index = state.services.findIndex(s => s._id === action.payload._id);
                if (index !== -1) {
                    state.services[index] = action.payload;
                }
            })
            .addCase(deleteService.fulfilled, (state, action) => {
                state.services = state.services.filter(s => s._id !== action.payload);
            })
    },
});

export default serviceSlice.reducer;