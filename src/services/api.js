import axios from "axios";

const api = axios.create({
baseURL: `${import.meta.env.VITE_API_URL}/api`});

api.interceptors.request.use((config) => {
  try {
    const storedUser = localStorage.getItem("omd-hairville-user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
  } catch {
    localStorage.removeItem("omd-hairville-user");
  }

  return config;
});

export default api;
