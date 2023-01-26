import { httpClient } from "../services/http-client";
import { API_ENDPOINTS } from "./api.register";

export const authApi = {
  login: (payload: Record<string, unknown>) =>
    httpClient.post(API_ENDPOINTS.login(), payload),
  register: (payload: Record<string, unknown>) =>
    httpClient.post(API_ENDPOINTS.register(), payload),
};
