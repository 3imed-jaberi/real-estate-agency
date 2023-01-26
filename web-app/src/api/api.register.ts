export const API_ENDPOINTS = {
  login: () => "/auth/login",
  register: () => "/auth/register",
  annonces: () => "/annonces",
  annonce: (id: string) => `/annonces/${id}`,
  users: () => "/users",
  user: (id: string) => `/users/${id}`,
};
