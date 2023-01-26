import axios from "axios";
import { storage, StorageRegistry } from "./local-storage";

export const httpClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export function injectAuthHeader(authHeader?: string) {
  return {
    headers: {
      Authorization:
        authHeader || `Bearer ${storage.get(StorageRegistry.token)}`,
    },
  };
}
