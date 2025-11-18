import axios from "axios";

// Get backend URL from environment variables
const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api";

const getToken = (): string | null => {
  const token = sessionStorage.getItem("token");
  if (!token) return null;

  try {
    if (token.split(".").length !== 3) {
      console.error("Invalid token format in storage");
      sessionStorage.removeItem("token");
      return null;
    }
    return token;
  } catch (error) {
    console.error("Error processing token:", error);
    return null;
  }
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        console.error(
          "Authentication error:",
          error.response.data?.message || "Unauthorized access",
        );
        sessionStorage.clear();
        window.location.href = "/login";
      } else if (error.response.status === 404) {
        console.error(
          "Resource not found:",
          error.response.data?.message || "Not found",
        );
      } else if (error.response.status >= 500) {
        console.error(
          "Server error:",
          error.response.data?.message || "Internal server error",
        );
      }
    } else if (error.request) {
      console.error("Network error:", error.message || "No response received");
    } else {
      console.error("Request error:", error.message);
    }
    return Promise.reject(error);
  },
);

export default api;

