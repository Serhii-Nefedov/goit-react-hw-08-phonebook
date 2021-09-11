const getUserName = (state) => state.auth.user.name;
const isLoggedIn = (state) => state.auth.isLoggedIn;
const registerUserRejected = (state) => state.auth.registerUserRejected;
const isFetchingCurrentUser = (state) => state.auth.isFetchingCurrentUser;
const logInUserRejected = (state) => state.auth.logInUserRejected;

export {
  getUserName,
  isLoggedIn,
  isFetchingCurrentUser,
  registerUserRejected,
  logInUserRejected,
};