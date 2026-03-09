import { apiClient } from "./client";

export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    apiClient.post("/login", credentials),

  resgister: (requirement: { email: string; password: string; name: string }) =>
    apiClient.post("/user", requirement),

  emailVerify: (requestBody: { email: string; otp: string }) =>
    apiClient.post("/verify", requestBody),

  verifyResetCode: (requestBody: { email: string; otp: string }) =>
    apiClient.post("/verify", requestBody),

  resendVerificationCode: (data: { email: string }) =>
    apiClient.post("/resend", data),

  resendResetCode: (data: { email: string }) => apiClient.post("/resend", data),

  forgotPassword: (data: { email: string }) => apiClient.post("/forgot", data),

  resetPassword: (info: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => apiClient.post("/reset", info),

  logout: () => apiClient.post("/auth/logout"),

  getCurrentUser: () => apiClient.get("/auth/me"),
};

export const userApi = {
  getUsers: () => apiClient.get("/users"),
  getUser: (id: string) => apiClient.get(`/users/${id}`),
  createUser: (data: unknown) => apiClient.post("/users", data),
  getAnalytics: (eventId: string) => apiClient.get(`/analytics/${eventId}`),
};

export const createEvent = {
  allEvent: (pageNumber: number, pageSize: number) =>
    apiClient.get("/my-events", {
      params: {
        pageNumber,
        pageSize,
      },
    }),

  searchEvent: (search: string) =>
    apiClient.get("/event/search", {
      params: { search },
    }),

  createEvent: (formData: FormData) => {
    return apiClient.post("/event", formData);
  },

  getEventById: (id: string) => apiClient.get(`/event/${id}`),

  getAttendeeForEvent: (
    eventId: string,
    pageNumber: number,
    pageSize: number
  ) =>
    apiClient.get(`/attendee/${eventId}`, {
      params: {
        pageNumber,
        pageSize,
      },
    }),

  purchaceTicket: (
    eventId: string,
    data: {
      name: string;
      email: string;
      phone: string;
    }
  ) => {
    return apiClient.post(`/attendee/${eventId}`, data);
  },

  checkInUser: (data: { code: string }, id: string) => {
    return apiClient.put(`/ticket/${id}`, data);
  },

  getAttendeeByCode: (data: { code: string }, id: string) => {
    return apiClient.post(`/ticket/${id}`, data);
  },
};
