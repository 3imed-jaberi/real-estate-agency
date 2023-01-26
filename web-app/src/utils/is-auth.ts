import decode from "jwt-decode";
import { storage, StorageRegistry } from "../services/local-storage";

export const isAuthenticated = () => {
  const token = storage.get(StorageRegistry.token) || "";

  try {
    decode(token);
  } catch (err) {
    return false;
  }

  return true;
};

export const isAdminAuthenticated = () => {
  const token = storage.get(StorageRegistry.token) || "";

  try {
    //@ts-ignore
    const { sub } = decode(token);
    if (sub === "admin@admin.com") return true;
  } catch (err) {
    return false;
  }

  return false;
};
