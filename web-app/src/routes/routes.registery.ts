export const RoutesRegistery = {
  home: "/annonces",
  login: "/login",
  register: "/register",
  adminBoard: "/__danger_zone/admin/board",
  annonce(id: string) {
    return `/annonces/${id}`;
  },
};
