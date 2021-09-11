import { useSelector, useDispatch } from "react-redux";
import { contactsSelectors, contactsOperations } from "redux/contacts";
import { TextField } from "@material-ui/core";
import styles from "./SearchContacts.module.css";

export default function SearchContacts() {
  const filter = useSelector(contactsSelectors.getFilter);
  const dispatch = useDispatch();

  return (
    <div className={styles.searchContactsWrapper}>
      <TextField
        className={styles.searchContacts}
        onChange={(e) =>
          dispatch(contactsOperations.filterContacts(e.target.value))
        }
        name="filter"
        type="text"
        value={filter}
        size="small"
        label="Find contacts by name"
        variant="outlined"
      />
    </div>
  );
}