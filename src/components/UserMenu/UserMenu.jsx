import { authSelectors, authOperations } from "redux/auth";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import styles from "./UserMenu.module.css";

export default function UserMenu() {
  const name = useSelector(authSelectors.getUserName);
  const dispatch = useDispatch();
  return (
    <div className={styles.UserMenu}>
      <AccountCircleOutlinedIcon />
      <span className={styles.name}> {name}</span>
      <IconButton
        className={styles.button}
        type="button"
        onClick={() => {
          dispatch(authOperations.logOut());
        }}
        size="small"
      >
        <ExitToAppTwoToneIcon
          onClick={() => {
            dispatch(authOperations.logOut());
          }}
        />
      </IconButton>
    </div>
  );
}