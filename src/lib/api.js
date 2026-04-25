import axios from "axios";
import toast from "react-hot-toast";

/**
 * Centralized API configuration.
 * All API calls should use this client instead of raw axios
 * to ensure consistent base URL, auth headers, and error handling.
 */
export const API_BASE_URL = "https://ecommerce.routemisr.com/api/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Attach auth token to every request automatically
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    config.headers.token = token;
  }
  return config;
});

// Handle 401 (expired/invalid token) globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("userToken");
      toast.error("Session expired. Please login again.");
      // Redirect to login — use window.location since this is outside React
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

/**
 * Decodes the JWT token from localStorage to extract user details securely.
 */
export const jwtDecode = () => {
  const token = localStorage.getItem("userToken");
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};

/**
 * Fetches the currently authenticated user's orders.
 */
export const getUserOrders = async () => {
  const user = jwtDecode();
  if (!user || !user.id) {
    throw new Error("User not authenticated or invalid token");
  }
  const response = await apiClient.get(`/orders/user/${user.id}`);
  return response.data;
};

export default apiClient;
