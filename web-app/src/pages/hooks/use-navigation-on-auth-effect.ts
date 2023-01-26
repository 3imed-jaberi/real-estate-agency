import { useHistory } from "react-router-dom";

import { RoutesRegistery } from "../../routes/routes.registery";
import { isAuthenticated } from "../../utils/is-auth";

export const useNavigationOnAuthEffect = () => {
  const history = useHistory();
  if (isAuthenticated()) history.push(RoutesRegistery.home);
};
