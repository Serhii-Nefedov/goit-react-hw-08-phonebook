import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import * as authOperations from "redux/auth/authOperations";
import { authSelectors } from "redux/auth";
import PositionedSnackbar from "../Snackbar";

import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import styles from "./LogInView.module.css";

export default function LogInView() {
  const [values, setValues] = useState({
    amount: "",
    email: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const isButtonDisable = values.email === "" || values.password === "";
  const logInUserRejected = useSelector(authSelectors.logInUserRejected);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.logInUserRejected());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      authOperations.logIn({ email: values.email, password: values.password })
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const PassHandleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {logInUserRejected && (
        <PositionedSnackbar
          element="logInUserRejected"
          message="Error, something went wrong, try again"
        />
      )}
      <form
        className={styles.logIn}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          className={styles.email}
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          size="small"
          label="Email"
          variant="outlined"
        />

        <FormControl
          variant="outlined"
          size="small"
          className={styles.password}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={PassHandleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  className={styles.iconButton}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>

        <Button
          className={styles.button}
          disabled={isButtonDisable}
          type="submit"
          variant="contained"
        >
          Log in
        </Button>
      </form>
    </>
  );
}