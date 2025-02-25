import api from "./api";
import { store } from "../redux/store";
import { refreshSuccess, logout } from "../redux/slices/authSlice";

// Função para fazer o refresh do token
export const refreshToken = async () => {
  try {
    const state = store.getState();
    const refreshToken = state.auth.refreshToken;

    if (!refreshToken) {
      throw new Error("Refresh token não encontrado");
    }

    const response = await api.post("http://localhost:5000/api/auth/refresh", { refreshToken });
    const newAccessToken = response.data.accessToken;

    // Atualiza o Redux com o novo token
    store.dispatch(refreshSuccess(newAccessToken));

    return newAccessToken;
  } catch (error) {
    console.error("Erro ao renovar token", error);
    store.dispatch(logout());
    return null;
  }
};
