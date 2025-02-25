import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser, restoreUser, refreshSuccess } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from "../services/api";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, accessToken, status, error } = useSelector((state) => state.auth);



  useEffect(() => {
    if (!user) {
      dispatch(restoreUser()).catch((err) => console.error("Erro no restoreUser:", err));
    }
  }, [dispatch, user]);

  const handleLogin = async (email, password) => {
    try {
     
      const result = await dispatch(loginUser({ email, password })).unwrap();
      return { success: true, user: result };
    } catch (err) {
      return { error: err };
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login"); 
  };

  const refreshToken = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token available");
  
      const response = await api.post("/auth/refresh", { refreshToken });
  
      const newAccessToken = response.data.accessToken;
      dispatch(refreshSuccess({ accessToken: newAccessToken }));
  
      return newAccessToken;
    } catch (error) {
      console.log(error);
      dispatch(logoutUser()); 
      return null;
    }
  }, [dispatch]);

  const checkTokenExpiration =  useCallback(async() => {
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      if (!decoded || !decoded.exp || decoded.exp * 1000 < Date.now()) {
 
        const newToken = await refreshToken();
        if (!newToken) {
          dispatch(logoutUser());
        }
      }
    }
  }, [accessToken, dispatch, refreshToken]);
  



  return { user, status, error, handleLogin, handleLogout, checkTokenExpiration, refreshToken };
};
