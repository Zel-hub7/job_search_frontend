import axios from "axios";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  userType: string;
}

interface SignUpCredentials {
  email: string;
  password: string;
  confirmPassword: string; // For sign up, you typically need to confirm the password
}

interface SignUpResponse {
  token: string;
  userType: string;
}

export const signupUser = async (
  credentials: SignUpCredentials
): Promise<SignUpResponse> => {
  const response = await axios.post("/api/signup", credentials);
  return response.data;
};

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
