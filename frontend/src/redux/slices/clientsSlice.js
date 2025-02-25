import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createClient, getClients, getClientById, updateClient, deleteClient } from "../../services/clientsService";

// Estado inicial
const initialState = {
  clients: [],
  client: null,
  loading: false,
  error: null,
};

// Thunks para operações assíncronas
export const fetchClients = createAsyncThunk("clients/fetchAll", async (params, thunkAPI) => {
  try {
    return await getClients(params);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const fetchClientById = createAsyncThunk("clients/fetchById", async (id, thunkAPI) => {
  try {
    return await getClientById(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const addClient = createAsyncThunk("clients/add", async (clientData, thunkAPI) => {
  try {
    return await createClient(clientData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const editClient = createAsyncThunk("clients/edit", async ({ id, clientData }, thunkAPI) => {
  try {
    return await updateClient(id, clientData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const removeClient = createAsyncThunk("clients/delete", async (id, thunkAPI) => {
  try {
    await deleteClient(id);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Criando o Slice
const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.clients.push(action.payload);
      })
      .addCase(removeClient.fulfilled, (state, action) => {
        state.clients = state.clients.filter((client) => client._id !== action.payload);
      });
  },
});

export default clientSlice.reducer;
