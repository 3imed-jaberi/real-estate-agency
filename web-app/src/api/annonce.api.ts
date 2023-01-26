import { httpClient, injectAuthHeader } from "../services/http-client";
import { API_ENDPOINTS } from "./api.register";

export type Annonce = {
  available: boolean;
  description: string;
  id: number;
  location: string;
  operation: "aloucate" | "buy";
  phoneNumber: string;
  photoUrl: string;
  price: number;
  roomsNumber: number;
  surface: number;
};

export const annonceApi = {
  fetchAll: () => httpClient.get(API_ENDPOINTS.annonces(), injectAuthHeader()),
  fetchSingle: (annonceId: string) =>
    httpClient.get(API_ENDPOINTS.annonce(annonceId), injectAuthHeader()),
  create: (annonce: Record<string, unknown>) =>
    httpClient.post(API_ENDPOINTS.annonces(), annonce, injectAuthHeader()),
  update: (annonceId: string) => (annonce: Record<string, unknown>) =>
    httpClient.put(
      API_ENDPOINTS.annonce(annonceId),
      annonce,
      injectAuthHeader()
    ),
  delete: (annonceId: string) =>
    httpClient.delete(API_ENDPOINTS.annonce(annonceId), injectAuthHeader()),
};
