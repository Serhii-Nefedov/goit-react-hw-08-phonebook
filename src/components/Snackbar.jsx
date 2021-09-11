import React from "react";
import { useDispatch } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import * as authOperations from "redux/auth/authOperations";

export default function PositionedSnackbar({ element, message }) {
  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    open: true,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
    switch (element) {
      case "logInUserRejected":
        dispatch(authOperations.logInUserRejected());
        break;

      case "registerUserRejected":
        dispatch(authOperations.registerUserRejected());
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
      />
    </div>
  );
}