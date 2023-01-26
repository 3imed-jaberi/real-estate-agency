import { AppShell, Button, Header, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";

import { ProtectedRoute } from "./protected-route";
import {
  AdminDashboardItemPage,
  AdminDashboardPage,
  AnnonceDetailsPage,
  HomePage,
  RegisterPage,
  LoginPage,
} from "../pages";
import { storage } from "../services/local-storage";
import { isAuthenticated } from "../utils/is-auth";
import { RoutesRegistery } from "./routes.registery";

function AppShellHeader() {
  const [isAuth, setIsAuth] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const handleLogout = () => {
    storage.clear();
    return history.push(RoutesRegistery.login);
  };

  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, [location.pathname]);

  return isAuth ? (
    <Header
      height={60}
      p="xs"
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Text fz="lg" fw={700}>
          DarTakTak
        </Text>
      </div>

      <Button style={{ backgroundColor: "red" }} onClick={handleLogout}>
        Logout
      </Button>
    </Header>
  ) : null;
}

function AppRoutes() {
  return (
    <Router>
      <AppShell
        padding="md"
        header={<AppShellHeader />}
        styles={() => ({ main: { backgroundColor: "#E1D9D1" } })}
      >
        <Switch>
          <ProtectedRoute
            path={["/", RoutesRegistery.home]}
            exact
            component={HomePage}
          />
          <Route
            path={RoutesRegistery.register}
            exact
            component={RegisterPage}
          />
          <Route path={RoutesRegistery.login} exact component={LoginPage} />
          <ProtectedRoute
            path={RoutesRegistery.annonce(":id")}
            exact
            component={AnnonceDetailsPage}
          />
          <ProtectedRoute
            path="/__danger_zone/admin/board"
            exact
            component={AdminDashboardPage}
          />
          <ProtectedRoute
            path="/__danger_zone/admin/board/:id"
            exact
            component={AdminDashboardItemPage}
          />
        </Switch>
      </AppShell>
    </Router>
  );
}

export { AppRoutes };
