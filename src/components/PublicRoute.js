import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelectors } from "redux/auth";

export default function PublicRoute({
  children,
  redirectTo = "/",
  restricted = false,
  ...routeProps
}) {
  const isLoggedIn = useSelector(authSelectors.isLoggedIn);
  const shouldRedirect = isLoggedIn && restricted;

  return (
    <Route {...routeProps}>
      {shouldRedirect ? <Redirect to={redirectTo} /> : children}
    </Route>
  );
}