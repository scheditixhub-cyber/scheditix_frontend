import { apiClient } from "./client";

export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    apiClient.post("/login", credentials),

  resgister: (requirement: { email: string; password: string; name: string }) =>
    apiClient.post("/user", requirement),

  emailVerify: (requestBody: { email: string; otp: string }) =>
    apiClient.post("/verify", requestBody),

  resendVerificationCode: (data: { email: string }) =>
    apiClient.post("/resend", data),

  logout: () => apiClient.post("/auth/logout"),

  getCurrentUser: () => apiClient.get("/auth/me"),
};

export const userApi = {
  getUsers: () => apiClient.get("/users"),
  getUser: (id: string) => apiClient.get(`/users/${id}`),
  createUser: (data: unknown) => apiClient.post("/users", data),
};
