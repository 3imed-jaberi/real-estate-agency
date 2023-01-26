import { httpClient, injectAuthHeader } from "../services/http-client";
import { API_ENDPOINTS } from "./api.register";

export const userApi = {
  fetchAll: () => httpClient.get(API_ENDPOINTS.users(), injectAuthHeader()),
  fetchSingle: (userId: string) =>
    httpClient.get(API_ENDPOINTS.user(userId), injectAuthHeader()),
  create: (user: Record<string, unknown>) =>
    httpClient.post(API_ENDPOINTS.users(), user, injectAuthHeader()),
  update: (user: Record<string, unknown>) =>
    httpClient.put(API_ENDPOINTS.users(), user, injectAuthHeader()),
  delete: (userId: string) =>
    httpClient.delete(API_ENDPOINTS.user(userId), injectAuthHeader()),
};
