import http from "./HTTPService";

const TOKEN_KEY = "token";

export const login = async (email: string, password: string) => {
  try {
    const response = await http.post("/auth/login", { email, password });
    localStorage.setItem(TOKEN_KEY, response.data.data.token);
    return response.data;
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const register = async (username: string, email: string, password: string) => {
  try {
    const response = await http.post("/auth/register", { username, email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};
