import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createMechanic, getMechanics, getMechanicById, updateMechanic, deleteMechanic } from "../../services/mechanicsService";


// Estado inicial
const initialState = {
    mechanics: [],
    mechanic: null,
    loading: false,
    error: null,
  };

// Thunks para operações assíncronas
export const fetchMechanics = createAsyncThunk("mechanics/fetchAll", async (params, thunkAPI) => {
    try {
      return await getMechanics(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });
  
  export const fetchMechanicById = createAsyncThunk("mechanics/fetchById", async (id, thunkAPI) => {
    try {
      return await getMechanicById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });
  
  export const addMechanic = createAsyncThunk("mechanics/add", async (mechanicData, thunkAPI) => {
    try {
      return await createMechanic(mechanicData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });
  
  export const editMechanic = createAsyncThunk("mechanics/edit", async ({ id, mechanicData }, thunkAPI) => {
    try {
      return await updateMechanic(id, mechanicData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });
  
  export const removeMechanic = createAsyncThunk("mechanics/delete", async (id, thunkAPI) => {
    try {
      await deleteMechanic(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });

// Criando o Slice
const mechanicSlice = createSlice({
    name: "mechanics",
    initialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchMechanics.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMechanics.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.mechanics = action.payload;
            })
            .addCase(fetchMechanics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchMechanicById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMechanicById.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.mechanic = action.payload;
            })
            .addCase(fetchMechanicById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addMechanic.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addMechanic.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.mechanics.push(action.payload);
            })
            .addCase(addMechanic.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(editMechanic.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editMechanic.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const index = state.mechanics.findIndex((mechanic) => mechanic.id === action.payload.id);
                state.mechanics[index] = action.payload;
            })
            .addCase(editMechanic.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeMechanic.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeMechanic.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.mechanics = state.mechanics.filter((mechanic) => mechanic.id !== action.payload);
            }
            )
            .addCase(removeMechanic.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default mechanicSlice.reducer;