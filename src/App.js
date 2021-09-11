import { Switch } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authOperations, authSelectors } from "./redux/auth";
import { contactsOperations } from "redux/contacts";

import PrivateRoute from "components/PrivateRoute";
import PublicRoute from "components/PublicRoute";

import Container from "components/Container/Container";
import AppBar from "components/AppBar/AppBar";
import ContactForm from "components/ContactForm/ContactForm";
import ContactsList from "components/ContactsList/ContactsList";
import SearchContacts from "components/SearchContacts/SearchContacts";

const HomeView = lazy(() => import("./components/HomeView/HomeView"));
const RegisterView = lazy(() =>
  import("./components/RegisterView/RegisterView")
);
const LogInView = lazy(() => import("./components/LogInView/LogInView"));

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(authSelectors.isLoggedIn);
  const isFetchingCurrentUser = useSelector(
    authSelectors.isFetchingCurrentUser
  );

  useEffect(() => {
    async function refreshPage() {
      await dispatch(authOperations.getUserInfo());
      if (isLoggedIn) {
        dispatch(contactsOperations.DB_fetchContacts());
      }
    }
    refreshPage();
  }, [dispatch, isLoggedIn]);

  return (
    !isFetchingCurrentUser && (
      <Container>
        <AppBar />

        <Switch>
          <Suspense fallback={""}>
            <PublicRoute path="/" exact>
              <HomeView />
            </PublicRoute>

            <PrivateRoute path="/contacts" redirectTo="/login">
              <ContactForm />
              <SearchContacts />
              <ContactsList />
            </PrivateRoute>

            <PublicRoute path="/register" restricted>
              <RegisterView />
            </PublicRoute>

            <PublicRoute path="/login" redirectTo="/contacts" restricted>
              <LogInView />
            </PublicRoute>
          </Suspense>
        </Switch>
      </Container>
    )
  );
};

export default App;