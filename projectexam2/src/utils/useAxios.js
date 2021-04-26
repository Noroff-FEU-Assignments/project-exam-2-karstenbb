import { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { api_url } from "../utils/Constants";

const useAxios = () => {
  const [auth] = useContext(AuthContext);
  const apiClient = axios.create({
    baseURL: api_url,
  });
  apiClient.interceptors.request.use((config) => {
    const token = auth.jwt;
    config.headers.Authorization = token ? `Bearer ${token}` : "Bearer";
    return config;
  });
  return apiClient;
};
export default useAxios;
