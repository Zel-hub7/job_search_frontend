import axios from "axios";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  userType: string;
}

export const loginUser = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await axios.post("/api/login", credentials);
  return response.data;
};


export const saveToken = (token: string) => {
  localStorage.setItem("token", token);
};

// Utility to get the token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Utility to remove the token from localStorage
export const removeToken = () => {
  localStorage.removeItem("token");
};
